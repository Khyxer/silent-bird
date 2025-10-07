import { ImageUp, Plus, Trash2 } from "lucide-react";
import { ButtonBase } from "@/UI/UiButtons";
import { useHandleAddImage } from "@/hooks/post/useHandleAddImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { showToast } from "@/utils/toastConfig";

export const AddIamgePost = () => {
  const {
    handleNextImage,
    handlePrevImage,
    currentImage,
    imagesPreview,
    setNewImage,
    updateImagesPreview,
    handleDeleteImage,
    newImage,
  } = useHandleAddImage();

  return (
    <main>
      <div className="border-3 border-dashed border-gray-color/80 hover:border-light-color rounded-lg p-6 flex items-center justify-center py-15 group duration-150 cursor-pointer flex-col">
        <ImageUp
          size={70}
          strokeWidth={1.5}
          className="text-gray-color/80 group-hover:text-light-color duration-150"
        />
        <p className="text-gray-color/80 group-hover:text-light-color duration-150 text-center">
          Sube tus propias imágenes
        </p>
      </div>

      {/* lineas separadoras */}
      <div className="text-center mt-4 items-center flex gap-2">
        <div className="w-full bg-gray-color/50 h-[1px]"></div>
        <p className="text-gray-color text-xl">ó</p>
        <div className="w-full bg-gray-color/50 h-[1px]"></div>
      </div>

      {/* URL */}
      <p className="text-gray-color/80 group-hover:text-light-color duration-150 text-center mb-1 mt-2">
        Usa una imagen ya existente
      </p>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          className="border rounded-lg border-gray-color/50 px-3 py-2 outline-none w-full select-none"
          onChange={(e) => setNewImage(e.target.value)}
          value={newImage}
        />
        <button
          className="border border-gray-color/50 hover:border-light-color rounded-full p-2 cursor-pointer duration-200 group "
          onClick={() => {
            updateImagesPreview();
            setNewImage("");
          }}
        >
          <Plus className="group-hover:text-light-color text-gray-color/50 duration-200" />
        </button>
      </div>

      {/* previsualizacion de imgs */}
      <div className="h-[240px] relative">
        <div className="w-full h-full">
          {imagesPreview.length > 0 ? (
            <div className="w-full h-full relative">
              <img
                src={imagesPreview[currentImage]}
                onError={() => {
                  handleDeleteImage();
                  showToast(
                    "La imagen no se pudo cargar, verifica la URL",
                    "⚠️"
                  );
                }}
                alt="image-add-new-post"
                className="w-fit mx-auto h-full object-contain rounded-lg"
              />

              {/* boton borrar */}
              <button
                onClick={handleDeleteImage}
                className="absolute top-3 right-3 z-10 cursor-pointer bg-black/80 hover:bg-red-500 rounded-full p-2 duration-100"
              >
                <Trash2 size={19} />
              </button>

              {/* index */}
              <p className="absolute bottom-3 px-3 left-1/2 -translate-x-1/2 z-10 cursor-pointer bg-black/50 hover:bg-red-500 rounded-full p-2 duration-100 text-xs">
                {currentImage + 1}/{imagesPreview.length}
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg text-gray-color">
              No hay imágenes
            </div>
          )}
        </div>
        {imagesPreview.length > 0 && (
          <div>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 -translate-y-1/2 left-3 z-10 cursor-pointer bg-black/80 rounded-full p-2"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 -translate-y-1/2 right-3 z-10 cursor-pointer bg-black/80 rounded-full p-2"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        )}
      </div>

      {/* boton */}
      <ButtonBase text="Aceptar" className="mt-6 text-lg py-2" />
    </main>
  );
};
