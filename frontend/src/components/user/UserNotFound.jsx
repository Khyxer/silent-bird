import { SearchX } from "lucide-react";
import React from "react";

export const UserNotFound = () => {
  return (
    <div className=" rounded-lg p-6 flex flex-col gap-3 items-center ">
      <h1 className="text-3xl font-semibold">Usuario no encontrado</h1>
      <p className="text-gray-color mb-4">
        Lo siento, parece que el usuario que buscas no existe o ha sido
        eliminado.
      </p>
      <SearchX size={60} className="text-gray-color" />
    </div>
  );
};
