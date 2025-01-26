import { Link, useNavigate } from "react-router";
import { CircleArrowOutUpRight } from "lucide-react";
import React from "react";
export const useNewTab = () => {
  const NewTabIcon = ({ fileId }: { fileId: string }) => {
    return (
      <Link className="text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-all" to={`file-viewer/${fileId}`} target="_blank">
      <div className="flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 transition-colors group">
        
        <CircleArrowOutUpRight
          className="text-gray-500 group-hover:text-blue-500 group-hover:scale-110 transition-all"
          size={10}
        />
       
      </div>
      </Link>
    );
  };
  return { NewTabIcon };
};
