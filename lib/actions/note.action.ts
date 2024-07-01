"use server";

import { getSession } from "./user.action";
import { connectToDatabase } from "../mongoose";
import Notes from "@/database/note.model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NoteSchema } from "../validation";
import { redirect } from "next/navigation";

export async function revalidateUrl(params: { path: string }) {
  revalidatePath(params.path);
}

export async function editNoteById(params: {
  values: {
    isPrivate: boolean;
    disableComments: boolean;
    content: string;
  };
  noteId: string;
}) {
  try {
    const cookiesRes = await getSession();

    if (!cookiesRes) {
      throw new Error("User could not be authenticated");
    }

    const { user } = cookiesRes;

    connectToDatabase();

    const { values, noteId } = params;

    const submission = NoteSchema.safeParse(values);

    if (!submission.success) {
      throw new Error("SOmething went wrong with submission, please try again");
    }

    const note = await Notes.findById(noteId).populate("author", "_id");

    if (!note) throw new Error("Note could not be found");

    if (note.author._id.toString() !== user._id.toString())
      throw new Error("User is not the valid author");

    const { isPrivate, disableComments, content } = submission?.data;

    await Notes.findByIdAndUpdate(noteId, {
      isPrivate,
      disableComments,
      content,
    });

    revalidatePath(`/notes/${noteId}`);
    return redirect(`/notes/${noteId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getNoteById(params: { id: string }) {
  try {
    const { id } = params;

    connectToDatabase();

    console.log(mongoose.isValidObjectId(id));

    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Not a valid note");
    }

    const note = await Notes.findById(id).populate("author");

    return { note };
  } catch (error) {
    console.log("Not valid");
  }
}

export async function getAllNotes(params: { _id: string }) {
  try {
    // const { user } = await getSession();

    const { _id } = params;

    // if (!_id) {
    //   throw new Error("User session not valid");
    // }

    await connectToDatabase();

    const notes = await Notes.find(
      {
        author: _id,
      },
      { authenticatedReaders: 0 }
    ).sort({
      joinedAt: -1,
    });

    return notes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
