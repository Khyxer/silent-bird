import { Loader2 } from "lucide-react";

export const SimpleLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 size={40} className="animate-spin text-gray-color" />
    </div>
  );
};
