import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      console.log("User is logged in");
    }
  });
  return (
    <div>
      <h1>Home Page</h1>
      {}
    </div>
  );
}
