import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export const AuthPage = () => {
  const isRegister = window.location.pathname.includes("register");

  useEffect(() => {
    document.title = isRegister
      ? "Silent Bird | Registrarse"
      : "Silent Bird | Iniciar Sesión";
  }, [isRegister]);

  return (
    <div className="h-screen flex items-center justify-center bg-dark-color text-light-color relative">
      {/* formulario */}
      <section className="w-full h-full flex items-center justify-center">
        <AuthForm isRegister={isRegister} />
      </section>

      {/* decoraciones */}
      <div className="absolute bottom-0 w-full h-full animate-pulse flex justify-between pointer-events-none opacity-40">
        <div className="flex items-start p-12">
          <img
            src="/moon.webp"
            alt=""
            className="h-[25%] object-contain"
          />
        </div>
        <div className="flex items-end justify-end mr-12">
          <img
            src="/tree.webp"
            alt=""
            className="h-[75%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};
