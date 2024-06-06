import React, { FC, useContext, PropsWithChildren } from "react";

import "./ThemeStyles.scss";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  // type ProtectedRouteProps = PropsWithChildren<{}>;

  // const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  //   const { currentUser } = useContext(AuthContext);

  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return <>{children}</>;
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
