"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className={`pt-64`}>
      <h1 className="text-2xl font-medium text-center mt-2">
        Something Went Wrong
      </h1>
      <div className="flex justify-center mt-7">
        <Link
          className="text-xl bg-c-main-purple hover:bg-c-main-purple-hover active:scale-95 transition duration-300 px-6 py-4 rounded-full text-c-white"
          href="/"
        >
          Return To Main Page
        </Link>
      </div>
    </div>
  );
}
