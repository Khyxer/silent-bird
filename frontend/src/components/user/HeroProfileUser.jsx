import React from "react";
import { ButtonBase } from "@/UI/UiButtons";
import { Settings, Verified } from "lucide-react";
import { HeroProfileUserLoader } from "@/components/loaders/user/HeroProfileUserLoader";

export const HeroProfileUser = ({ profileUser, currentUser, loadingUser }) => {
  //   console.log(profileUser);
  if (!loadingUser) {
    return <HeroProfileUserLoader />;
  }
  return (
    //contenedor principal
    <main className="border border-gray-color/50 rounded-lg overflow-hidden">
      {/* Encabezado con banner y avatar */}
      <header className="w-full h-[240px] relative">
        {/* Fondo del banner */}
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

        {/* Avatar del usuario */}
        <div className="p-6 mx-auto h-full flex items-end">
          <img
            src={profileUser?.avatarUrl}
            alt={profileUser?.avatarUrl}
            className="w-28 h-28 rounded-full z-10 ring-2 ring-light-color/90 object-cover select-none"
          />
        </div>
      </header>
      {/* Contenido del perfil con nombre, usuario y botones */}
      <footer className="p-6">
        <div className="flex items-center justify-between">
          {/* Información del usuario como nombre, usuario y verificado */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl">{profileUser?.displayName}</h1>
              <span className=" text-lg text-sky-500">
                {profileUser?.verified ? <Verified size={27} /> : ""}
              </span>
              <p className="text-gray-color text-sm">
                {currentUser ? " (Tú)" : ""}
              </p>
            </div>
            <p className="text-gray-color text-lg">@{profileUser?.username}</p>
          </div>
          {/* Botones de seguir y editar perfil si es el usuario actual */}
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
