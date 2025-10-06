import React from "react";
import { Image, Send, AtSign, Hash, Loader2 } from "lucide-react";
import { ButtonBase } from "@/UI/UiButtons";
import { Link } from "react-router-dom";
import { usePostForm } from "@/hooks/post/usePostForm";
import { showToast } from "@/utils/toastConfig";
import { formatUserDisplayName } from "@/utils/formatsFunctions";

export const NewPost = ({ userAuthenticated, userData }) => {
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
              alt=""
              className="w-11 h-11 object-cover rounded-full mb-auto mt-4"
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
          <div className="p-3 pt-0 flex justify-between items-center">
            <div className="flex">
              <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
                <Image size={20} />
              </button>
              <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
                <AtSign size={20} />
              </button>
              <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
                <Hash size={20} />
              </button>
            </div>
            <div className="flex items-center">
              <span
                style={{ color: textLength > 2000 ? "red" : "" }}
                className="text-gray-color/80 text-xs mr-2"
              >
                {textLength}/2000
              </span>
              <button
                className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150"
                onClick={handleSubmit}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
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
