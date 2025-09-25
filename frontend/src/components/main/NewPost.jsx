import React, { useState, useRef, useEffect } from "react";
import { Image, Send, AtSign, Hash } from "lucide-react";

export const NewPost = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const minHeight = 60;
  const maxHeight = 200;

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
  };

  return (
    <div className="border rounded-xl border-gray-color/50 w-full overflow-hidden">
      <textarea
        ref={textareaRef}
        onChange={handleTextChange}
        className="p-4 w-full resize-none outline-none border-none custom-scroll pb-8"
        placeholder="¿Qué estás pensando?"
        style={{
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
          overflowY: "hidden",
        }}
      />
      <div className="p-3 pt-0 flex justify-between items-center">
        <div className="flex">
          <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
            <Image size={20} />
          </button>
          <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
            <AtSign size={20} />
          </button>
          <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
            <Hash size={20} />
          </button>
        </div>
        <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
