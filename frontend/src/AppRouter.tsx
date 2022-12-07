// This app will be connected to  php backend, we will need to
// check if the user is logged in or not, if not, redirect to login page
// JWT token will be used and stored in local storage

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { MantineProvider } from "@mantine/core";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function AppRouter() {
  // Here we will redirect the user if a session is active
  // else we will have to redirect to login/register page and block access to other pages
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    /* const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setIsLogged(true);
    } else {
      // Redirect to login page
      setIsLogged(false);
    } */
    // for now we will manually create a session
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setIsLogged(true);
    } else {
      sessionStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyeUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNldHN1ZGFuIiwiZmlyc3ROYW1lIjoibnRtIiwibGFzdE5hbWUiOiJzZXgiLCJnZW5kZXIiOiJ1bmRlZmluZWQiLCJyb2xlIjoidXNlciJ9.zBtV7ufhCElTk7sWI3lJLsxsCRwfAGb2Y7_rK4vAs3Q"
      );
      setIsLogged(true);
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
            <Route path="/" element={<Home />} />
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
