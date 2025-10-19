import { useMessagesContext } from "@/contexts/messages/useMessagesContexts";
import { BubbleChat } from "./bubbleChat";
export const MessagesList = () => {
  const { messagesData, userToChatData } = useMessagesContext();
  // console.log(messagesData, "messagesData");
  return (
    <ul className="space-y-5">
      <BubbleChat sender={false} />
      <BubbleChat sender={true} />
    </ul>
  );
};
