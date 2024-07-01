import ProfileEdit from "@/components/ProfileEdit";
import { getSession } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { BiError } from "react-icons/bi";

import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { user } = await getSession();

  const { id } = params;
  if (!user?._id) {
    return redirect("/sign-in");
  }

  if (user?._id !== id) {
    return (
      <div className=" min-h-screen bg-primary-500">
        <div className="flex min-h-[720px] flex-col items-center justify-center gap-2">
          <BiError className="size-24 text-red-500" />
          <h1 className="text-[24px] font-bold text-white">
            You cannot edit another user profile
          </h1>
        </div>
      </div>
    );
  }
  console.log(user);

  return (
    <ProfileEdit
      username={user?.username}
      description={user?.description}
      profilePic={user?.profilePic}
    />
  );
};

export default Page;
