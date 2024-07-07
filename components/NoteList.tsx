import Link from "next/link";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import Alert from "./Alert";

interface NoteI {
  content: string;
  disableComments: boolean;
  views: number;
  isPrivate: boolean;
  joinedAt: Date;
  _id: string;
  author: object;
  noteId: string;
}

const NoteList = ({
  result,
  isLoggedIn,
  type,
  path,
}: {
  result: NoteI;
  isLoggedIn: boolean;
  type?: string | undefined;
  path?: string | undefined;
}) => {
  return (
    <>
      <div className="flex flex-col justify-between space-y-4 rounded-lg bg-black/15 p-4 backdrop-blur-md hover:border-2 hover:border-black/5  hover:bg-black/10">
        <Link
          className="h-[100px]"
          href={
            type === "notes"
              ? `/notes/${result._id.toString()}`
              : `/notes/${result.noteId}#${result._id}`
          }
        >
          <span className=" text-[12px] font-normal text-white/70">
            {result.joinedAt.toDateString()}
          </span>
          <p className="mt-4 line-clamp-2 text-[14px] font-normal leading-6 tracking-wide text-white">
            {result.content}
          </p>
        </Link>

        <div className="flex justify-end gap-1">
          {isLoggedIn && (
            <>
              <Link href={`/notes/${result._id}/edit`}>
                <div className="flex items-center justify-center rounded-xl p-1">
                  <HiOutlinePencilSquare className="size-6 text-white" />
                </div>
              </Link>

              <Alert
                trigger={
                  <div className="flex cursor-pointer items-center justify-center rounded-xl p-1">
                    <MdDeleteForever className="size-6 text-red-500" />
                  </div>
                }
                title="Are you absolutely sure?"
                description="This action cannot be undone"
                action="delete"
                path={path}
                noteId={result?._id.toString()}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NoteList;
