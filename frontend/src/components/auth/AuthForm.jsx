import React from "react";
import { UIInputBase } from "../../UI/UiInputs";
import { Bird } from "lucide-react";
import { Link } from "react-router-dom";
import { useHandleFormAuth } from "../../hooks/auth/useHandleFormAuth";

export const AuthForm = ({ isRegister }) => {
  const {
    confirmPass,
    setConfirmPass,
    formData,
    setFormData,
    handleClearForm,
    handleSubmitLoginForm,
    handleSubmitRegisterForm,
    loading,
    // handleTogglePassword,
  } = useHandleFormAuth({ isRegister });

  return (
    <form
      //si register es true entonces ejecuta la funcion de registrarse si no entonces loguea
      onSubmit={isRegister ? handleSubmitRegisterForm : handleSubmitLoginForm}
      className="w-[400px] rounded-lg p-5 backdrop-blur-lg flex flex-col items-center justify-center gap-8  z-10"
    >
      <h1 className="text-4xl font-black text-center flex items-center gap-4">
        <Bird size={34} />
        Silent Bird
      </h1>

      <div className="max-w-[350px] flex flex-col gap-4 w-full">
        <UIInputBase
          id="user"
          type="text"
          loading={loading}
          placeholder="Usuario"
          value={formData.username.trim()}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {/* aqui va el nombre de usuario pero no me termina de gustar que este aca 
        {isRegister && (
          <UIInputBase
            id="displayName"
            type="text"
            loading={loading}
            placeholder="Nombre"
          />
        )} */}
        <UIInputBase
          id="password"
          type="password"
          loading={loading}
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {isRegister && (
          <UIInputBase
            id="password-confirm"
            type="password"
            loading={loading}
            placeholder="Confirmar Contraseña"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        )}
        <button
          className="border mt-2 border-light-color w-full hover:bg-light-color hover:text-dark-color text-light-color font-bold py-2 px-8 rounded-full text-lg cursor-pointer duration-150 disabled:pointer-events-none disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Cargando..."
            : isRegister
            ? "Registrarse"
            : "Iniciar Sesión"}
        </button>
        <p className="text-center text-gray-color">
          {isRegister ? "¿Tienes una cuenta?" : "¿No tienes una cuenta?"}
          <Link
            to={isRegister ? "/auth" : "/auth/register"}
            onClick={handleClearForm}
            className="text-light-color cursor-pointer hover:underline ml-1"
          >
            {isRegister ? "Inicia Sesión" : "Registrate"}
          </Link>
        </p>
      </div>
    </form>
  );
};
