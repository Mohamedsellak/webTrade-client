import Link from 'next/link';
import React from 'react';

export default function UserHeader({ title }) {
  let user = JSON.parse(localStorage.getItem("authData"));
  // if (!user) {
  //   user = {
  //     _id :"test",
  //     username: "test"
  //   }
  // }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg shadow-lg mb-8 lg:mb-20">
      <h1 className="text-3xl md:text-4xl text-white mb-4 md:mb-0 tracking-wide">
        {title}
      </h1>
      <div className="flex items-center md:space-x-6 bg-neutral-900 px-6 py-2 rounded-full shadow-inner">
        <span className="hidden sm:block text-lg font-medium text-gray-300">
          {user.username}
        </span>
        <span className="hidden sm:block text-lg font-medium text-gray-300">
          ID: {user._id.slice(0,6)}
        </span>
        <Link href="/user/profile">
          <img
            src="/assets/images/avatar.jpg"
            className="h-14 w-14 rounded-full border-2 border-gray-600"
            alt="profile"
          />
        </Link>
      </div>
    </div>
  );
}
