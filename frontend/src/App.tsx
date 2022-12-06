// This app will be connected to  php backend, we will need to
// check if the user is logged in or not, if not, redirect to login page
// JWT token will be used and stored in local storage

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { MantineProvider } from "@mantine/core";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      {!localStorage.getItem("token") ? (
        <Router>
          <Routes>
            <Route path="/login" element={<Auth type="login" />} />
            <Route path="/" element={<Auth type="register" />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth type="login" />} />
            <Route path="/register" element={<Auth type="register" />} />
          </Routes>
        </Router>
      )}
    </MantineProvider>
  );
}
