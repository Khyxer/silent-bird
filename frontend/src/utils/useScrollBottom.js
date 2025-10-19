import { useRef } from "react";

export const useScrollBottom = () => {
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return { containerRef, scrollToBottom };
};
