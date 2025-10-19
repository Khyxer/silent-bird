import { Link } from "react-router-dom";
import { ButtonBase } from "@/UI/UiButtons";
import imageComingSoon from "@/assets/coming-soon.webp";

export const NoAuthUser = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <img src={imageComingSoon} alt="coming soon" className="w-92" />
      <h1 className="text-4xl font-bold text-center max-w-xl">
        Inicia sesión para comenzar a hablar en privado
      </h1>

      <Link to="/auth">
        <ButtonBase
          text="Iniciar sesión"
          className="mt-12 !w-fit text-lg px-7"
        />
      </Link>
      <div className="text-center my-4 items-center flex gap-2 w-xs">
        <div className="w-full bg-gray-color/50 h-[1px]"></div>
        <p className="text-gray-color text-xl">ó</p>
        <div className="w-full bg-gray-color/50 h-[1px]"></div>
      </div>
      <Link to="/auth/register">
        <ButtonBase text="Crear una cuenta" className=" !w-fit text-lg px-7" />
      </Link>
    </div>
  );
};
