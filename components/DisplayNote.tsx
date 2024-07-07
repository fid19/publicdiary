import { getAllNotes } from "@/lib/actions/note.action";
import React from "react";
import NoteList from "./NoteList";
import NoNotesDisplay from "./shared/NoNotesDisplay";
import { getSession } from "@/lib/actions/user.action";

const DisplayNote = async ({
  _id,
  path,
}: {
  _id: string;
  path?: string | undefined;
}) => {
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
                  path={path}
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
