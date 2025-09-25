import React from "react";
import { ButtonBase } from "@/UI/UiButtons";
import {
  House,
  Bird,
  TrendingUp,
  Users,
  FileText,
  MessageCircle,
  Bell,
} from "lucide-react";
import { NavMenuMainPage } from "./NavMenuMainPage";
import { Link } from "react-router-dom";
import { MainLoader } from "../loaders/MainLoader";

export const HeaderMainPage = ({
  userData,
  userAuthenticated,
  loadingUserContext,
}) => {
  console.log(userAuthenticated);
  const navMenu = [
    {
      icon: House,
      label: "Inicio",
      href: "/",
    },
    {
      icon: TrendingUp,
      label: "Tendencias",
      href: "/tendencias",
    },
    {
      icon: FileText,
      label: "Posts",
      href: "/posts",
    },
    {
      icon: Users,
      label: "Usuarios",
      href: "/usuarios",
    },
    {
      icon: MessageCircle,
      label: "Mensajes",
      href: "/mensajes",
    },
  ];

  if (loadingUserContext) {
    return <MainLoader />;
  }

  return (
    <header className="flex sticky top-0 w-full h-15 border-b border-gray-color/50 bg-dark-color/80 backdrop-blur-lg z-90">
      <nav className="flex justify-between items-center max-w-7xl mx-auto w-full p-2">
        <div className="flex items-center gap-12">
          <div className="flex gap-2 items-center cursor-pointer pr-2">
            <Bird />
            <h2 className="text-lg font-semibold">Silent Bird</h2>
          </div>
          <ul className="flex gap-4 items-center">
            <NavMenuMainPage navMenu={navMenu} />
          </ul>
        </div>
        <div>
          {userAuthenticated ? (
            <div className="flex gap-4 items-center">
              {/* <button className="p-2 hover:bg-gray-color/10 rounded-lg cursor-pointer flex gap-2 items-center">
                <Bell />
              </button> */}
              <button className="border border-transparent hover:border-light-color rounded-full p-2 cursor-pointer duration-200">
                <Bell className="hover:text-light-color text-gray-color duration-200" />
              </button>
              <img
                src={userData?.avatarUrl}
                className="w-11 aspect-square rounded-full object-cover"
                alt="avatar"
              />
            </div>
          ) : (
            <Link to="/auth" className="ml-2">
              <ButtonBase text="Iniciar Sesión" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
