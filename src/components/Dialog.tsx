import React from "react";
import EditableMessage from "./EditableMessage";
import ContainerDialog from "./ContainerDialog";

function Dialog() {
  return (
    <div className="h-screen flex justify-center relative w-[70%]">
      <ContainerDialog />
      <EditableMessage />
    </div>
  );
}

export default Dialog;
