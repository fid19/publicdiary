import Notes from "@/database/note.model";
import User from "@/database/user.model";
import { getSession } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/lib/mongoose";
import { NoteSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const cookiesRes = await getSession();

    if (!cookiesRes) {
      throw new Error("User could not be authenticated");
    }

    connectToDatabase();

    const { values, author } = await request.json();

    const submission = NoteSchema.safeParse(values);

    if (!submission.success) {
      throw new Error("Something went wrong with submission, please try again");
    }

    const user = await User.findById(author);

    if (!user || cookiesRes.user._id !== author) {
      throw new Error("User is invalid");
    }

    const { isPrivate, disableComments, content } = submission?.data;

    const result = await Notes.create({
      isPrivate,
      disableComments,
      content,
      author,
      joinedAt: Date.now(),
    });

    revalidatePath("/notes");

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: "error", error: error.message });
    }
  }
};
