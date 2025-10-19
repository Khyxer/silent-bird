import { useContext } from "react";
import MessagesContext from "@/contexts/messages/MessagesContexts";

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessagesContext debe usarse dentro de MessagesProvider");
  }
  return context;
};
