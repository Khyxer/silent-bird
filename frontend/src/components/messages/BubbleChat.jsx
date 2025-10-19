import { formatTimestamp } from "@/utils/formatsFunctions";
export const BubbleChat = ({ sender, message }) => {
    const time = formatTimestamp(message.createdAt);
  return (
    <div
      className={` max-w-lg w-fit flex ${
        sender ? "ml-auto" : "mr-auto flex-row-reverse"
      }`}
    >
      <div className={`border rounded-2xl py-2 px-3 flex gap-2 flex-wrap items-center justify-end ${sender ? "border-gray-color" : "border-gray-color/50 bg-gray-color/10"}`}>
        <p>{message.content}</p>
        <p className="text-xs text-gray-color text-end">
          {time}
        </p>
      </div>
    </div>
  );
};
