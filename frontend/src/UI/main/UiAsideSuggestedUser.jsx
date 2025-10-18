import { Verified } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContexts";
import { useState } from "react";
import { useFollowUser } from "@/hooks/user/useFollowUser";
import { useEffect } from "react";
import { showToast } from "@/utils/toastConfig";
import { ButtonBase } from "../UiButtons";

export const UiAsideSuggestedUser = ({ user }) => {
  const { userData, userAuthenticated } = useUser();

  const [isFollower, setIsFollower] = useState(false);

  const { followUser } = useFollowUser();

  useEffect(() => {
    if (user.followers.includes(userData?._id)) {
      setIsFollower(true);
    } else {
      setIsFollower(false);
    }
  }, [user, userData]);

  return (
    <div key={user.username} className="flex gap-2 items-center">
      <Link
        to={`/user/${user.username}`}
        className="flex gap-2 items-center group cursor-pointer w-full"
      >
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
      </Link>
      <div className="ml-auto">
        {isFollower ? (
          <button className="border select-none duration-150 px-2.5 py-0.5 rounded-full text-sm font-medium">
            Siguiendo
          </button>
        ) : (
          <ButtonBase
            onClick={() => {
              if (!userAuthenticated) {
                showToast("Debes iniciar sesión para seguir a alguien", "🗝️");
                return;
              }
              followUser(user.username, false);
              setIsFollower(true);
            }}
            className="border !select-none !duration-150 !px-2.5 !py-0.5 !text-sm !font-medium"
            text="Seguir"
            loading={isFollower}
          />
        )}
      </div>
    </div>
  );
};
