import React from "react";
import MessageToYou from "./MessageToYou";
import MessageFromYou from "./MessageFromYou";

function ContainerDialog() {
  return (
    <div className="h-[90%] bg-gray-200 py-[18px] w-full relative">
      <div className="mb-[10px]">
        <MessageToYou />
      </div>
      <div className="flex justify-end mb-[10px]">
        <MessageFromYou />
      </div>
    </div>
  );
}

export default ContainerDialog;
