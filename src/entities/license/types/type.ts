export interface LicenseData {
  nick: string;
  /** ISO date, YYYY-MM-DD */
  expires: string;
}

export type VerifyResult =
  | {status: "active" | "expired"; data: LicenseData}
  | {status: "invalid"};
