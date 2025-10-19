import {
  MessageCircle,
  Search,
  Settings,
  TextSearch,
  Users,
} from "lucide-react";
export const AsideMessagePage = () => {
  return (
    <aside className="hidden md:flex flex-col space-y-6 max-w-sm w-full sticky top-21 self-start h-full border-r border-gray-color/50 p-3">
      {/* cuentas sugeridas */}
      <header className="pb-6 flex flex-col gap-3">
        <div className="flex items-center  justify-between">
          <h1 className=" text-xl font-medium">Mensajes</h1>
          <button className="bg-primary-color text-light-color p-2 rounded-lg hover:bg-gray-color/10 duration-100 cursor-pointer">
            <TextSearch size={18} />
          </button>
        </div>
        <div className="flex items-center h-9 border rounded-xl border-gray-color/50 pl-2 focus-within:border-gray-color duration-100 text-gray-color">
          <Search size={20} />
          <input
            type="text"
            placeholder="Busca un usuario para iniciar un chat"
            className="w-full rounded-lg border-none p-1 px-2 outline-none h-full"
            autoFocus
          />
        </div>
      </header>
    </aside>
  );
};
