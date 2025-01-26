import { useToast } from "@dropbox/ui/hooks/use-toast";
import React from "react";
import { Link2 } from "lucide-react";

export const useCopyToClipboard = () => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const CopyButton = ({ text }: { text: string }) => {
    const handleCopyClick = () => {
      copyToClipboard(text);
    };

    return (
      <div className="flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 transition-colors group">
        <Link2
          className="text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-all"
          size={16}
          onClick={handleCopyClick}
        />
      </div>
    );
  };

  return { copyToClipboard, CopyButton };
};
