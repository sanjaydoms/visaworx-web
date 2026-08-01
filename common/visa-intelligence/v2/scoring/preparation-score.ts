/**
 * Preparation scoring for the Visa Clarity Engine.
 *
 * This scores how well prepared an applicant is, using answers they gave. It
 * is explicitly NOT a prediction: it says nothing about whether a visa will be
 * granted, and there is no code path that produces a probability. Approval is
 * decided by the relevant authority, and the product rules forbid implying
 * otherwise.
 *
 * Every point is traceable. A dimension's score is the sum of named
 * contributions, each carrying the question it came from and the answer given,
 * so the UI can always show *why* a score is what it is. A score with no
 * traceable contributions is impossible to construct here.
 */

export type ClarityDimension =
  | "pathway-clarity"
  | "traveller-profile-readiness"
  | "document-preparation"
  | "supporting-evidence";

export const CLARITY_DIMENSIONS: ClarityDimension[] = [
  "pathway-clarity",
  "traveller-profile-readiness",
  "document-preparation",
  "supporting-evidence",
];

export const DIMENSION_LABELS: Record<ClarityDimension, string> = {
  "pathway-clarity": "Pathway clarity",
  "traveller-profile-readiness": "Traveller-profile readiness",
  "document-preparation": "Document preparation",
  "supporting-evidence": "Supporting evidence",
};

/** One answer's contribution to one dimension. */
export type ScoreContribution = {
  dimension: ClarityDimension;
  /** The question as shown to the applicant. */
  question: string;
  /** The answer they gave, as shown back to them. */
  answer: string;
  points: number;
  maxPoints: number;
  /** Shown when points < maxPoints, explaining what would improve it. */
  improvement?: string;
};

export type DimensionScore = {
  dimension: ClarityDimension;
  label: string;
  points: number;
  maxPoints: number;
  /** 0-100, for presentation only. */
  percentage: number;
  contributions: ScoreContribution[];
};

export type PreparationScore = {
  dimensions: DimensionScore[];
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  /** Qualitative band. Deliberately not a probability or a grade. */
  band: PreparationBand;
  /** Dimensions scoring below half, worst first. */
  priorityGaps: DimensionScore[];
};

export type PreparationBand =
  | "Early preparation"
  | "Developing preparation"
  | "Well prepared"
  | "Needs expert review";

/**
 * Builds the score from contributions.
 *
 * Contributions are the only input, which is what guarantees traceability:
 * there is no way to add points without also supplying the question and answer
 * that produced them.
 */
export function buildPreparationScore(contributions: ScoreContribution[]): PreparationScore {
  const dimensions: DimensionScore[] = CLARITY_DIMENSIONS.map((dimension) => {
    const own = contributions.filter((c) => c.dimension === dimension);
    const points = own.reduce((sum, c) => sum + c.points, 0);
    const maxPoints = own.reduce((sum, c) => sum + c.maxPoints, 0);

    return {
      dimension,
      label: DIMENSION_LABELS[dimension],
      points,
      maxPoints,
      percentage: maxPoints === 0 ? 0 : Math.round((points / maxPoints) * 100),
      contributions: own,
    };
  });

  const totalPoints = dimensions.reduce((s, d) => s + d.points, 0);
  const maxPoints = dimensions.reduce((s, d) => s + d.maxPoints, 0);
  const percentage = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100);

  const priorityGaps = dimensions
    .filter((d) => d.maxPoints > 0 && d.percentage < 50)
    .sort((a, b) => a.percentage - b.percentage);

  return {
    dimensions,
    totalPoints,
    maxPoints,
    percentage,
    band: toBand(percentage, priorityGaps.length),
    priorityGaps,
  };
}

/**
 * Bands describe preparation, not likelihood.
 *
 * "Needs expert review" is triggered by breadth of gaps rather than a low
 * total: someone weak across three dimensions needs a human more than someone
 * simply early in the process.
 */
function toBand(percentage: number, gapCount: number): PreparationBand {
  if (gapCount >= 3) return "Needs expert review";
  if (percentage >= 75) return "Well prepared";
  if (percentage >= 45) return "Developing preparation";
  return "Early preparation";
}

/**
 * Guard used by tests and by the snapshot builder: every point awarded must be
 * attributable to a question and an answer.
 */
export function isFullyTraceable(score: PreparationScore): boolean {
  return score.dimensions.every((d) =>
    d.contributions.every(
      (c) => c.question.trim().length > 0 && c.answer.trim().length > 0 && c.maxPoints > 0
    )
  );
}
