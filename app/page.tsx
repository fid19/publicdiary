import Scene from "@/3d_scene/Scene.jsx";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <main className="relative w-full">
        <div className="relative h-[800px]  overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 max-md:hidden">
            <Scene />
          </div>
          <div className="absolute inset-y-0 left-1/2 right-0 flex h-full  max-w-screen-2xl items-center justify-start p-10 py-16 max-lg:left-1/3 max-md:hidden md:-translate-y-20 lg:-translate-y-20">
            <div className="flex-1">
              <h1 className="font-bold text-[#c4e697] max-md:leading-[70px] md:text-[64px] lg:text-[96px]">
                A Secret Way
              </h1>
              <p className="font-thin text-white md:text-right md:text-[32px] lg:text-center lg:text-[40px]">
                To Share Your Thoughts
              </p>
              <h1 className="font-light text-white md:text-[40px] lg:text-[60px]">
                Anonymously
              </h1>
            </div>
          </div>

          <div className="mt-32  flex flex-col items-center justify-center gap-5 p-8 md:hidden ">
            <div className="flex-1 space-y-2">
              <h1 className="text-[55px] font-bold leading-[70px] text-[#c4e697]">
                A Secret Way
              </h1>
              <p className="text-right text-[24px] font-thin text-white">
                To Share Your Thoughts
              </p>
              <h1 className="text-[40px] font-light text-white">Anonymously</h1>
            </div>
            <Image
              src="/assets/svgs/isometric.svg"
              width={256}
              height={256}
              alt="svg"
              className=""
            />
          </div>
          <div className="absolute inset-0 -z-30">
            <div
              className="relative size-full"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              <div className="fixed inset-x-0 size-full">
                <Image
                  src="/assets/notebg.jpg"
                  layout="fill"
                  alt="background"
                  fill
                  objectFit="cover"
                  className="blur-[2px]"
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 -z-20 bg-[#525f43] opacity-80"
            // style={{
            //   background:
            //     "linear-gradient(180deg, #525f43 0.67%, rgba(82, 95, 67, 0.8) 10.7%, rgba(82, 95, 67, 0) 100.01%)",
            // }}
          ></div>
          <div
            className="absolute inset-0 -z-20"
            // style={{
            //   background:
            //     "linear-gradient(360deg, #F1F5F9 0%, #F1F5F9 8.1%, rgba(241, 245, 249, 0) 27.71%)",
            // }}
            /* Rectangle 4 */
          ></div>
          {/* <Image
          src="/assets/scale.jpg"
          layout="fill"
          alt="scale"
          objectFit="fill"
          className="absolute -z-20  opacity-10 "
        /> */}

          {/* <div
            className="absolute bottom-0 z-40 h-72 w-full"
            style={{
              background:
                "linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 43.67%)",
            }}
          ></div> */}
          <div
            className="absolute inset-x-0 bottom-0 -z-10  h-96 bg-[#F1FFDF]"
            style={{
              clipPath: " polygon(100% 71%, 0 100%, 100% 100%)",
            }}
          ></div>
        </div>
      </main>
      <section className="relative  bg-[#F1FFDF] pb-16 pt-8">
        {/* <Image
          src="/assets/svgs/isometric.svg"
          width={200}
          height={200}
          alt="isometric"
          objectFit="contain"
          className="object z-10 mx-auto"
        /> */}

        <div className="relative mx-auto  mb-24 max-w-screen-2xl px-8">
          <div className="flex items-center justify-center max-sm:flex-col">
            <div className="flex flex-1 flex-col items-center gap-2 rounded-3xl border-primary-500/50  p-8 ">
              <div className="flex items-center justify-center rounded-full  border-4 border-primary-500 p-4 ">
                <Image
                  src="/assets/svgs/lock.svg"
                  width={64}
                  height={64}
                  alt="password svg"
                />
              </div>
              <h1 className="text-[24px] font-bold text-primary-500">
                Pin Protection
              </h1>
              <p className="text-center text-[18px] font-normal leading-relaxed text-gray-600">
                Safeguard your diary by locking it with a special pin so only
                special users can view it.
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center gap-2 rounded-3xl border-primary-500/50  p-8 ">
              <div className="flex items-center justify-center rounded-full border-4  border-primary-500 p-4">
                <Image
                  src="/assets/svgs/anonymous-mask.svg"
                  width={64}
                  height={64}
                  alt="anonymous mask svg"
                />
              </div>
              <h1 className="text-[24px] font-bold text-primary-500">
                Anonymous
              </h1>
              <p className="text-center text-[18px] font-normal leading-relaxed text-gray-600">
                Annymously Interact and share your thoughts with users around
                the globe.
              </p>
            </div>
            <div className=" flex flex-1 flex-col items-center gap-2 rounded-3xl  border-primary-500/50 p-8">
              <div className="flex items-center justify-center rounded-full border-4  border-primary-500 p-4">
                <Image
                  src="/assets/svgs/share.svg"
                  width={64}
                  height={64}
                  alt="password svg"
                />
              </div>
              <h1 className="text-[24px] font-bold text-primary-500">Share</h1>
              <p className="text-center text-[18px] font-normal leading-relaxed text-gray-600">
                Share with users via Facebook, Twitter, WhatsApp and the rest.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 z-0 h-96 translate-y-1 bg-primary-500"
          style={{
            clipPath: " polygon(100% 71%, 0 100%, 100% 100%)",
          }}
        ></div>
      </section>
      <section className="relative min-h-[800px] overflow-hidden bg-primary-500 p-8">
        {/* <Image
          src="/assets/svgs/blur-1.svg"
          fill
          layout="fill"
          alt="blur"
          className="absolute left-0 -translate-x-1/2 translate-y-1/2 blur-[100px]"
        /> */}

        <div className="relative z-0 mx-auto h-full max-w-screen-2xl">
          <Image
            src="/assets/svgs/blur-1.svg"
            width={720}
            height={720}
            alt="blur"
            objectFit="contain"
            className="absolute left-0 top-0 -z-10 -translate-y-5 blur-[100px]"
          />

          <div>
            <Image
              src="/assets/svgs/education-2.svg"
              alt="hero"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>

          <div className="z-0 my-8 space-y-12 text-[18px] font-medium leading-loose text-white lg:px-32 lg:text-[24px]">
            <h1 className="primary-text-gradient mb-5 text-center text-[48px] font-extrabold leading-tight lg:text-[48px]">
              Create your First Note
            </h1>
            <p className="text-center">
              Capture every moment of your life as it happens. Features like
              storing audio, video, photos, and notes will be implemented
              incrementally, allowing you to record important moments
              anonymously. You also have the option to share this moments with
              special users.
            </p>

            <Link href="/create-note" className="block">
              <div className="mx-auto flex h-16 items-center justify-center gap-3 rounded-lg border text-[24px] backdrop-blur-md hover:bg-black/10 md:w-1/2">
                <FaPlus className="" />{" "}
                <p className="font-bold">Create A Note Today</p>
              </div>
            </Link>
          </div>
          <div className="flex justify-end">
            <Image
              src="/assets/svgs/paint.svg"
              alt="hero"
              width={256}
              height={256}
              className=""
            />
          </div>
        </div>
      </section>
      <footer className="flex items-center justify-center bg-primary-500/90">
        <a
          href="#"
          className=" py-4 text-center text-[18px] font-bold text-white"
        >
          #Back To The Top
        </a>
      </footer>
    </>
  );
}
