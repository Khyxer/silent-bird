import React from "react";
import {
  House,
  Bird,
  TrendingUp,
  Users,
  FileText,
  MessageCircle,
} from "lucide-react";
import { NavMenuMainPage } from "./NavMenuMainPage";
import { Link } from "react-router-dom";

export const HeaderMainPage = () => {
  const navMenu = [
    {
      icon: House,
      label: "Inicio",
      link: "/",
    },
    {
      icon: TrendingUp,
      label: "Tendencias",
      link: "/tendencias",
    },
    {
      icon: FileText,
      label: "Posts",
      link: "/posts",
    },
    {
      icon: Users,
      label: "Usuarios",
      link: "/search-user",
    },
    {
      icon: MessageCircle,
      label: "Mensajes",
      link: "/mensajes",
    },
  ];

  return (
    <header className="flex sticky top-0 w-full h-15 border-b border-gray-color/50 bg-dark-color/80 backdrop-blur-lg z-90">
      <nav className="flex justify-between items-center max-w-6xl mx-auto w-full p-2 lg:p-0">
        <Link to="/" className="flex items-center gap-12">
          <div className="flex gap-2 items-center cursor-pointer pr-2">
            <Bird />
            <h2 className="text-lg font-semibold">Silent Bird</h2>
          </div>
        </Link>
        <ul className="flex gap-4 items-center">
          <NavMenuMainPage navMenu={navMenu} />
        </ul>
      </nav>
    </header>
  );
};
