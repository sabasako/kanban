"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className={`pt-64`}>
      <h1 className="mt-2 text-2xl font-medium text-center">
        Something went wrong :(
      </h1>
      <div className="flex justify-center mt-7">
        <Link
          className="px-6 py-4 text-xl transition duration-300 rounded-full bg-c-main-purple hover:bg-c-main-purple-hover active:scale-95 text-c-white"
          href="/"
        >
          Return To Main Page
        </Link>
      </div>
    </div>
  );
}
