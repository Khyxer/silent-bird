import { useState } from "react";
import { showToast } from "@/utils/toastConfig";

//cambiar el nombre por algo que tenga que ver con dar like al post porque no es un action general
export const useHandleActionsPost = ({ post, userData }) => {
  // dar like a un post y cmbiar el color del corazón
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(userData?._id));

  const token = localStorage.getItem("token");

  const handleLikePost = async () => {
    if (!token) {
      showToast("Inicia sesión para dar like", "🗝️");
      return;
    }
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId: post._id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data?.state === "addLike") {
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      } else if (data?.state === "removeLike") {
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error al manejar like:", error);
    }
  };

  const isLikedByUser = () => {
    return isLiked ? "red" : "";
  };

  return { handleLikePost, likeCount, isLikedByUser };
};
