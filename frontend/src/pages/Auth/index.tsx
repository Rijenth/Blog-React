// Login

// TODO: Add login form

// Register

// TODO Add register form

import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Input, Select, Button } from "@mantine/core";

export default function Auth() {

    const [formType, setFormType] = useState("login");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // redirect to home page
            window.location.href = "/";
        }
    }, []);

        const _registerForm = () => {
            const form = useForm({
                initialValues: {
                    email: "",
                    username: "",
                    firstName: "",
                    lastName: "",
                    gender: "",
                    password: "",
                    confirm: "",
                    role: "",
                },
                validate: {
                    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
                    username: (value) => (value.length > 3 ? null : 'Username must be at least 4 characters long'),
                    // password should be 8 characters long with at least one uppercase letter, one lowercase letter, one number and one special character
                    password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : 'Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, one number and one special character'),
                    confirm: (value, { password }) => (value === password ? null : 'Passwords do not match'),
                  },
            });
            return (
            <form onSubmit={form.onSubmit} className="form_register">
                <h1>Inscription : </h1>
                <Input
                    label="Email"
                    name="email"
                    value={form.values.email}
                    onChange={form.setFieldValue}
                    error={form.errors.email}
                    required
                />
                <Input
                    label="Username"
                    name="username"
                    value={form.values.username}
                    onChange={form.setFieldValue}
                    error={form.errors.username}
                    required
                />
                <Input
                    label="First Name"
                    name="firstName"
                    value={form.values.firstName}
                    onChange={form.setFieldValue}
                    error={form.errors.firstName}
                    required
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={form.values.lastName}
                    onChange={form.setFieldValue}
                    error={form.errors.lastName}
                    required
                />
                <Select
                    label="Gender"
                    name="gender"
                    value={form.values.gender}
                    onChange={form.setFieldValue}
                    required
                >
                    <option value="">-- </option>
                    <option value="male">Male </option>
                    <option value="female">Female </option>
                </Select>

                <Input
                    label="Password"
                    name="password"
                    value={form.values.password}
                    onChange={form.setFieldValue}
                    error={form.errors.password}
                    required
                />
                <Input
                    label="Confirm password"
                    name="confirm"
                    value={form.values.confirm}
                    onChange={form.setFieldValue}
                    error={form.errors.confirm}
                    required
                />
                <Select
                    label="Role"
                    name="role"
                    value={form.values.role}
                    onChange={form.setFieldValue}
                    required
                >
                    <option value="simple">Simple </option>
                    <option value="moderator">Moderator </option>
                    <option value="admin">Admin </option>
                </Select>
                <p className="form_error-msg"></p>
                <Button type="submit" className="form_submit-btn form_action">Envoyer</Button>
                <hr />
                <button onClick={() => setFormType("login")} className="form_action">Se connecter</button>
            </form>
        );}





                return (
                <div>
                    <h1>Auth Page</h1>
                </div>
                );
}