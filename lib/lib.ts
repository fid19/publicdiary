import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME!)
    .sign(secretKey);
}

export async function updateSession(request: NextRequest) {
  const res = NextResponse.next();

  try {
    const session = request.cookies.get("session")?.value;
    if (!session)
      return NextResponse.redirect(new URL("/sign-in", request.url));
    const parsed = await decrypt(session);

    parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });

    return res;
  } catch (err) {
    console.log(err);

    res.cookies.set({
      name: "session",
      value: "",
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  }
}
