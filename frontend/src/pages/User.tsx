import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

import { Loader, Title, Button,Text } from "@mantine/core";
import LogoutBtn from "../components/logout.btn";

interface IdecodedToken {
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  user: string;
  roles: string;
  id: number;
}

interface IuseJwt {
  decodedToken: IdecodedToken;
  isExpired: boolean;
}

export default function User() {
  const [loading, setLoading] = useState(true);
  const [decodedToken, setDecoded] = useState({
    iss: "",
    aud: "",
    iat: 0,
    exp: 0,
    user: "",
    roles: "",
    id: 0,
  });
  const _decodeToken = (token: string): IdecodedToken => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      // decode the token 
      const decodedToken = _decodeToken(sessionToken);
      setDecoded(decodedToken);
      if(decodedToken.exp < Date.now() / 1000) {
        // token expired
        sessionStorage.removeItem("token");
        window.location.href = "/auth/login";
      }

    }
    setLoading(false);
  },[]);

  const UserInfo = (): JSX.Element => {
    // Je sais y a les erreurs de decodedToken '' does not exist on type 'IuseJwt'
    return (
      <div>
        <LogoutBtn />
        <Title>User Info</Title>
        <Text>Username: {decodedToken.user}</Text>
        <Text>Roles: {decodedToken.roles}</Text>
        <Text>Id: {decodedToken.id}</Text>
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
