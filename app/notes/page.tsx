import FloatingPlus from "@/components/shared/FloatingPlus";
import React from "react";
import Image from "next/image";
import { getSession } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import DisplayNote from "@/components/DisplayNote";

const Notes = async () => {
  const { user } = await getSession();

  if (!user?._id) redirect("/sign-in");

  return (
    <>
      <FloatingPlus />
      <section className="relative min-h-screen overflow-hidden bg-primary-500/95">
        <div className="relative mx-auto mb-32 max-w-screen-lg p-3 pt-32 md:px-16 md:pt-36">
          <Image
            src="/assets/svgs/lightning.svg"
            alt="lightning"
            width={24}
            height={24}
            className="absolute right-0 size-[800px] translate-x-1/2 opacity-5 blur-[50px]"
          />
          {/* <div className="primary-text-gradient mb-10 text-[42px] font-extrabold">
            Your Notes
            <GiNotebook className="ml-3 inline text-lime-100" />
          </div> */}

          <DisplayNote _id={user?._id} />
        </div>
      </section>
    </>
  );
};

export default Notes;
