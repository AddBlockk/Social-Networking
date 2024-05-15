import { Avatar } from "@mui/material";
import React from "react";

function AllChats() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-5 relative mt-[20px]">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p className="text-white truncate text-ellipsis">Remy Say</p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 relative mt-[20px]">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p className="text-white truncate text-ellipsis">Remy Say</p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>
    </div>
  );
}

export default AllChats;
