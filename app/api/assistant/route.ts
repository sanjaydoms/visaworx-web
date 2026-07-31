import { NextResponse } from "next/server";
import { processAssistantQuery } from "../../../common/ai/adapters/provider";
import type { AssistantRequestPayload } from "../../../common/ai/types/assistant";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AssistantRequestPayload;

    if (!body || typeof body.message !== "string" || body.message.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid message." },
        { status: 400 }
      );
    }

    const response = await processAssistantQuery(body);

    return NextResponse.json({ success: true, data: response });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Assistant request failed.";
    console.error("[Assistant API Error]", message);

    return NextResponse.json(
      {
        success: false,
        error: "The assistant is temporarily unavailable. You can still explore our country guides, services, or speak with a Visaworx expert.",
      },
      { status: 500 }
    );
  }
}
