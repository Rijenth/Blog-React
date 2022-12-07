// This app will be connected to  php backend, we will need to
// check if the user is logged in or not, if not, redirect to login page
// JWT token will be used and stored in local storage

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { MantineProvider } from "@mantine/core";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import User from "./pages/User";

export default function AppRouter() {
  // Here we will redirect the user if a session is active
  // else we will have to redirect to login/register page and block access to other pages
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setIsLogged(true);
    } else {
      // Redirect to login page
      setIsLogged(false);
    }
  });

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Router>
        <Routes>
          {isLogged ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="/auth/:type" element={<Auth />} />
            </>
          )}
        </Routes>
      </Router>
    </MantineProvider>
  );
}
