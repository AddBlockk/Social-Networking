import { Avatar } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "../ThemeStyles.scss";

function AllChats() {
  const { theme } = useContext<ThemeContext>(ThemeContext);
  return (
    <div>
      <div className="flex items-center gap-5 relative max-w-[85%]">
        <Avatar
          alt="Remy Sharpfdjksfkjdsfjksdfjkdfjkdfdjkfdsjkfdsjkfdsjkfdsjkfdsjkfdskfsdkjf"
          src="/static/images/avatar/1.jpg"
        />
        <div className="w-full">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy
            Sharpfdjksfkjdsfjksdfjkdfjkdfdjkfdsjkfdsjkfdsjkfdsjkfdsjkfdskfsdkjf
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
          <p className="text-[#aaaaaa] truncate text-ellipsis">
            Сообщение в
            чатеfsdlkfdskfdlfsfkldkfdsfldsfsdklfdslkffffdksfdksfskdfkdsfkds
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-5 relative ">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className="w-full max-w-[85%]">
          <p
            className={`text-white truncate text-ellipsis ${
              theme.themeType === "light" ? "textLight" : "textDark"
            }`}>
            Remy Say
          </p>
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
