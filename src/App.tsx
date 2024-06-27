import React, { FC, useContext, PropsWithChildren } from "react";

import "./ThemeStyles.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeProvider";

function App() {
  type ProtectedRouteProps = PropsWithChildren<{}>;

  const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ThemeContext.Consumer>
                {({ isNightMode }) => <Login isNightMode={isNightMode} />}
              </ThemeContext.Consumer>
            }
          />
          <Route
            path="register"
            element={
              <ThemeContext.Consumer>
                {({ isNightMode }) => <Register isNightMode={isNightMode} />}
              </ThemeContext.Consumer>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
