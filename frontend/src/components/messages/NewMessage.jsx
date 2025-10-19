import { Send } from "lucide-react";
import { useNewMessage } from "@/hooks/messages/useNewMessage";
import { useMessagesContext } from "@/contexts/messages/useMessagesContexts";

export const NewMessage = () => {
  const { textAreaRef, updateTextAreaHeight, sendMessage } = useNewMessage();
  const { userToChatData, scrollToBottom } = useMessagesContext();

  // console.log(userToChatData?.data?._id);

  return (
    <div className="overflow-hidden flex justify-between items-end border border-gray-color/50 rounded-xl">
      <textarea
        className="p-4 w-full resize-none outline-none custom-scroll"
        placeholder="Escribe un mensaje"
        rows={1}
        ref={textAreaRef}
        maxLength={350}
        onChange={updateTextAreaHeight}
      />
      <footer className="flex items-center justify-end p-2 pt-0">
        <button
          className="bg-primary-color text-light-color p-2 rounded-lg hover:bg-gray-color/10 duration-100 cursor-pointer"
          onClick={() => {
            sendMessage(userToChatData?.data?._id);
            scrollToBottom();
          }}
        >
          <Send size={18} />
        </button>
      </footer>
    </div>
  );
};
