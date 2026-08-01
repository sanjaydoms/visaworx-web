import { NextResponse } from "next/server";
import { consultationSchema } from "../../../common/validation/consultation";
import { submitConsultationRequest } from "../../../common/services/consultation";
import type { ConsultationRequest } from "../../../common/types/consultation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot Bot Prevention
    if (body.honeypot && body.honeypot.trim() !== "") {
      return NextResponse.json({ success: true, requestId: "req_bot_filtered" });
    }

    // Zod Server Validation
    const validationResult = consultationSchema.safeParse(body);
    if (!validationResult.success) {
      const errorFormatted = validationResult.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json(
        { success: false, error: errorFormatted },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    const payload: ConsultationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      submittedAt: new Date().toISOString(),
      source: validData.source,
      destination: validData.destination,
      service: validData.service,
      situation: validData.situation,
      contact: validData.contact,
      // Carry the consent the applicant actually gave. The schema already
      // rejects anything other than an explicit true, so this records a real
      // decision rather than asserting one on the applicant's behalf.
      consent: {
        contactPermission: validData.consent.contactPermission,
        privacyAccepted: validData.consent.privacyAccepted,
      },
    };

    // Invoke Replaceable Adapter
    const result = await submitConsultationRequest(payload);

    if (result.success) {
      return NextResponse.json({ success: true, requestId: payload.id });
    }

    return NextResponse.json(
      { success: false, error: result.error || "Submission failed. Please try again." },
      { status: 500 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("[Consultation API Error]", errorMessage);
    return NextResponse.json(
      { success: false, error: "We could not submit your request right now. Please check your connection." },
      { status: 500 }
    );
  }
}
