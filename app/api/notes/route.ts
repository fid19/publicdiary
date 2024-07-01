import { getSession } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const cookiesRes = await getSession();

    if (!cookiesRes) {
      throw new Error("User could not be authenticated");
    }

    connectToDatabase();

    console.log(cookiesRes);

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
};
