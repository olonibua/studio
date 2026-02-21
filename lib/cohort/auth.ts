import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.OTP_JWT_SECRET || "fallback-dev-secret"
);

function generateOTP(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 1_000_000).padStart(6, "0");
}

/** Creates a 6-digit OTP and a signed JWT containing its hash. */
export async function createOTPChallenge(email: string) {
  const otp = generateOTP();

  const token = await new SignJWT({ email, otp })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .setIssuedAt()
    .sign(secret);

  return { otp, token };
}

/** Verifies the OTP against the challenge JWT. */
export async function verifyOTPChallenge(token: string, otp: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.otp !== otp) return null;
    return payload.email as string;
  } catch {
    return null;
  }
}

/** Creates a 30-day session JWT for a verified email. */
export async function createSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .setIssuedAt()
    .sign(secret);
}

/** Verifies a session JWT and returns the email, or null if invalid. */
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.email as string;
  } catch {
    return null;
  }
}
