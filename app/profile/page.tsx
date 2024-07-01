import { getSession } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { user } = await getSession();

  if (!user._id) redirect("/sign-in");

  redirect(`/profile/${user._id}`);

  return <div>Page</div>;
};

export default Page;
