import HTMLParser from "@/components/shared/HTMLParser";
import Reply from "@/components/shared/Reply";
import ReplyForm from "@/components/shared/ReplyForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";

import { getNoteById } from "@/lib/actions/note.action";
import { getNoteReply } from "@/lib/actions/reply.action";
import { getSession } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TiDelete, TiEdit } from "react-icons/ti";

const Page = async ({ params }: { params: { noteId: string } }) => {
  const singleNote = await getNoteById({ id: params.noteId });

  const { user } = await getSession();

  const { note } = await getNoteReply({
    noteId: params.noteId,
    path: `/notes/${params.noteId}`,
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary-500/95  p-3 pt-32 md:px-16 md:pt-36">
      <div className="relative mx-auto mb-32 max-w-screen-lg">
        <div className="relative">
          {/* <div className="absolute inset-0 z-0 bg-white/50 blur-[180px]"></div> */}
          {/* <div className="absolute bottom-0 right-0 z-0 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div> */}

          <div className="rounded-lg backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-full relative">
                  <Image
                    src={
                      singleNote?.note.author.profilePic
                        ? `https://publicdiaryapp.s3.us-east-1.amazonaws.com/images/${singleNote?.note.author.profilePic}`
                        : `/assets/svgs/anonymous.svg`
                    }
                    layout="fill"
                    fill
                    className="size-10 rounded-full"
                    alt="profile-pic"
                  />
                </div>
                <h1 className="primary-text-gradient text-[22px] font-bold">
                  {singleNote.note.author.username}
                </h1>
                <p className="text-[16px] font-medium !text-gray-200">
                  | posted {singleNote.note.joinedAt.toDateString()}
                </p>
              </div>
              {user?._id &&
                user._id.toString() ===
                  singleNote?.note.author._id.toString() && (
                  <div className="flex justify-end gap-3">
                    <Link href={`/notes/${params.noteId}/edit`}>
                      <div className="flex items-center justify-center gap-1 rounded-lg bg-green-500/30 p-2">
                        {/* <TiEdit className="size-6 text-green-300" />{" "} */}
                        <HiOutlinePencilSquare className="size-5 text-white" />
                        {/* <span className="px-2 text-[12px] font-bold text-green-50 md:text-[16px]">
                          Edit
                        </span> */}
                      </div>
                    </Link>
                    <div className="flex items-center justify-center rounded-lg bg-red-500/30 p-2">
                      <MdDeleteForever className="size-5 text-red-500" />
                      {/* <span className="text-[14px] font-bold text-red-50 md:text-[16px]">
                        Delete
                      </span> */}
                    </div>
                    {/* <div className="flex items-center ">
                <Switch
                  id="disable-comments"
                  className="scale-90 data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-black/50"
                />
                <Label
                  htmlFor="disable-comments"
                  className="text-[14px] font-bold text-gray-100 md:text-[16px]"
                >
                  Disable Comments
                </Label>
              </div> */}
                  </div>
                )}
            </div>

            <div className="font-medium leading-loose tracking-wide text-white  md:text-[18px]">
              <HTMLParser>{singleNote?.note.content}</HTMLParser>
            </div>
          </div>
        </div>
        {note.length ? (
          <div className="mt-8">
            <h1 className="primary-text-gradient mb-5 text-[20px] font-bold text-white">
              Replies
            </h1>
            <div className="px-4">
              {note.map((i, key) => (
                <Reply key={key} i={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="z-20 mx-auto my-16">
            <Image
              alt="Message"
              src="/assets/svgs/reply.svg"
              width={36}
              height={36}
              className="z-20 mx-auto block size-24"
            />
            <h1 className="text-center  text-[20px] font-bold text-white">
              No replies yet...
            </h1>
          </div>
        )}

        {user?._id && (
          <>
            <ReplyForm className="" noteId={JSON.stringify(params.noteId)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
