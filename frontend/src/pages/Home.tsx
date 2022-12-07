import { useEffect } from "react";
import LogoutBtn from "../components/logout.btn";

import { Button } from "@mantine/core";

export default function Home() {
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      console.log("User is logged in");
    }
  });
  return (
    <div>
      <LogoutBtn />
      <h1>Home Page</h1>
      <Button
        onClick={() => {
          window.location.href = "/user";
        }}
      >
        User Page
      </Button>

      {}
    </div>
  );
}
