import React from "react";
import MessageToYou from "./MessageToYou";
import MessageFromYou from "./MessageFromYou";

function ContainerDialog() {
  return (
    <div className="h-full px-[40px] xl:px-[80px] w-full mt-[30px]">
      <div className="mb-[10px]">
        <MessageToYou />
      </div>
      <div className="flex justify-end mb-[10px]">
        <MessageFromYou />
      </div>
      <div className="mb-[10px]">
        <MessageToYou />
      </div>
      <div className="flex justify-end mb-[10px]">
        <MessageFromYou />
      </div>{" "}
      <div className="mb-[10px]">
        <MessageToYou />
      </div>
      <div className="flex justify-end mb-[10px]">
        <MessageFromYou />
      </div>{" "}
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
