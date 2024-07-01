import Image from "next/image";
import React from "react";

const NoNotesDisplay = () => {
  return (
    <div className="mx-auto mt-20 text-center">
      <Image
        src="/assets/svgs/note-err.svg"
        width={150}
        height={150}
        className="mx-auto"
        alt="error"
      />
      <h1 className="mt-5 text-[24px] font-bold text-white">List is empty!</h1>
    </div>
  );
};

export default NoNotesDisplay;
