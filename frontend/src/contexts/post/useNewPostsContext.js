import { useContext } from "react";
import NewPostContext from "@/contexts/post/NewPostContexts";

export const useNewPostContext = () => {
  const context = useContext(NewPostContext);
  if (!context) {
    throw new Error("useNewPostContext debe usarse dentro de NewPostProvider");
  }
  return context;
};
