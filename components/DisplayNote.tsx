import { getAllNotes } from "@/lib/actions/note.action";
import React from "react";
import NoteList from "./NoteList";
import NoNotesDisplay from "./shared/NoNotesDisplay";
import { getSession } from "@/lib/actions/user.action";

const DisplayNote = async ({ _id }: { _id: string }) => {
  const result = await getAllNotes({ _id });
  const { user } = await getSession();

  return (
    <>
      {result.length ? (
        <>
          <div className="flex flex-col justify-start gap-5">
            {result.map((note) => {
              return (
                <NoteList
                  key={note._id}
                  result={note}
                  isLoggedIn={!!user?._id}
                  type="notes"
                />
              );
            })}
          </div>
        </>
      ) : (
        <NoNotesDisplay />
      )}
    </>
  );
};

export default DisplayNote;
