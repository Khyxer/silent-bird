import { ButtonBase } from "@/UI/UiButtons";
import { Settings, Verified } from "lucide-react";
import { HeroProfileUserLoader } from "@/components/loaders/user/HeroProfileUserLoader";
import { useUser } from "@/contexts/UserContexts";
import { formatNumberToK } from "@/utils/formatsFunctions";
import { useFollowUser } from "@/hooks/user/useFollowUser";
import { useEffect, useState } from "react";
import { showToast } from "@/utils/toastConfig";

export const HeroProfileUser = ({ profileUser, currentUser, loadingUser }) => {
  //   console.log(profileUser);
  const { userData, userAuthenticated } = useUser();

  const [followContent, setFollowContent] = useState({
    text: "Seguir",
    unfollow: false,
  });

  const { followUser, loadingFollow } = useFollowUser();

  const [followCount, setFollowCount] = useState(0);

  const [baseLoading, setBaseLoading] = useState(true);

  //cambiar el texto del botón y su funcion para seguir o dejar de seguir
  const updateTempFollowData = () => {
    //primero verificar si esta autenticado
    if (!userAuthenticated) {
      showToast("Debes iniciar sesión para seguir a alguien", "🗝️");
      return;
    }

    if (followContent.text === "Seguir") {
      setFollowContent({
        text: "Dejar de seguir",
        unfollow: true,
      });
      setFollowCount(followCount + 1);
    } else {
      setFollowContent({
        text: "Seguir",
        unfollow: false,
      });
      setFollowCount(followCount - 1);
    }
  };

  useEffect(() => {
    if (profileUser?.followers.includes(userData?._id)) {
      setFollowContent({
        text: "Dejar de seguir",
        unfollow: true,
      });
    } else {
      setFollowContent({
        text: "Seguir",
        unfollow: false,
      });
    }
    //actualizar el numero de seguidores
    if (profileUser?.followers) {
      setFollowCount(profileUser.followers.length);
    }

    //solo al cargar todo
    setBaseLoading(false);
  }, [profileUser, userData]);

  const dataMap = {
    followers: Number(followCount),
    following: profileUser?.following.length,
    likes: profileUser?.likes,
    posts: profileUser?.posts,
  };

  if (loadingUser || baseLoading) {
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
            className="w-28 h-28 rounded-full z-10 ring-2 ring-light-color/90 object-cover select-none bg-dark-color"
          />
        </div>
      </header>
      {/* Contenido del perfil con nombre, usuario y botones */}
      <footer className="p-6 pb-3">
        <div className="flex items-center justify-between">
          {/* Información del usuario como nombre, usuario y verificado */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl ">
                {profileUser?.displayName}
              </h1>
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
            <ButtonBase
              text={followContent.text}
              onClick={() => {
                followUser(profileUser?.username, followContent.unfollow);
                // console.log(followContent.unfollow);
                updateTempFollowData();
              }}
              className="!w-fit px-5"
              loading={loadingFollow}
            />
          )}
        </div>
      </footer>

      {/* data */}
      <div className="p-6 pt-3">
        <div className="flex gap-9 w-full border-t border-gray-color/50 pt-6">
          {Object.entries(dataMap).map(([key, value]) => (
            <div key={key} className=" flex flex-col items-center">
              <p className="text-2xl font-black leading-6">
                {formatNumberToK(value)}
              </p>
              <span className="text-sm text-gray-color">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
