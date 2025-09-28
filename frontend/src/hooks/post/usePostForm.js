import { useState, useRef, useEffect } from "react";
import { showToast } from "@/utils/toastConfig";

export const usePostForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const [textLength, setTextLength] = useState(0);

  const minHeight = 60;
  const maxHeight = 200;

  // Estado del post
  const [postData, setPostData] = useState({
    content: "",
    images: [],
    taggedUsers: [],
    hashtags: [],
  });

  // Actualizar postData cuando cambie el texto
  useEffect(() => {
    setPostData((prev) => ({ ...prev, content: text }));
  }, [text]);

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

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setTextLength(e.target.value.length);
  };

  const resetForm = () => {
    setText("");
    setTextLength(0);
    setPostData({
      content: "",
      images: [],
      taggedUsers: [],
      hashtags: [],
    });
  };

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
          body: JSON.stringify(postData),
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
    // Estado del texto y textarea
    text,
    textareaRef,
    handleTextChange,
    minHeight,
    maxHeight,

    // Estado del post
    postData,
    setPostData,

    // Funciones
    createPost,
    resetForm,
    loading,
    textLength,
  };
};
