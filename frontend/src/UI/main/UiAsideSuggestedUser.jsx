import React from "react";
import { Verified } from "lucide-react";
import { Link } from "react-router-dom";

export const UiAsideSuggestedUser = ({ user }) => {
  return (
    <Link
      to={`/user/${user.username}`}
      key={user.username}
      className="flex gap-2 items-center"
    >
      <div className="flex gap-2 items-center group cursor-pointer w-full">
        <img
          src={user.avatarUrl}
          className="w-11 aspect-square rounded-full select-none object-cover"
          draggable={false}
          alt="avatar"
        />
        <div className="flex flex-col w-full max-w-[185px] ">
          <div className="flex gap-1 items-center group-hover:underline">
            <h5 className="font-medium line-clamp-1">{user.displayName}</h5>
            {user.verified && <Verified size={17} className="text-sky-500" />}
          </div>
          <p className="text-gray-color text-sm line-clamp-1">
            @{user.username}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        <button className="border select-none duration-150 px-2.5 py-0.5 rounded-full text-sm cursor-pointer hover:bg-light-color hover:text-dark-color font-medium">
          Seguir
        </button>
      </div>
    </Link>
  );
};
