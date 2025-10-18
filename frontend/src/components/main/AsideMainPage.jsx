import React, { useEffect } from "react";
import {
  BadgeCheck,
  LogOut as LogOutIcon,
  Meh,
  Settings,
  TrendingUp,
  Users,
  Verified,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonBase } from "@/UI/UiButtons";
import { useCuentasSugeridas } from "@/hooks/aside/useCuentasSugeridas";
import { UiAsideSuggestedUser } from "@/UI/main/UiAsideSuggestedUser";
import { formatNumberToK } from "@/utils/formatsFunctions";
import { AsideMainPageLoaders } from "@/components/loaders/AsideMainPageLoaders";

export const AsideMainPage = ({
  userData,
  userAuthenticated,
  handleLogOut,
}) => {
  const { users, fetchUsers, loading } = useCuentasSugeridas();

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);

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

  return (
    <aside className="hidden md:flex flex-col space-y-6 w-[480px] sticky top-21 self-start h-[89vh]">
      {/* cuentas sugeridas */}
      <div className="border border-gray-color/50 p-4 rounded-xl w-full">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
          <Users size={22} /> Cuentas sugeridas
        </h3>

        {/* lista de las cuentas sugeridas con la ui de carga */}
        <ul className="space-y-4">
          {/* ========= Si esta cargando */}
          {loading ? (
            new Array(3)
              .fill(0)
              .map((_, index) => <AsideMainPageLoaders key={index} />)
          ) : // ========= Si todo salio bien Mostrar los usuarios
          users.length > 0 ? (
            users.map((user) => (
              <UiAsideSuggestedUser key={user.username} user={user} />
            ))
          ) : (
            // ======== si no hay usuarios
            <p className="text-center text-gray-color text-lg font-medium">
              Parece que no hay usuarios que puedan interesarte
              <Meh className="mx-auto mt-2" size={40} strokeWidth={1.5} />
            </p>
          )}
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
                {formatNumberToK(trend.count)} publicaciones
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* usuario */}
      {userAuthenticated ? (
        <footer className="border border-gray-color/50 p-4 rounded-xl w-full flex gap-4 items-center mt-auto">
          {/* <Link
            to={`/user/${userData?.username}`}
            className="flex gap-2 items-center"
          >
            <div className="flex gap-2 items-center group cursor-pointer">
              <img
                src={userData?.avatarUrl}
                className="w-11 aspect-square rounded-full select-none object-cover"
                draggable={false}
                alt="avatar"
              />
              <div className="flex flex-col w-full max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                <div className="flex gap-1 items-center group-hover:underline">
                  <h5 className="font-medium line-clamp-1">
                    {userData?.displayName}
                  </h5>
                  {userData?.verified && (
                    <BadgeCheck size={17} className="text-sky-500" />
                  )}
                </div>
                <p className="text-gray-color text-sm line-clamp-1">
                  @{userData?.username}
                </p>
              </div>
            </div>
          </Link>
          <button
            onClick={() => handleLogOut()}
            className="border border-transparent hover:border-light-color rounded-full p-2 cursor-pointer duration-200 group"
          >
            <LogOutIcon className="hover:text-light-color text-gray-color duration-200 group-hover:text-light-color" />
          </button> */}

          <div
            key={userData?.username}
            className="flex gap-2 items-center w-full"
          >
            <Link
              to={`/user/${userData?.username}`}
              className="flex gap-2 items-center group cursor-pointer w-full"
            >
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
                  {userData?.verified && (
                    <Verified size={17} className="text-sky-500" />
                  )}
                </div>
                <p className="text-gray-color text-sm line-clamp-1">
                  @{userData?.username}
                </p>
              </div>
            </Link>
            <div className="ml-auto">
              <button
                onClick={() => handleLogOut()}
                className="border border-transparent hover:border-light-color rounded-full p-2 cursor-pointer duration-200 group"
              >
                <LogOutIcon className="hover:text-light-color text-gray-color duration-200 group-hover:text-light-color" />
              </button>
            </div>
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
