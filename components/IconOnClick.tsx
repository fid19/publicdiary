"use client";
import React from "react";
import { useRouter } from "next/navigation";

const IconOnClick = ({
  children,
  linkUrl,
}: {
  children: React.ReactElement;
  linkUrl: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(linkUrl);
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

export default IconOnClick;
