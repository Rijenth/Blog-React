import { useState } from "react";
import {
  Select,
  Button,
  PasswordInput,
  Autocomplete,
  TextInput,
} from "@mantine/core";
import { createStyles } from "@mantine/core";

export default function Auth({ type }: { type: string }): JSX.Element {
  const { classes } = useStyles();

  // regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const RegisterForm: React.FC = () => {
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

      const response = await fetch("http://localhost:5656/api/register", {
        method: "POST",
        body: registerData,
      }).then((response) => {
        if (response.ok) {
          window.location.href = "/login";
        }
      });
    };
    return (
      <div className="form_register">
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

        <hr />
        <Button
          onClick={() => (window.location.href = "/login")}
          color="primary"
        >
          Se connecter
        </Button>
      </div>
    );
  };

  const LoginForm: React.FC = () => {
    const [loginValues, setLoginValues] = useState({
      email: "",
      password: "",
    });

    const handleSubmit = async () => {
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
      <form className="form_login" onSubmit={handleSubmit}>
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
        <hr />
        <a className="form_action" href="/">
          S'inscrire
        </a>
      </form>
    );
  };

  return (
    <div className={classes.authPage}>
      <div className={classes.form_wrapper}>
        {type === "login" ? <LoginForm /> : <RegisterForm />}
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
});
