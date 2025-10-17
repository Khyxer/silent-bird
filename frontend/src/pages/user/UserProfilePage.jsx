import { useEffect } from "react";
import { useGetProfileUser } from "@/hooks/user/useGetProfileUser";
import { useParams } from "react-router-dom";
import { HeroProfileUser } from "@/components/user/HeroProfileUser";
import { useUser } from "@/contexts/UserContexts";
import { UserNotFound } from "@/components/user/UserNotFound";
import { Loader2 } from "lucide-react";
import { useGetPosts } from "@/hooks/post/useGetPosts";
import { CardPost } from "@/components/main/CardPost";
import { formatUserDisplayName } from "@/utils/formatsFunctions";

export const UserProfilePage = () => {
  const { userData } = useUser(); // Datos del usuario actual
  const {
    getUserProfile,
    profileUser,
    loading: loadingUser,
  } = useGetProfileUser(); // Hook para obtener el perfil del usuario
  const { dataPosts, fetchPosts, loading: loadingPosts } = useGetPosts(); // Hook para obtener los posts del usuario
  const userName = useParams().userName; // Nombre de usuario de la URL
  const currentUser = userData?.username === userName; // Verificar si el usuario actual es el mismo que el de la URL

  const formatDisplayName = formatUserDisplayName(userName);
  // useEffect para obtener el perfil y los posts del usuario
  useEffect(() => {
    getUserProfile(userName);
    fetchPosts(userName);
  }, [userName]);

  // if (loadingUser || loadingPosts) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <Loader2 size={40} className="animate-spin text-gray-color" />
  //     </div>
  //   );
  // }

  if (!profileUser && !loadingUser) {
    return <UserNotFound />;
  }

  return (
    <main className="flex flex-col gap-6">
      {/* encabezado con el banner del usuario, avatar, nombre, usuario y boton de seguir */}
      <HeroProfileUser
        profileUser={profileUser}
        currentUser={currentUser}
        loadingUser={loadingUser}
      />

      {/* mostrar los posts del usuario */}
      {loadingPosts ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-gray-color" />
        </div>
      ) : dataPosts?.length > 0 ? (
        dataPosts?.map((post) => <CardPost post={post} key={post._id} />)
      ) : (
        <p className="text-center text-lg text-gray-color">
          ¡Hola{" "}
          <span className="font-semibold text-light-color">
            {formatDisplayName}
          </span>
          , aquí comienza tu historia! <br /> Publica algo para ver tus posts.
        </p>
      )}
    </main>
  );
};
