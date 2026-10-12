import type {LicenseData, VerifyResult} from "../types/type";

export const MAX_NICK_LENGTH = 16;
export const VERIFY_PATH = "/verify";

const SALT = "gtnh-poop-license-v1";

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// cyrb53 — small non-cryptographic string hash
function hash(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// Keystream for the XOR cipher (mulberry32)
function keystream(seed: number, length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  let state = seed;
  for (let i = 0; i < length; i++) {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    bytes[i] = (t ^ (t >>> 14)) & 0xff;
  }
  return bytes;
}

function toBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64Url(value: string): Uint8Array {
  const binary = atob(value.replaceAll("-", "+").replaceAll("_", "/"));
  return Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
}

const TAG_LENGTH = 4;

function computeTag(body: string): number {
  return hash(`${SALT}|${body}`) >>> 0;
}

/** Packs the license into an opaque id: 4-byte tag + body XOR-ed with a keystream seeded by the tag. */
function encodeLicenseId({nick, expires}: LicenseData): string {
  const body = `${nick}\n${expires}`;
  const tag = computeTag(body);
  const plain = new TextEncoder().encode(body);
  const key = keystream(tag ^ hash(SALT), plain.length);

  const bytes = new Uint8Array(TAG_LENGTH + plain.length);
  new DataView(bytes.buffer).setUint32(0, tag);
  plain.forEach((byte, i) => (bytes[TAG_LENGTH + i] = byte ^ key[i]));

  return toBase64Url(bytes);
}

function decodeLicenseId(id: string): LicenseData | null {
  try {
    const bytes = fromBase64Url(id);
    if (bytes.length <= TAG_LENGTH) return null;

    const tag = new DataView(bytes.buffer).getUint32(0);
    const key = keystream(tag ^ hash(SALT), bytes.length - TAG_LENGTH);
    const plain = bytes.slice(TAG_LENGTH).map((byte, i) => byte ^ key[i]);
    const body = new TextDecoder("utf-8", {fatal: true}).decode(plain);
    if (computeTag(body) !== tag) return null;

    const [nick, expires] = body.split("\n");
    return {nick, expires};
  } catch {
    return null;
  }
}

export function regNumber(nick: string): string {
  const n = hash(nick.toLowerCase(), 7) % 10000;
  return `GTNH-POOP-${String(n).padStart(4, "0")}`;
}

export function defaultExpiry(): string {
  return `${new Date().getFullYear() + 1}-12-31`;
}

export function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

export function formatExpiry(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `до ${d} ${MONTHS_GENITIVE[m - 1]} ${y} года`;
}

function todayIso(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function isExpired(expires: string): boolean {
  return expires < todayIso();
}

/** Absolute link to the verification page (the app uses hash routing). */
export function buildVerifyUrl(data: LicenseData): string {
  const {origin, pathname} = window.location;
  return `${origin}${pathname}#${VERIFY_PATH}?id=${encodeLicenseId(data)}`;
}

export function verifyLicense(params: URLSearchParams): VerifyResult {
  const data = decodeLicenseId(params.get("id") ?? "");
  if (!data || !data.nick || data.nick.length > MAX_NICK_LENGTH || !isIsoDate(data.expires)) return {status: "invalid"};

  return {status: isExpired(data.expires) ? "expired" : "active", data};
}
