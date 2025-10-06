import React from "react";

export const ButtonBase = ({ loading, text, className }) => {
  return (
    <button
      className={`border select-none border-light-color w-full hover:bg-light-color hover:text-dark-color text-light-color font-medium py-1 px-4 rounded-full cursor-pointer duration-150 disabled:pointer-events-none disabled:opacity-70 ${className}`}
      type="submit"
      disabled={loading}
    >
      {loading ? "Cargando..." : text}
    </button>
  );
};
