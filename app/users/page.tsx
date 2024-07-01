import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-primary-500/90">
      <div className="pt-28 px-3 pb-16 md:px-16 max-w-screen-lg mx-auto min-h-[720px]">
        <h1 className="primary-text-gradient font-extrabold text-[32px] mb-14">
          Users
        </h1>

        <div className="flex">
          <div className="border-2 border-lime-100/50 bg-black/10 px-12 py-5 rounded-lg space-y-4">
            <div className="size-12 bg-white rounded-full mx-auto"></div>
            <h2 className="text-white leading-[15px] text-center">
              Daniel @dan
            </h2>

            <div>
              <div className="flex gap-2 text-white">
                <h4 className="text-[13px]">Total Notes:</h4>
                <span className="text-[13px] primary-text-gradient font-bold">
                  10
                </span>
              </div>

              <div className="flex gap-2 text-white">
                <h4 className="text-[13px]">Total Replies:</h4>
                <span className="text-[13px] primary-text-gradient font-bold">
                  10
                </span>
              </div>
            </div>

            <div className="primary-bg-gradient rounded-lg">
              <Link
                className="text-center block mx-auto text-[12px] text-black/60 font-bold"
                href={"/"}
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
