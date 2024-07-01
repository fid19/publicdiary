"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/context/AuthProvider";
import { getSession, logout } from "@/lib/actions/user.action";

const navbarItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "My Notes",
    link: "/notes",
  },
  {
    name: "Users",
    link: "/users",
  },
  {
    name: "My Profile",
    link: "/profile",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { user, fetchAuthStatus } = useAuth();

  return (
    <div className="fixed top-0 z-50 w-full    bg-black/20 backdrop-blur-md">
      {/* <div className="absolute inset-x-0 top-0 -z-10 h-16 w-full bg-black opacity-30 blur-[3px]"></div> */}
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-7 py-3 md:px-16">
        <div className="flex flex-row items-center justify-center gap-1">
          <Image
            src="/assets/note-with-pencil.svg"
            width={42}
            height={42}
            alt="note with pencil"
            className=""
          />
          <h1 className="m-0 text-[16px] font-bold  text-white">PublicDiary</h1>
        </div>

        <ul className="flex flex-row items-center gap-7 font-semibold text-white max-md:hidden md:text-[14px] lg:text-[16px]">
          {navbarItems.map((item) => {
            const active = item.link === pathname;

            if (item.link === "/profile") {
              item.link = user?._id ? `/profile/${user._id}` : "/profile";
            }

            return (
              <Link
                href={item.link}
                key={item.name}
                className={`relative hover:text-[#CFEEA6] ${
                  active &&
                  'after:absolute after:inset-x-0 after:-bottom-1 after:border-2 after:border-white after:content-[""]'
                }`}
              >
                <li key={item.name}>{item.name}</li>
              </Link>
            );
          })}
        </ul>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <GiHamburgerMenu className="mt-2 size-8 text-white " />
            </SheetTrigger>
            <SheetContent className="h-full w-72 border-none bg-primary-500/90">
              <SheetHeader className="h-full">
                <div className="flex h-full flex-col items-center justify-between gap-4 py-8">
                  <div></div>
                  <ul className="flex flex-col  items-center justify-center gap-12 text-[18px] font-semibold text-white">
                    {navbarItems.map((item) => {
                      const active = item.link === pathname;

                      return (
                        <Link
                          href={item.link}
                          key={item.name}
                          className={`relative hover:text-[#CFEEA6] ${
                            active &&
                            'after:absolute after:inset-x-0 after:-bottom-1 after:border-2 after:border-white after:content-[""]'
                          }`}
                          onClick={() => setIsOpen((open) => !open)}
                        >
                          <li key={item.name}>{item.name}</li>
                        </Link>
                      );
                    })}
                  </ul>

                  {!user?._id ? (
                    <>
                      <div className="flex gap-2">
                        <div
                          className="w-24 cursor-pointer rounded border px-4 py-3 text-white hover:bg-[#CFEEA6]/20  "
                          onClick={() => router.push("/sign-in")}
                        >
                          <Image
                            src="/assets/svgs/login-user.svg"
                            width={32}
                            height={32}
                            alt="login user svg"
                            className="mx-auto"
                          />
                          <p className="text-center text-[14px] font-semibold ">
                            Login
                          </p>
                        </div>
                        <div
                          className="w-24 cursor-pointer rounded border px-4 py-3 hover:bg-[#CFEEA6]/20  "
                          onClick={() => router.push("/sign-up")}
                        >
                          <Image
                            src="/assets/svgs/login-user.svg"
                            width={32}
                            height={32}
                            alt="login user svg"
                            className="mx-auto"
                          />
                          <p className="text-center text-[14px] font-semibold text-white">
                            Register
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      className="w-24 cursor-pointer rounded border px-4 py-3 hover:bg-[#CFEEA6]/20  "
                      onClick={async () => {
                        await logout();
                        fetchAuthStatus();
                      }}
                    >
                      {/* <Image
                        src="/assets/svgs/login-user.svg"
                        width={32}
                        height={32}
                        alt="login user svg"
                        className="mx-auto"
                      /> */}
                      <p className="text-center text-[14px] font-semibold text-white">
                        Logout
                      </p>
                    </div>
                  )}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {!user?._id ? (
          <>
            <div className="flex gap-2 max-md:hidden">
              <div
                className="cursor-pointer rounded border p-3 text-white hover:bg-[#CFEEA6]/20 md:w-20 lg:w-24"
                onClick={() => router.push("/sign-in")}
              >
                {/* <Image
                  src="/assets/svgs/login-user.svg"
                  width={32}
                  height={32}
                  alt="login user svg"
                  className="mx-auto"
                /> */}
                <p className="text-center font-semibold md:text-[12px] lg:text-[14px]  ">
                  Login
                </p>
              </div>
              <div
                className=" cursor-pointer rounded border px-4 py-3 hover:bg-[#CFEEA6]/20 md:w-20 lg:w-24 "
                onClick={() => router.push("/sign-up")}
              >
                {/* <Image
                  src="/assets/svgs/login-user.svg"
                  width={32}
                  height={32}
                  alt="login user svg"
                  className="mx-auto"
                /> */}
                <p className="text-center text-[14px] font-semibold text-white md:text-[12px] lg:text-[14px]">
                  Register
                </p>
              </div>
            </div>
          </>
        ) : (
          <div
            className="w-24 cursor-pointer rounded border px-4 py-3 text-white hover:bg-[#CFEEA6]/20 max-md:hidden"
            onClick={async () => {
              await logout();
              fetchAuthStatus();
            }}
          >
            {/* <Image
              src="/assets/svgs/login-user.svg"
              width={32}
              height={32}
              alt="login user svg"
              className="mx-auto"
            /> */}
            <p className="text-center text-[14px] font-semibold ">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
