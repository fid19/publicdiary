"use client";
import { useRouter } from "next/navigation";
import { FaCirclePlus } from "react-icons/fa6";

export default function FloatingPlus() {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-0 right-0 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      onClick={() => router.push("/create-note")}
    >
      <svg width="0" height="0">
        <linearGradient
          id="primary-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#ffb800" offset="57.5%" />
          <stop stopColor="#ff7e20" offset="77.42%" />
        </linearGradient>
      </svg>
      <FaCirclePlus
        className="absolute  size-16 animate-ping text-primary-500 opacity-20 drop-shadow-2xl"
        style={{
          fill: "url('#primary-gradient')",
        }}
      />
      <FaCirclePlus
        className=" size-16 drop-shadow-2xl hover:animate-none"
        style={{
          fill: "url('#primary-gradient')",
        }}
      />
    </div>
  );
}
