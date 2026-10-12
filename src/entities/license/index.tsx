import type {LicenseData, VerifyResult} from "./types/type";
import {
  MAX_NICK_LENGTH,
  VERIFY_PATH,
  defaultExpiry,
  formatExpiry,
  isExpired,
  isIsoDate,
  regNumber,
  verifyLicense,
} from "./helpers/license-helper";
import {LICENSE_HEIGHT, LICENSE_WIDTH, LicenseCard} from "./ui/license-card";
import {LicensePreview} from "./ui/license-preview";

export type {LicenseData, VerifyResult};
export {
  MAX_NICK_LENGTH,
  VERIFY_PATH,
  LICENSE_HEIGHT,
  LICENSE_WIDTH,
  defaultExpiry,
  formatExpiry,
  isExpired,
  isIsoDate,
  regNumber,
  verifyLicense,
  LicenseCard,
  LicensePreview,
};
