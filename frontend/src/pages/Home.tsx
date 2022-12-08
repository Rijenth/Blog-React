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

      <Button
        onClick={() => {
          fetch("http://localhost:5656/api/getPosts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //Authorization: `Bearer ${sessionToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }}
      >
        Get Posts
      </Button>

      {}
    </div>
  );
}
