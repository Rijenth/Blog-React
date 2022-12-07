// this button will destroy the session and redirect to the login page

import { Button } from "@mantine/core";
import { createStyles } from "@mantine/core";
export default function LogoutBtn() {
  const { classes } = useStyles();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <Button className={classes.logoutBtn} onClick={handleLogout} color="red">
      Logout
    </Button>
  );
}

const useStyles = createStyles({
  logoutBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
});
