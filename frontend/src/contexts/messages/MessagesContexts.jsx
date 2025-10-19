// Contexto para manejar los mensajes

import { createContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContexts";
import { useUsersMessage } from "@/hooks/messages/useUsersMessage";
import { useScrollBottom } from "@/utils/useScrollBottom";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const userParams = useParams(); // usuario del path, es decir, el usuario al que se le va a enviar el mensaje
  const { userData: currentUserData } = useUser(); // usuario autenticado, que enviara el mensaje
  const {
    fetchUserToChatData,
    userToChatData,
    loading: loadingUserToChat,
    fetchMessages,
    messagesData,
    setMessagesData,
  } = useUsersMessage(); // usuario al que se le va a enviar el mensaje

  const { containerRef, scrollToBottom } = useScrollBottom();

  //   console.log(userParams.userName);
  //   console.log(currentUserData?.username);

  // Primer useEffect: obtener datos del usuario
  useEffect(() => {
    if (userParams.userName) {
      fetchUserToChatData(userParams.userName);
    }
  }, [userParams.userName]);

  // Segundo useEffect: obtener mensajes cuando ya tenemos el userId
  useEffect(() => {
    const userId = userToChatData?.data?._id;

    if (userId) {
      fetchMessages(userId);
    }
  }, [userToChatData?.data?._id]);

  //   console.log(userToChatData);
  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  return (
    <MessagesContext.Provider
      value={{
        userToChatData,
        currentUserData,
        loadingUserToChat,
        messagesData,
        setMessagesData,
        containerRef,
        scrollToBottom,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
