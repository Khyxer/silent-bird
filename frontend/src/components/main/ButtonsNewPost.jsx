import React, { useState } from "react";
import { Image, AtSign, Hash, Loader2, Send } from "lucide-react";
import { LayoutModal } from "@/components/globals/LayoutModal";
import { AddIamgePost } from "./posts/AddIamgePost";

export const ButtonsNewPost = ({ textLength, loading, handleSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="p-3 pt-0 flex justify-between items-center">
      {/* modal */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <AddIamgePost />
      </LayoutModal>

      {/* botones de acciones */}
      <div className="flex items-center">
        <button
          className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150"
          onClick={() => setShowModal(true)}
        >
          <Image size={20} />
        </button>
        <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
          <AtSign size={20} />
        </button>
        <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
          <Hash size={20} />
        </button>

        {/* input */}
        {/* <div className="pl-5 flex items-center">
          <p className="text-gray-color/80 select-none mr-1">#</p>
          <input className="border rounded border-gray-color/50 px-2 text-sm outline-none " />
          <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
            <Check size={18} />
          </button>
          <button className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150">
            <X size={18} />
          </button>
        </div> */}
      </div>

      {/* contador de caracteres y boton enviar */}
      <div className="flex items-center">
        <span
          style={{ color: textLength > 2000 ? "red" : "" }}
          className="text-gray-color/80 text-xs mr-2"
        >
          {textLength}/2000
        </span>
        <button
          className="p-1 cursor-pointer text-gray-color/80 hover:text-light-color duration-150"
          onClick={handleSubmit}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </footer>
  );
};
