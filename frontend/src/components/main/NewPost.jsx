import React from "react";
import { ButtonBase } from "@/UI/UiButtons";
import { Link } from "react-router-dom";
import { usePostForm } from "@/hooks/post/usePostForm";
import { showToast } from "@/utils/toastConfig";
import { formatUserDisplayName } from "@/utils/formatsFunctions";
import { ButtonsNewPost } from "./ButtonsNewPost";

export const NewPost = ({ userAuthenticated, userData }) => {
  // hooks
  const {
    text,
    textareaRef,
    handleTextChange,
    minHeight,
    maxHeight,
    createPost,
    loading,
    textLength,
  } = usePostForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return showToast("El post no puede estar vacío", "⚠️");
    }
    await createPost();
  };

  return (
    <>
      {userAuthenticated ? (
        <div className="border rounded-xl border-gray-color/50 w-full overflow-hidden">
          <div className="flex items-center pl-4">
            <img
              src={userData?.avatarUrl}
              alt={userData?.displayName}
              className="w-11 h-11 object-cover rounded-full mb-auto mt-4 user-select-none"
              draggable={false}
            />
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              className="p-4 w-full resize-none outline-none border-none custom-scroll pb-8"
              placeholder={`¿Qué estás pensando ${formatUserDisplayName(
                userData?.username
              )}?`}
              style={{
                minHeight: `${minHeight}px`,
                maxHeight: `${maxHeight}px`,
                overflowY: "hidden",
              }}
            />
          </div>

          {/** botones de acciones
           * enviar post
           * agregar imagenes
           * agregar hashtags
           * agregar usuarios
           */}
          <ButtonsNewPost
            textLength={textLength}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center py-6">
          <h5 className="text-center text-2xl font-semibold mb-7">
            ¡Inicia sesión para compartir tus ideas y opiniones con los demas!
          </h5>
          <div className="flex flex-col items-center gap-1">
            <Link to="/auth">
              <ButtonBase text="Iniciar sesión" className="!w-fit px-8" />
            </Link>
            <div className="text-center mt-1 items-center flex gap-2">
              <div className="w-16 bg-gray-color/50 h-[1px]"></div>
              <p className="text-gray-color">ó</p>
              <div className="w-16 bg-gray-color/50 h-[1px]"></div>
            </div>

            <Link
              to="/auth/register"
              className="text-center cursor-pointer hover:underline text-gray-color hover:text-light-color duration-150"
            >
              Crea una cuenta aquí
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
