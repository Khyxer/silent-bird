import { useState } from "react";
import { showToast } from "@/utils/toastConfig";
import { useNewPostContext } from "@/contexts/post/useNewPostsContext";

export const useHandleAddImage = () => {
  //contexto
  const { formNewPostData, setFormNewPostData } = useNewPostContext();

  const [currentImage, setCurrentImage] = useState(0); // indice de la imagen actual para la previsualizacion
  const [newImage, setNewImage] = useState(""); // url de la nueva imagen
  const [imagesPreview, setImagesPreview] = useState(formNewPostData.images); // lista de imagenes


  //imgBB
  const [uploading, setUploading] = useState(false);

  //api imgBB
  const API_KEY = import.meta.env.VITE_IMG_API_KEY;

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
  const updateImagesPreview = (urlImg) => {
    if (!urlImg || urlImg.trim() === "")
      return showToast("La URL no puede estar vacía", "⚠️");

    if (imagesPreview.includes(urlImg))
      return showToast("Ya tienes esta imagen", "⚠️");

    if (imagesPreview.length > 9)
      return showToast("Solo puedes subir 10 imágenes por publicación", "⚠️");

    setImagesPreview([...imagesPreview, urlImg]);
    setCurrentImage(imagesPreview?.length);
    setNewImage("");
  };

  // eliminar imagen
  const handleDeleteImage = () => {
    setImagesPreview(
      imagesPreview.filter((_, index) => index !== currentImage)
    );
    setCurrentImage(0);
  };

  // subir imagen ImgBB

  // convertirla imagen a base64 porque asi lo pide imgBB
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });
  };

  // subir la imagen a imgBB cada que se seleccione, no es muy eficiente pero es la forma mas sencilla, tampoco me voy a complicar por una diferencia tan pequeña
  const handleUploadImg = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    updateImagesPreview(URL.createObjectURL(selectedFile));

    try {
      const base64Image = await toBase64(selectedFile);

      const formData = new FormData();
      formData.append("image", base64Image);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error.message);
      }

      // console.log("Imagen subida:", result);
      // console.log("URL:", result.data.url);
      // el result tambien devuelve la imagen en otras resoluciones, quizas se pueda usar para optimizarlas

      setImagesPreview([...imagesPreview, result.data.url]);
      setCurrentImage(imagesPreview?.length);
    } catch (err) {
      console.error("Error en la subida:", err);
    } finally {
      setUploading(false);
    }
  };

  const acceptImage = () => {
    setFormNewPostData({ ...formNewPostData, images: imagesPreview });
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
    handleUploadImg,
    uploading,
    acceptImage,
  };
};
