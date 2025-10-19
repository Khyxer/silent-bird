import { useRef, useEffect } from "react";
import { useMessagesContext } from "@/contexts/messages/useMessagesContexts";

export const useNewMessage = () => {
  const { setMessagesData } = useMessagesContext();

  const textAreaRef = useRef(null);

  // actualizar altura del textarea
  const updateTextAreaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    updateTextAreaHeight();
  }, [textAreaRef]);

  // enviar mensaje
  const sendMessage = async (receiverUserId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/message/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            content: textAreaRef.current.value,
            receiverUserId: receiverUserId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      textAreaRef.current.value = "";
      updateTextAreaHeight();

      //falsa sensacion de nuevo mensaje
      setMessagesData((prevMessages) => ({
        ...prevMessages,
        messages: [...(prevMessages.messages || []), data.message],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    textAreaRef,
    updateTextAreaHeight,
    sendMessage,
  };
};
