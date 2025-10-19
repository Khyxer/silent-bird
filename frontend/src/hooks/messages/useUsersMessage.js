import { useState } from "react";

export const useUsersMessage = () => {
  const [loading, setLoading] = useState(true);
  const [userToChatData, setUserToChatData] = useState(null);
  const [messagesData, setMessagesData] = useState([]);

  const fetchUserToChatData = async (userName) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/profile?userName=${userName}`
      );
      const data = await response.json();
      setUserToChatData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //conseguir los mensajes de un chat
  const fetchMessages = async (receiverUserId) => {
    console.log(receiverUserId);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/messages?receiverUserId=${receiverUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMessagesData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    userToChatData,
    fetchUserToChatData,
    fetchMessages,
    messagesData,

    //borrar si sale mal
    setMessagesData,
  };
};
