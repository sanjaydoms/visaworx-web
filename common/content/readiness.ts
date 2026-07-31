export const readinessContent = {
  hero: {
    eyebrow: "Visa Readiness Framework",
    title: "Assess your preparation before you apply.",
    description:
      "Understand your document readiness, identify potential gaps, and determine the most appropriate next step for your visa journey.",
  },
  disclaimer:
    "This readiness summary is an educational preparation tool. It is not a visa decision, legal opinion, eligibility determination, or approval prediction. Visa decisions are made solely by the relevant government or consular authority.",
  bands: {
    "Early Preparation": {
      title: "Early Preparation",
      description:
        "Your travel plans are in the initial phase. Essential requirements such as passport validity or specific travel intent need clarification before gathering supporting documents.",
      themeColor: "bg-slate-100 border-slate-300 text-slate-800",
      badgeColor: "bg-slate-200 text-slate-800",
    },
    "Developing Readiness": {
      title: "Developing Readiness",
      description:
        "You have established core travel goals, but key supporting areas such as financial documentation or home-country commitments require structured preparation.",
      themeColor: "bg-amber-50/80 border-amber-200 text-amber-950",
      badgeColor: "bg-amber-100 text-amber-900",
    },
    "Good Foundation": {
      title: "Good Foundation",
      description:
        "Your preparation demonstrates solid alignment across identity, travel intent, and financial documentation. A final expert document check is recommended before submission.",
      themeColor: "bg-emerald-50/80 border-emerald-200 text-emerald-950",
      badgeColor: "bg-emerald-100 text-emerald-900",
    },
    "Needs Expert Review": {
      title: "Needs Expert Review",
      description:
        "Your profile includes complex factors—such as a prior visa refusal or non-standard documentation—that require personalized assessment by a human visa expert before proceeding.",
      themeColor: "bg-blue-50/80 border-blue-200 text-[#071f4a]",
      badgeColor: "bg-blue-100 text-[#071f4a]",
    },
  },
} as const;
