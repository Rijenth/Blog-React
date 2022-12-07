import { useState } from "react";
import {
  Select,
  Button,
  PasswordInput,
  Autocomplete,
  TextInput,
  Divider,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useParams } from "react-router-dom";
// regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function RegisterForm(): JSX.Element {
  const { classes } = useStyles();

  // values
  const [registerValues, setRegisterValues] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    gender: "undefined",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const data =
    registerValues.email.trim().length > 0 &&
    !registerValues.email.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
          (provider) => `${registerValues.email}@${provider}`
        )
      : [];
  const handleSubmit = async () => {
    let registerData = new FormData();
    registerData.append("email", registerValues.email);
    registerData.append("username", registerValues.username);
    registerData.append("firstName", registerValues.firstName);
    registerData.append("lastName", registerValues.lastName);
    registerData.append("gender", registerValues.gender);
    registerData.append("password", registerValues.password);
    registerData.append("role", registerValues.role);
  };
  return (
    <div className={classes.form}>
      <h1>Inscription : </h1>
      <Autocomplete
        data={data}
        placeholder="Email"
        value={registerValues.email}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({ ...registerValues, email: event })
        }
        error={
          registerValues.email.trim().length > 0 &&
          !emailRegex.test(registerValues.email)
            ? "Email invalide"
            : undefined
        }
      />
      <TextInput
        placeholder="Nom d'utilisateur"
        value={registerValues.username}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            username: event.currentTarget.value,
          })
        }
        error={
          registerValues.username.trim().length > 0 &&
          !usernameRegex.test(registerValues.username)
            ? "Nom d'utilisateur invalide"
            : undefined
        }
      />
      <TextInput
        placeholder="Prénom"
        value={registerValues.firstName}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            firstName: event.currentTarget.value,
          })
        }
      />
      <TextInput
        placeholder="Nom"
        value={registerValues.lastName}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            lastName: event.currentTarget.value,
          })
        }
      />
      <Select
        placeholder="Genre"
        value={registerValues.gender}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            gender: event ?? "non renseigné",
          })
        }
        data={[
          { label: "Homme", value: "male" },
          { label: "Femme", value: "female" },
          { label: "Autre", value: "other" },
          { label: "Non renseigné", value: "undefined" },
        ]}
      />
      <PasswordInput
        placeholder="Mot de passe"
        value={registerValues.password}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            password: event.currentTarget.value,
          })
        }
        error={
          registerValues.password.trim().length > 0 &&
          !passwordRegex.test(registerValues.password)
            ? "Mot de passe invalide"
            : undefined
        }
      />
      <PasswordInput
        placeholder="Confirmer le mot de passe"
        value={registerValues.confirmPassword}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            confirmPassword: event.currentTarget.value,
          })
        }
        error={
          registerValues.password !== registerValues.confirmPassword
            ? "Les mots de passe ne correspondent pas"
            : undefined
        }
      />
      <Select
        placeholder="Rôle"
        value={registerValues.role}
        className={classes.input}
        onChange={(event) =>
          setRegisterValues({
            ...registerValues,
            role: event ?? "user",
          })
        }
        data={[
          { label: "Utilisateur", value: "user" },
          { label: "Administrateur", value: "admin" },
          { label: "Modérateur", value: "moderator" },
        ]}
      />
      <Button
        disabled={
          // Oui c'est moche mais ça marche
          registerValues.email.trim().length === 0 ||
          registerValues.username.trim().length === 0 ||
          registerValues.firstName.trim().length === 0 ||
          registerValues.lastName.trim().length === 0 ||
          registerValues.password.trim().length === 0 ||
          registerValues.confirmPassword.trim().length === 0 ||
          registerValues.password !== registerValues.confirmPassword ||
          !emailRegex.test(registerValues.email) ||
          !usernameRegex.test(registerValues.username) ||
          !passwordRegex.test(registerValues.password)
        }
        onClick={handleSubmit}
      >
        S'inscrire
      </Button>
      <Divider size="xl" />
      <Button
        onClick={() => (window.location.href = "/auth/login")}
        color="primary"
      >
        Se connecter
      </Button>
    </div>
  );
}

function LoginForm(): JSX.Element {
  const { classes } = useStyles();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (): Promise<void> => {
    let loginData = new FormData();
    loginData.append("email", loginValues.email);
    loginData.append("password", loginValues.password);

    const response = await fetch("http://localhost:5656/api/login", {
      method: "POST",
      body: loginData,
    }).then((response) => {
      if (response.ok) {
        window.location.href = "/";
      }
    });

    console.log(response);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1>Connexion : </h1>
      <TextInput
        placeholder="Email"
        value={loginValues.email}
        className={classes.input}
        onChange={(event) =>
          setLoginValues({ ...loginValues, email: event.currentTarget.value })
        }
      />
      <PasswordInput
        placeholder="Mot de passe"
        value={loginValues.password}
        className={classes.input}
        onChange={(event) =>
          setLoginValues({
            ...loginValues,
            password: event.currentTarget.value,
          })
        }
        error={
          loginValues.password.trim().length > 0 &&
          !passwordRegex.test(loginValues.password)
            ? "Mot de passe invalide"
            : undefined
        }
      />
      <Button type="submit">Se connecter</Button>
      <Divider size="xl" />
      <Button
        onClick={() => (window.location.href = "/auth/register")}
        color="primay"
        variant="subtle"
      >
        S'inscrire
      </Button>
    </form>
  );
}

// fake session
const fakeSessionToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyeUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNldHN1ZGFuIiwiZmlyc3ROYW1lIjoibnRtIiwibGFzdE5hbWUiOiJzZXgiLCJnZW5kZXIiOiJ1bmRlZmluZWQiLCJyb2xlIjoidXNlciJ9.zBtV7ufhCElTk7sWI3lJLsxsCRwfAGb2Y7_rK4vAs3Q";

export default function Auth(): JSX.Element {
  // use react-router-dom to get the type of the page
  const { type } = useParams<{ type: string }>();
  const { classes } = useStyles();

  const createFakeSession = (): void => {
    sessionStorage.setItem("token", fakeSessionToken);
    window.location.href = "/";
  };

  return (
    <div className={classes.authPage}>
      <div className={classes.form_wrapper}>
        {type === "login" ? <LoginForm /> : <RegisterForm />}
        <Button
          className={classes.devButton}
          onClick={createFakeSession}
          color="orange"
          variant="light"
        >
          Créer une session (dev)
        </Button>
      </div>
      <img
        className={classes.banner}
        src={`https://source.unsplash.com/random/1920x1080`}
        alt="random banner"
      />
    </div>
  );
}

// Styles

const useStyles = createStyles({
  authPage: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form_wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "100%",
    marginBottom: "1rem",
  },
  banner: {
    flex: 2,
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  devButton: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
  },
});
