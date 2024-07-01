import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen items-center justify-center overflow-auto bg-primary-500 max-sm:bg-slate-100 md:p-8">
        <div className="absolute right-0 top-0 -z-0 max-sm:size-20 sm:size-32 lg:size-48">
          <Image
            fill={true}
            alt="rocket launching to the moon"
            src="/assets/svgs/moon.svg"
          />
        </div>
        <div className="z-10 max-w-[570px] flex-1 rounded-[20px] bg-white px-[5.625rem] py-[5.25rem] max-sm:h-[650px] max-sm:max-w-[350px] max-sm:bg-transparent max-sm:px-[30px] max-sm:py-[70px] md:h-[714px]">
          <div className="mb-12">
            <h1 className="h1-bold text-center text-primary-500 max-sm:text-[32px]">
              Welcome Back!
            </h1>
            <p className="base-medium mt-1 text-center text-gray-100 max-sm:text-[15px]">
              Enter your details to login
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="absolute bottom-0 left-0 size-24 -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-full bg-[#4F5B41] lg:size-48"></div>
      </div>
    </div>
  );
};

export default page;
