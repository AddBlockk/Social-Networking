import React from "react";
import SideBar from "./components/SideBar";
import Dialog from "./components/Dialog";

function Main() {
  return (
    <div className="flex relative h-screen">
      <div className="w-[25%]">
        <SideBar />
      </div>
      <div className="absolute top-0 left-[25%] bottom-0 right-0">
        <img
          src="./chat-bg-pattern-dark.png"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-0 left-[25%] bottom-0 right-0 flex justify-center">
        <Dialog />
      </div>
    </div>
  );
}

export default Main;
