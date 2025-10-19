import { Link } from "react-router-dom";
import { UserRoundCheck, VerifiedIcon } from "lucide-react";

export const SearchUserCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user.username}`}
      className="p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-color/10 rounded-lg"
    >
      <img
        src={user.avatarUrl}
        alt={user.displayName}
        className="w-16 h-16 rounded-full select-none object-cover"
        draggable={false}
      />
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl">{user.displayName}</h1>
          {user.verified && <VerifiedIcon className="text-sky-500" />}
        </div>
        <p className="text-gray-color">@{user.username}</p>
      </div>
      <ul className="ml-auto">
        <li>
          <p className="text-gray-color font-medium flex items-center flex-col leading-5">
            {user.followers.length}{" "}
            <span className="text-xs font-normal">Seguidores</span>
          </p>
        </li>
      </ul>
    </Link>
  );
};
