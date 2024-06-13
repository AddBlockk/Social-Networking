import React, { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";

// данные контекст чата
export interface ChatContextData {
  chatId: string;
  user: {
    uid: string;
  };
}

// контекст часа с значениями data и dispatch
export const ChatContext = createContext<{
  data: ChatContextData;
  dispatch: React.Dispatch<any>;
}>({} as any);

// интерфейс для действий в редукторе чата
interface ChatAction {
  type: string;
  payload: {
    uid: string;
  };
}

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // текущий пользователь
  const { currentUser } = useContext(AuthContext);

  // начальное состояние чата
  const INITIAL_STATE = {
    chatId: "null",
    user: {
      uid: "",
    },
  };

  // редуктор чата для обработки различных действий
  const chatReducer = (state: ChatContextData, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        // если текущий пользователь существует, обновляем состояние чата
        if (currentUser && currentUser.uid) {
          return {
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
        } else {
          return state;
        }

      default:
        return state;
    }
  };

  // состояние чата и функцию dispatch с помощью useReducer
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
