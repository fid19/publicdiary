import NoteForm from "@/components/form/NoteForm";
import { getSession } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const NoteCreate = async () => {
  const { user } = await getSession();

  if (!user?._id) redirect("/sign-in");

  return (
    <NoteForm
      noteProps={{
        noteActionType: "create",
      }}
    />
  );
};

export default NoteCreate;
