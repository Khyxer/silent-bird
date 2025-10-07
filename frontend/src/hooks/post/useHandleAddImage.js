import { useState } from "react";
import { showToast } from "@/utils/toastConfig";

export const useHandleAddImage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [newImage, setNewImage] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  // manejar siguiente imagen
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imagesPreview?.length);
  };

  // manejar anterior imagen
  const handlePrevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + imagesPreview?.length) % imagesPreview?.length
    );
  };

  //actualizar lista de imagenes
  const updateImagesPreview = () => {
    if (!newImage || newImage.trim() === "")
      return showToast("La URL no puede estar vacía", "⚠️");

    if (imagesPreview.includes(newImage))
      return showToast("Ya tienes esta imagen", "⚠️");

    if (imagesPreview.length > 9)
      return showToast("Solo puedes subir 10 imágenes por publicación", "⚠️");

    setImagesPreview([...imagesPreview, newImage]);
    setCurrentImage(imagesPreview?.length);
  };

  // eliminar imagen
  const handleDeleteImage = () => {
    setImagesPreview(
      imagesPreview.filter((_, index) => index !== currentImage)
    );
    setCurrentImage(0);
  };

  return {
    handleNextImage,
    handlePrevImage,
    currentImage,
    imagesPreview,
    updateImagesPreview,
    setNewImage,
    handleDeleteImage,
    newImage,
  };
};
