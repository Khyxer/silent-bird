import { ButtonBase } from "@/UI/UiButtons";
import { Link } from "react-router-dom";
import { usePostForm } from "@/hooks/post/usePostForm";
import { showToast } from "@/utils/toastConfig";
import { formatUserDisplayName } from "@/utils/formatsFunctions";
import { ButtonsNewPost } from "./ButtonsNewPost";
import { useNewPostContext } from "@/contexts/post/useNewPostsContext";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

export const NewPost = ({ userAuthenticated, userData }) => {
  const [currentIndexImage, setCurrentIndexImage] = useState(0);

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

  const { formNewPostData, setFormNewPostData } = useNewPostContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return showToast("El post no puede estar vacío", "⚠️");
    }
    await createPost();
  };

  // manejar siguiente imagen
  const handleNextImage = () => {
    setCurrentIndexImage((prev) => (prev + 1) % formNewPostData.images?.length);
  };

  // manejar anterior imagen
  const handlePrevImage = () => {
    setCurrentIndexImage(
      (prev) =>
        (prev - 1 + formNewPostData.images?.length) %
        formNewPostData.images?.length
    );
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

          {formNewPostData.images.length > 0 && (
            <div className="flex gap-3 px-3 h-82 items-center justify-center relative mb-3">
              <img
                src={formNewPostData.images[currentIndexImage]}
                alt="image-new-post"
                className="h-full object-contain rounded-lg"
              />

              <footer className="absolute bottom-5 flex gap-2">
                <div className="flex gap-2 bg-black/50 rounded-full p-1 items-center backdrop-blur-sm">
                  <button
                    onClick={handlePrevImage}
                    className="cursor-pointer hover:bg-gray-color/50 rounded-full p-1 duration-100"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <p className="text-white text-sm select-none">
                    {currentIndexImage + 1}/{formNewPostData.images.length}
                  </p>
                  <button
                    onClick={handleNextImage}
                    className="cursor-pointer hover:bg-gray-color/50 rounded-full p-1 duration-100"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* boton eliminar */}
                <div className="flex gap-2 bg-black/50 rounded-full p-1 items-center backdrop-blur-sm">
                  <button
                    onClick={() =>
                      setFormNewPostData((prev) => ({
                        ...prev,
                        images: prev.images.filter(
                          (_, index) => index !== currentIndexImage
                        ),
                      }))
                    }
                    className=" cursor-pointer hover:bg-gray-color/50 rounded-full p-1 duration-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </footer>
            </div>
          )}

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
