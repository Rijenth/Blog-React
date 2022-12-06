// This app will be connected to  php backend, we will need to
// check if the user is logged in or not, if not, redirect to login page
// JWT token will be used and stored in local storage

import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { MantineProvider } from '@mantine/core';

export default function Index() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    // redirect to login page
    window.location.href = "/login";
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}