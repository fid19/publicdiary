import NoteForm from "@/components/form/NoteForm";
import { getNoteById } from "@/lib/actions/note.action";
import { getSession } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }) => {
  const { user } = await getSession();

  if (!user?._id) redirect("/sign-in");

  const singleNote = await getNoteById({ id: params.noteId });

  return (
    <NoteForm
      noteProps={{
        noteActionType: "edit",
        noteContent: singleNote?.note.content,
        noteIsPrivate: singleNote?.note.isPrivate,
        noteDisableComments: singleNote?.note.disableComments,
        noteId: params.noteId,
      }}
    />
  );
};

export default Page;
