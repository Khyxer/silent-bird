import React from "react";
import { showErrorToast, showToast } from "../../utils/toastConfig";

/**
 * este hook maneja los formularios de autenticacion, tanto de login como de registro
 *
 * @param {boolean} isRegister - indica si el formulario es de registro
 * @returns {object} - objeto con las funciones y variables para manejar el formulario
 */
export const useHandleFormAuth = ({ isRegister }) => {
  const [loading, setLoading] = React.useState(false);

  const [confirmPass, setConfirmPass] = React.useState("");
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  /**
   * funcion para loguear al usuario
   * @param {Event} e - evento submit del formulario
   */
  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    if (!validarDatos()) return;

    try {
      setLoading(true);
      //llamada a la API
      console.log(`${import.meta.env.VITE_API_URL}/auth/login`);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), //enviamos los datos del formulario
        }
      );
      const data = await response.json();

      //si hubo un error en la respuesta
      if (!response.ok) {
        showErrorToast(`${data.message}`);
        return;
      }
      // si todo salio bien, guardamos el token del usuario y redirigimos a la pagina principal
      if (data.success) {
        localStorage.setItem("token", data.data.token); // guardar el token
        // showToast(data.message); //mensaje exitoso
        window.location.href = "/";
        // handleClearForm();
      }
    } catch (error) {
      //   console.log(error);
      //   console.log(error.message);
      showErrorToast(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * funcion para registrar al usuario
   * @param {Event} e - evento submit del formulario
   */
  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    //si los datos son invalidos retornamos
    if (!validarDatos()) return;

    try {
      setLoading(true);
      //llamada a la API
      console.log(`${import.meta.env.VITE_API_URL}/auth/register`);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), //enviamos los datos del formulario
        }
      );
      const data = await response.json();

      //si hubo un error en la respuesta
      if (!response.ok) {
        showErrorToast(`${data.message}`);
        return;
      }

      // si todo salio bien, logueamos al usuario y limpiamos el formulario
      const formatName =
        data.data.user.displayName.charAt(0).toUpperCase() +
        data.data.user.displayName.slice(1);

      handleClearForm();
      showToast(`Bienvenido ${formatName}`, "👏");
    } catch (error) {
      //   console.log(error);
      //   console.log(error.message);
      showErrorToast(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Funciones Auxiliares (FA#)
  // FA1: Limpiar el formulario
  const handleClearForm = () => {
    setFormData({ username: "", password: "" });
    setConfirmPass("");
  };

  /**
   * FA2: Validar datos de formularios
   * @returns {boolean} - retorna true si los datos son validos, false si no
   */
  const validarDatos = () => {
    if (
      formData.username.trim() === "" ||
      formData.password.trim() === "" ||
      (isRegister && confirmPass.trim() === "")
    ) {
      showToast("Por favor, completa todos los campos", "⚠️");
      return false;
    }

    if (isRegister && formData.password !== confirmPass) {
      showToast("Las contraseñas no coinciden", "⚠️");
      return false;
    }
    return true;
  };

  // FA3: Ver/Ocultar contraseñas
  const handleTogglePassword = () => {
    setFormData({
      ...formData,
      password: formData.password === "password" ? "text" : "password",
    });
  };

  return {
    confirmPass,
    setConfirmPass,
    formData,
    setFormData,
    validarDatos,
    handleClearForm,
    handleSubmitLoginForm,
    handleSubmitRegisterForm,
    handleTogglePassword,
    loading,
  };
};
