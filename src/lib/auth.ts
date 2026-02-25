import * as jose from "jose";

const SECRET = process.env.JWT_SECRET!;
if (!SECRET) throw new Error("JWT_SECRET nu este definit");

interface TokenPayload extends jose.JWTPayload {
  id: string;
}

// ✅ Creează token (login)
export async function signToken(payload: TokenPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(SECRET));
}

// ✅ Verifică token (middleware / api/me)
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(SECRET),
    );
    return payload as TokenPayload;
  } catch (err) {
    console.error("Failed to verify JWT:", err);
    return null;
  }
}
