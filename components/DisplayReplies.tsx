import { getAllNotes } from "@/lib/actions/note.action";
import React from "react";
import NoteList from "./NoteList";
import NoNotesDisplay from "./shared/NoNotesDisplay";
import { getSession } from "@/lib/actions/user.action";
import { getAllRepliesByAuthorId } from "@/lib/actions/reply.action";

const DisplayReplies = async ({ _id }) => {
  const result = await getAllRepliesByAuthorId({ _id });

  return (
    <>
      {result?.length ? (
        <>
          <div className="flex flex-col justify-start gap-5">
            {result.map((replies) => {
              return (
                <NoteList
                  key={replies._id}
                  result={replies}
                  isLoggedIn={false}
                  type="replies"
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

export default DisplayReplies;
