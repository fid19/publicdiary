"use server";

import Reply from "@/database/reply.model";
import { connectToDatabase } from "../mongoose";
import { ReplySchema } from "../validation";
import { CreateReplyParams } from "./shared.types";
import { getSession } from "./user.action";
import Notes from "@/database/note.model";
import { revalidatePath } from "next/cache";

export async function getNoteReply(params: { noteId: string; path: string }) {
  try {
    await connectToDatabase();

    const { noteId, path } = params;

    const noteReply = await Reply.find({
      noteId,
    }).populate("author");

    revalidatePath(path);

    return {
      note: noteReply,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getAllRepliesByAuthorId(params: { _id: string }) {
  try {
    const { _id } = params;

    await connectToDatabase();

    const replies = await Reply.find({
      author: _id,
    }).sort({
      joinedAt: -1,
    });

    return replies;
  } catch (err) {
    console.log(err);
  }
}

export async function createReply(params: CreateReplyParams) {
  try {
    await connectToDatabase();

    const { content, noteId } = params;

    const submission = ReplySchema.safeParse({
      answer: content,
    });

    if (!submission.success) {
      throw new Error("An occured with submission, please try again!");
    }

    const { user } = await getSession();

    const { _id } = user;

    if (!_id) {
      throw new Error("User session not valid");
    }

    const reply = await Reply.create({
      content,
      author: _id,
      noteId,
      joinedAt: Date.now(),
    });

    console.log(reply._id);

    await Notes.findByIdAndUpdate(
      noteId,
      {
        $addToSet: { replies: reply._id },
      },
      { new: true }
    );

    revalidatePath(`/notes/${noteId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
