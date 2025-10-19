import { useEffect } from "react";
import { SimpleLoader } from "@/components/loaders/SimpleLoader";
import { Search, X } from "lucide-react";
import { SearchUserCard } from "@/components/user/SearchUserCard";
import { useSearchUser } from "@/hooks/user/useSearchUser";

export const SearchUserPage = () => {
  // busqueda
  const {
    userToFind,
    setUserToFind,
    searchUser,
    loadingUserSearch,
    usersFinded,
  } = useSearchUser();

  useEffect(() => {
    searchUser();
  }, []);

  // Debounce: ejecuta la búsqueda 500ms después de que el usuario deje de escribir
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser();
    }, 300); // 300ms de delay

    // Cleanup: cancela el timeout si el usuario sigue escribiendo
    return () => clearTimeout(timeoutId);
  }, [userToFind]);

  return (
    <main className="max-w-xl mx-auto">
      {/* Buscar */}

      <header className="pb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 justify-center">
          <Search />
          <h1 className="text-center text-2xl font-semibold">
            Buscar usuarios
          </h1>
        </div>
        <div className="flex items-center gap-2 h-10">
          <p className="text-2xl font-bold text-gray-color select-none">@</p>
          <input
            type="text"
            className="w-full rounded-full border border-gray-color/50 p-1 px-4 outline-none h-full focus:border-gray-color duration-100"
            value={userToFind}
            onChange={(e) => {
              setUserToFind(e.target.value);
            }}
            autoFocus
          />
          {!userToFind ? (
            <button
              onClick={searchUser}
              className="h-full rounded-full border border-gray-color/50 aspect-square flex items-center justify-center text-gray-color hover:text-light-color  hover:border-light-color duration-100 cursor-pointer"
            >
              <Search size={20} />
            </button>
          ) : (
            <button
              onClick={() => setUserToFind("")}
              className="h-full rounded-full border border-gray-color/50 aspect-square flex items-center justify-center text-gray-color hover:text-light-color  hover:border-light-color duration-100 cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </header>

      {/* renderizar esto solo si hay texto en la barra de busqueda */}
      <div className="pt-6 border-t border-gray-color/50">
        {loadingUserSearch ? (
          <SimpleLoader />
        ) : usersFinded.length > 0 ? (
          usersFinded.map((user) => (
            <SearchUserCard key={user._id} user={user} />
          ))
        ) : (
          <p className="text-center text-gray-color">
            No se encontraron resultados para{" "}
            <span className="font-semibold text-light-color">
              "{userToFind}"
            </span>
          </p>
        )}
      </div>
    </main>
  );
};
