import React from "react";
import { BadgeCheck } from "lucide-react";

export const AsideMainPageLoaders = () => {
  return (
    <li className="flex gap-2 items-center">
      <div className="flex gap-2 items-center group">
        <div className="w-11 h-11 aspect-square rounded-full select-none object-cover bg-gray-color/50 animate-pulse" />
        <div className="flex flex-col w-full max-w-[185px] ">
          <div className="h-4 w-24 bg-gray-color/50 animate-pulse rounded-full" />
          <div className="h-3 w-16 bg-gray-color/50 animate-pulse rounded-full mt-1" />
        </div>
      </div>
      <div className="ml-auto">
        <button className=" select-none w-14 h-6 bg-gray-color/50 border-gray-color/50 duration-150 px-2.5 py-0.5 rounded-full text-sm font-medium animate-pulse"></button>
      </div>
    </li>
  );
};
