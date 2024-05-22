import React from "react";
import EditableMessage from "./EditableMessage";
import ContainerDialog from "./ContainerDialog";

function Dialog() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto dialog-messages">
        <ContainerDialog />
      </div>
      <EditableMessage />
    </div>
  );
}

export default Dialog;
