import React from "react";
import { ButtonBase } from "@/UI/UiButtons";
import { Settings, Verified } from "lucide-react";

export const HeroProfileUser = ({ profileUser, currentUser }) => {
  //   console.log(profileUser);
  return (
    <main className="border border-gray-color/50 rounded-lg overflow-hidden">
      <header className="w-full h-[240px] relative">
        <div className="w-full h-full opacity-80 absolute top-0 left-0 -z-10">
          {profileUser?.bannerUrl === "NULL" ? (
            <div className="w-full h-full bg-gray-color/20 mask-b-from-0" />
          ) : (
            <img
              src={profileUser?.bannerUrl}
              alt={profileUser?.bannerUrl}
              className="w-full h-full object-cover mask-b-from-0 select-none"
            />
          )}
        </div>

        <div className="p-6 mx-auto h-full flex items-end">
          <img
            src={profileUser?.avatarUrl}
            alt={profileUser?.avatarUrl}
            className="w-28 h-28 rounded-full z-10 ring-2 ring-light-color/90 object-cover select-none"
          />
        </div>
      </header>
      <footer className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl">{profileUser?.displayName}</h1>
              <p className=" text-lg text-sky-500">
                {profileUser?.verified ? <Verified size={27} /> : ""}
              </p>
            </div>
            <p className="text-gray-color text-lg">@{profileUser?.username}</p>
          </div>
          {currentUser ? (
            <div className="flex items-center gap-2">
              <ButtonBase text="Editar Perfil" className="!w-fit px-5" />
              <button className="border p-1.5 font-medium rounded-full cursor-pointer hover:bg-light-color hover:text-dark-color duration-150">
                <Settings className="" size={20} />
              </button>
            </div>
          ) : (
            <ButtonBase text="Seguir" className="!w-fit px-5" />
          )}
        </div>
      </footer>
    </main>
  );
};
