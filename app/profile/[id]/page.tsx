import TabContent from "@/components/TabContent";
import { Button } from "@/components/ui/button";
import { getSession, getUserbyId } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { id } = params;

  const { user } = await getSession();

  const userProfile = await getUserbyId({ _id: id });

  return (
    <div className="min-h-screen bg-primary-500 pt-28">
      <div className="mx-auto max-w-screen-lg px-3 pb-16 md:px-16">
        <div className="flex justify-between gap-3 max-md:flex-col-reverse">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative  size-32 rounded-full">
              <Image
                src={
                  userProfile?.profilePic
                    ? `https://publicdiaryapp.s3.us-east-1.amazonaws.com/images/${userProfile.profilePic}`
                    : `/assets/svgs/anonymous.svg`
                }
                alt="profile pic"
                fill
                layout="fill"
                className="size-full rounded-full "
              />
            </div>
            <div>
              <h1 className="primary-text-gradient inline-block text-[32px] font-bold">
                John Doe{" "}
              </h1>
              <span className="ml-2 text-[18px] text-white">
                (@{userProfile.username})
              </span>
              <h6 className="text-[14px] font-normal text-white">
                User joined on{" "}
                {userProfile.joinedAt
                  .toString()
                  .split(" ")
                  .slice(0, 5)
                  .join(" ")}
              </h6>
            </div>
          </div>
          {user?._id && (
            <div className="max-md:self-end">
              <Link href={`/profile/${params.id}/edit`}>
                <Button className="primary-bg-gradient text-black">
                  Edit Profile
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg  bg-black/5 p-4 text-[16px] font-light  leading-loose text-white">
          {/* <h2 className="mb-2 font-bold"></h2> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, mollitia dicta placeat facilis sit fuga cupiditate
            neque quibusdam adipisci possimus necessitatibus ducimus molestias
            molestiae. Ipsum doloremque repellat quasi nesciunt. Rerum?
          </p>
        </div>

        <div className="mt-12">
          <TabContent _id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
