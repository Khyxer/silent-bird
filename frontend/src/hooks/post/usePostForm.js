import { useState, useRef, useEffect } from "react";
import { showToast } from "@/utils/toastConfig";
import { useNewPostContext } from "@/contexts/post/useNewPostsContext";

export const usePostForm = () => {
  //formulario del context
  const { formNewPostData, setFormNewPostData } = useNewPostContext();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  // longitud del texto
  const [textLength, setTextLength] = useState(0);

  // alturas del textarea
  const minHeight = 60;
  const maxHeight = 200;

  // actualizar postData cuando cambie el texto
  useEffect(() => {
    setFormNewPostData((prev) => ({ ...prev, content: text }));
    console.log(formNewPostData);
  }, [text]);

  // ajustar altura del textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const newHeight = Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight
      );

      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };

  // ajustar altura del textarea
  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  // manejar cambios en el textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
    setTextLength(e.target.value.length);
  };

  // limpiar/resetear el formulario
  const resetForm = () => {
    setText("");
    setTextLength(0);
    setFormNewPostData({
      content: "",
      images: [],
      taggedUsers: [],
      hashtags: [],
    });
  };

  // enviar datos al formulario y crear el post
  const createPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formNewPostData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      showToast("Post creado exitosamente");
      resetForm(); // Limpiar todo el formulario
    } catch (error) {
      console.error(error);
      showToast(error.message, "⚠️");
    } finally {
      setLoading(false);
    }
  };

  return {
    // estado del texto y textarea
    text,
    textareaRef,
    handleTextChange,
    minHeight,
    maxHeight,

    // funciones
    createPost,
    resetForm,
    loading,
    textLength,
  };
};
