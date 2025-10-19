import { Flag, Glasses, Settings2, UserRoundSearch } from "lucide-react";

export const UserDataMessageLoader = () => {
  return (
    <main className="flex items-center gap-3 border rounded-xl border-gray-color/50 p-3">
      <div className="w-12 h-12 rounded-full bg-gray-color/20 animate-pulse"></div>
      <div className="flex flex-col justify-center gap-1">
        <h1 className=" bg-gray-color/20 animate-pulse h-5 w-24 rounded"></h1>
        <p className=" bg-gray-color/20 animate-pulse h-4 w-18 rounded"></p>
      </div>

      <div className="flex items-center ml-auto gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className=" rounded-lg bg-gray-color/20 animate-pulse h-8 w-8"
          ></div>
        ))}
      </div>
    </main>
  );
};
