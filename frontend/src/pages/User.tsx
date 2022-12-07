import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

import { Loader, Title, Button } from "@mantine/core";
import LogoutBtn from "../components/logout.btn";

interface IdecodedToken {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
}

interface IuseJwt {
  decodedToken: IdecodedToken;
  isExpired: boolean;
}

export default function User() {
  const [loading, setLoading] = useState(true);

  const { decodedToken, isExpired } = useJwt<IuseJwt>(
    sessionStorage.getItem("token") as string
  );

  useEffect(() => {
    console.log(decodedToken);
    console.log(isExpired);
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      console.log("User is logged in");
    }
    setLoading(false);
  });

  const UserInfo = (): JSX.Element => {
    // Je sais y a les erreurs de decodedToken '' does not exist on type 'IuseJwt'
    return (
      <div>
        <LogoutBtn />
        <Title>User Info</Title>
        <p>Username: {decodedToken?.username}</p>
        <p>First Name: {decodedToken?.firstName}</p>
        <p>Last Name: {decodedToken?.lastName}</p>
        <p>Gender: {decodedToken?.gender}</p>
        <p>Role: {decodedToken?.role}</p>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home Page
        </Button>
      </div>
    );
  };

  return <div id="userpage">{loading ? <Loader /> : <UserInfo />}</div>;
}
