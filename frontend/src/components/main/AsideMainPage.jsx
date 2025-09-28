import React from "react";
import {
  BadgeCheck,
  LogOut as LogOutIcon,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonBase } from "@/UI/UiButtons";

export const AsideMainPage = ({
  userData,
  userAuthenticated,
  handleLogOut,
}) => {
  const users = [
    {
      name: "Megumin",
      username: "@megumin",
      avatar:
        "https://i.pinimg.com/736x/5a/1a/d6/5a1ad61b5a3f3ccb7e5ddda6e88fe871.jpg",
    },
    {
      name: "Just Khyxer",
      username: "@khyxer",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxcXbisp1YXxsfx4VmjRZL-9rNfunF4DNpQ&s",
    },
    {
      name: "TocaColas",
      username: "@tocacolas_official",
      avatar:
        "https://www.cocacolaep.com/assets/legacy-assets/Uploads/resources/Coca-Cola-1210.jpg",
    },
  ];

  const tendencias = [
    {
      hashtag: "#MeguminOutInAllProjects",
      count: 12529,
    },
    {
      hashtag: "#DeleteThisApp",
      count: 8200,
    },
    {
      hashtag: "#TocaColasDemandForPambicoins",
      count: 5302,
    },
    {
      hashtag: "#HowDeleteSystem32",
      count: 3982,
    },
  ];
  const formatNumber = (number) => {
    if (number < 1000) {
      return number.toString();
    }

    const abreviado = (number / 1000).toFixed(1);

    return abreviado.endsWith(".0")
      ? abreviado.slice(0, -2) + "k"
      : abreviado + "k";
  };
  return (
    <aside className="hidden md:flex flex-col space-y-6 w-[480px] sticky top-21 self-start h-[89vh]">
      {/* cuentas sugeridas */}
      <div className="border border-gray-color/50 p-4 rounded-xl w-full">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
          <Users size={22} /> Cuentas sugeridas
        </h3>

        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.username} className="flex gap-2 items-center">
              <div className="flex gap-2 items-center group cursor-pointer">
                <img
                  src={user.avatar}
                  className="w-11 aspect-square rounded-full select-none object-cover"
                  draggable={false}
                  alt="avatar"
                />
                <div className="flex flex-col w-full max-w-[185px] ">
                  <div className="flex gap-1 items-center group-hover:underline">
                    <h5 className="font-medium line-clamp-1">{user.name}</h5>
                    <BadgeCheck size={17} className="text-sky-500" />
                  </div>
                  <p className="text-gray-color text-sm line-clamp-1">
                    {user.username}
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <button className="border select-none duration-150 px-2.5 py-0.5 rounded-full text-sm cursor-pointer hover:bg-light-color hover:text-dark-color font-medium">
                  Seguir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* tendencias */}

      <div className="hidden md:block border border-gray-color/50 p-4 rounded-xl w-full">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
          <TrendingUp size={22} /> Tendencias
        </h3>

        <ul className="space-y-4">
          {tendencias.map((trend) => (
            <li key={trend.hashtag} className="group cursor-pointer ">
              <p className="group-hover:underline">{trend.hashtag}</p>
              <p className="text-gray-color text-sm">
                {formatNumber(trend.count)} publicaciones
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* usuario */}
      {userAuthenticated ? (
        <footer className="border border-gray-color/50 p-4 rounded-xl w-full flex gap-4 items-center mt-auto">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center group cursor-pointer">
              <img
                src={userData?.avatarUrl}
                className="w-11 aspect-square rounded-full select-none object-cover"
                draggable={false}
                alt="avatar"
              />
              <div className="flex flex-col w-full max-w-[185px] ">
                <div className="flex gap-1 items-center group-hover:underline">
                  <h5 className="font-medium line-clamp-1">
                    {userData?.displayName}
                  </h5>
                  <BadgeCheck size={17} className="text-sky-500" />
                </div>
                <p className="text-gray-color text-sm line-clamp-1">
                  @{userData?.username}
                </p>
              </div>
            </div>
          </div>
          <div className="ml-auto gap-2 flex items-center">
            <button className="border border-transparent hover:border-light-color rounded-full p-2 cursor-pointer duration-200 ">
              <Settings className="hover:text-light-color text-gray-color duration-200" />
            </button>
            <button
              onClick={() => handleLogOut()}
              className="border border-transparent hover:border-light-color rounded-full p-2 cursor-pointer duration-200 "
            >
              <LogOutIcon className="hover:text-light-color text-gray-color duration-200" />
            </button>
          </div>
        </footer>
      ) : (
        <Link to="/auth" className="mt-auto">
          <ButtonBase
            text="Iniciar Sesión"
            className="py-2 text-lg font-semibold"
          />
        </Link>
      )}
    </aside>
  );
};
