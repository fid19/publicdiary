import { getSession } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const session = await getSession();

    return NextResponse.json({ data: session });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
};
