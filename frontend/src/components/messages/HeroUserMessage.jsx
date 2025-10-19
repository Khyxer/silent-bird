import { Flag, Glasses, Settings2, UserRoundSearch } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroUserMessage = ({ userToChatData }) => {
  return (
    <main className="flex items-center gap-3 border rounded-xl border-gray-color/50 p-3">
      <img
        src={userToChatData?.data?.avatarUrl}
        alt={userToChatData?.data?.displayName}
        className="w-12 h-12 rounded-full select-none object-cover"
        draggable={false}
      />
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-lg leading-4">
          {userToChatData?.data?.displayName}
        </h1>
        <p className="text-sm text-gray-color">
          @{userToChatData?.data?.username}
        </p>
      </div>

      <div className="flex items-center ml-auto">
        <Link
          to={`/user/${userToChatData?.data?.username}`}
          className="bg-primary-color text-light-color p-2 rounded-lg hover:bg-gray-color/10 duration-100 cursor-pointer"
        >
          <UserRoundSearch size={18} />
        </Link>
        <button className="bg-primary-color text-light-color p-2 rounded-lg hover:bg-gray-color/10 duration-100 cursor-pointer">
          <Settings2 size={18} />
        </button>
        <button className="bg-primary-color text-light-color p-2 rounded-lg hover:bg-gray-color/10 duration-100 cursor-pointer">
          <Flag size={18} />
        </button>
      </div>
    </main>
  );
};
