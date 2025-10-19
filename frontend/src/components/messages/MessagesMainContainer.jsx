import { HeroUserMessage } from "./HeroUserMessage";
import { NewMessage } from "./NewMessage";
import { useMessagesContext } from "@/contexts/messages/useMessagesContexts";
import { UserDataMessageLoader } from "@/components/loaders/skeleton/UserDataMessageLoader";
import { BubbleChat } from "./bubbleChat";

export const MessagesMainContainer = () => {
  const {
    userToChatData,
    currentUserData,
    loadingUserToChat,
    messagesData,
    containerRef,
  } = useMessagesContext();

  if (userToChatData?.data?.username === currentUserData?.username) {
    return (
      <div className="text-center h-full flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          No puedes enviarte un mensaje a ti mismo
        </h2>
      </div>
    );
  }

  return (
    <main className="h-full w-full flex flex-col">
      <header className="p-3 flex-shrink-0">
        {loadingUserToChat ? (
          <UserDataMessageLoader />
        ) : (
          <HeroUserMessage userToChatData={userToChatData} />
        )}
      </header>

      <section
        className="p-3 space-y-4 flex-1 min-h-0 overflow-y-auto custom-hide-scroll"
        ref={containerRef}
      >
        {messagesData?.messages?.map((message) => (
          <BubbleChat
            key={message._id}
            sender={message.senderUserId === currentUserData?._id}
            message={message}
          />
        ))}
      </section>
      <footer className="p-3 flex-shrink-0">
        <NewMessage />
      </footer>
    </main>
  );
};
