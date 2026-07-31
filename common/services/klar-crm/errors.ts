export class KlarCrmError extends Error {
  public code: string;
  public statusCode?: number;

  constructor(message: string, code = "KLAR_CRM_ERROR", statusCode?: number) {
    super(message);
    this.name = "KlarCrmError";
    this.code = code;
    this.statusCode = statusCode;
  }
}
