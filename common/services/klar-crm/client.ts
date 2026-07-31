import type { KlarCrmConfig } from "./types";
import { KlarCrmError } from "./errors";

export function getKlarCrmConfig(): KlarCrmConfig | null {
  const apiUrl = process.env.KLAR_CRM_API_URL;
  if (!apiUrl) return null;

  return {
    apiUrl: apiUrl.replace(/\/$/, ""),
    apiToken: process.env.KLAR_CRM_API_TOKEN,
    tenantId: process.env.KLAR_CRM_TENANT_ID,
    consultationEndpoint: process.env.KLAR_CRM_CONSULTATION_ENDPOINT || "/api/v1/consultations",
    timeoutMs: Number(process.env.KLAR_CRM_TIMEOUT_MS) || 10000,
  };
}

export function redactSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const redacted = { ...data };
  if (typeof redacted.contact_email === "string") {
    redacted.contact_email = redacted.contact_email.replace(/^(.{2})(.*)(@.*)$/, "$1***$3");
  }
  if (typeof redacted.contact_phone === "string") {
    redacted.contact_phone = redacted.contact_phone.replace(/.(?=.{4})/g, "*");
  }
  if (typeof redacted.consultation_summary === "string") {
    redacted.consultation_summary = "[REDACTED SUMMARY]";
  }
  return redacted;
}

export async function sendKlarCrmRequest<T>(
  endpointPath: string,
  payload: Record<string, unknown>,
  idempotencyKey?: string,
  configOverride?: KlarCrmConfig
): Promise<T> {
  const config = configOverride || getKlarCrmConfig();
  if (!config) {
    throw new KlarCrmError("KLAR_CRM_API_URL is not configured", "MISSING_CONFIG");
  }

  const targetUrl = endpointPath.startsWith("http")
    ? endpointPath
    : `${config.apiUrl}${endpointPath.startsWith("/") ? "" : "/"}${endpointPath}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (config.apiToken) {
    headers["Authorization"] = `Bearer ${config.apiToken}`;
  }

  if (config.tenantId) {
    headers["X-Tenant-ID"] = config.tenantId;
  }

  if (idempotencyKey) {
    headers["X-Idempotency-Key"] = idempotencyKey;
  }

  try {
    const res = await fetch(targetUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(config.timeoutMs),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown response body");
      const redacted = redactSensitiveData(payload);
      console.error(
        `[Klar CRM Client Error] HTTP ${res.status}:`,
        errorText,
        "Redacted Payload:",
        JSON.stringify(redacted)
      );
      throw new KlarCrmError(
        `Klar CRM API call failed with HTTP status ${res.status}`,
        "API_ERROR",
        res.status
      );
    }

    const data = await res.json();
    return data as T;
  } catch (err: unknown) {
    if (err instanceof KlarCrmError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : "Network error calling Klar CRM";
    throw new KlarCrmError(message, "NETWORK_ERROR");
  }
}
