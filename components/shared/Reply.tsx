import Image from "next/image";
import React from "react";
import HTMLParser from "./HTMLParser";

const Reply = ({ i }) => {
  const { _id, author, noteId, content, joinedAt } = i;

  return (
    <div className="mb-12 flex flex-col text-white" id={noteId}>
      <div className="mb-5 flex gap-3">
        <div className="size-7 rounded-full relative bg-primary-500">
          <Image
            src={
              i?.author.profilePic
                ? `https://publicdiaryapp.s3.us-east-1.amazonaws.com/images/${i?.author.profilePic}`
                : `/assets/svgs/anonymous.svg`
            }
            layout="fill"
            fill
            className="size-7 rounded-full"
            alt="profile-pic"
          />
        </div>
        <div className="flex items-center gap-1">
          <h1 className="primary-text-gradient text-[16px] font-bold">
            {author.username}
          </h1>
          <span className="text-[12px] font-medium !text-gray-200">
            | replied {joinedAt.toDateString()}
          </span>
        </div>
      </div>
      <div className="font-medium leading-[24px]">
        <HTMLParser>{content}</HTMLParser>
      </div>
    </div>
  );
};

export default Reply;
