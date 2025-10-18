import { ButtonBase } from "@/UI/UiButtons";
import imageComingSoon from "../../assets/coming-soon.webp";
import { Link } from "react-router-dom";

export const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <img src={imageComingSoon} alt="coming soon" className="w-92" />
      <h1 className="text-4xl font-bold text-center">
        Estoy trabajando en esta sección <br />
        ¡Vuelve pronto!
      </h1>

      <Link to="/">
        <ButtonBase
          text="Volver al inicio"
          className="mt-6 !w-fit text-lg px-7"
        />
      </Link>
    </div>
  );
};
