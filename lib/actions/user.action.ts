"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  IProfileUpdateSchema,
  UserLoginSchema,
  UserSignUpSchema,
} from "../validation";
import { redirect } from "next/navigation";
import { FilterQuery } from "mongoose";
import { UserLoginParams, UserSignUpParams } from "./shared.types";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME!)
    .sign(secretKey);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

export const registerUser = async (params: UserSignUpParams) => {
  const submission = UserSignUpSchema.safeParse(params);

  if (!submission.success) {
    return { status: "failed", message: submission.error?.flatten() };
  }

  let { username, password, email } = submission?.data;

  email = email.replace(/\.+(?=@)/g, "").toLowerCase();

  try {
    connectToDatabase();

    const user = await User.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    const error: Record<string, string[]> = {};

    if (user) {
      user.username === username
        ? (error.username = ["User already exists"])
        : (error.email = ["Email already exists"]);

      const result = {
        status: "failed",
        message: {
          fieldErrors: error,
        },
      };

      return result;
    }

    await User.create({
      username,
      email,
      password,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }

  return redirect("/sign-in");
};

export const loginUser = async (params: UserLoginParams) => {
  const submission = UserLoginSchema.safeParse(params);

  if (!submission.success) {
    return { status: "failed", message: submission.error?.flatten() };
  }

  const { username, password } = submission?.data;

  try {
    connectToDatabase();

    const query: FilterQuery<typeof UserLoginSchema> = {};

    query.$or = [
      {
        username,
      },
      {
        email: username,
      },
    ];

    const user = await User.findOne(query).select("+password");

    if (!user) {
      const result = {
        status: "failed",
        message: {
          fieldErrors: {
            username: ["User does not exist"],
          },
        },
      };
      return result;
    }

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      return {
        status: "failed",
        message: {
          fieldErrors: {
            password: ["Invalid password"],
          },
        },
      };
    }

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const sessionUser = Object.assign({}, user._doc);

    delete sessionUser.password;

    const session = await encrypt({ user: sessionUser, expires });

    cookies().set("session", session, { expires, httpOnly: true });
  } catch (err) {
    console.log(err);
    throw err;
  }
  return redirect("/");
};

export async function updateUser(params) {
  try {
    connectToDatabase();

    const { profilePicUrl, username, description } = params;

    const submission = IProfileUpdateSchema.safeParse(params);

    if (!submission.success)
      throw new Error("One or more of your input is not valid");

    const { user } = await getSession();

    const { _id } = user;

    if (!_id) {
      throw new Error("User session not valid");
    }

    const checkUserExists = await User.findOne({
      username,
    });

    if (checkUserExists && checkUserExists.username !== user.username)
      return {
        status: "failed",
        message: {
          fieldErrors: {
            username: ["Username already exists"],
          },
        },
      };

    const res = await User.findOneAndUpdate(
      { _id },
      {
        profilePic: profilePicUrl,
        username,
        description,
      },
      {
        new: true,
      }
    );

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const session = await encrypt({ user: res, expires });

    cookies().set("session", session, {
      httpOnly: true,
      expires,
    });

    revalidatePath(`/profile/${_id}`);

    return redirect(`/profile/${_id}`);

    // return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });

  revalidatePath("/");
  redirect("/");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return { user: null };

  try {
    return await decrypt(session);
  } catch (err) {
    console.log("Error decrypting token");
  }
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

export async function getUserbyId(params) {
  try {
    connectToDatabase();

    const { _id } = params;

    const user = await User.findById(_id);

    return user;
  } catch (error) {
    console.log(error);
  }
}
