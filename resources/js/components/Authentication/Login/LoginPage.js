import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { login } from "../../../redux/actions/authenticationActions";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userIsAuthenticated = useSelector((state) => state.tokens != null);
    const [user, setUser] = useState({
        email: "",
        password: "",
        remember_me: true
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value, checked } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: name == "remember_me" ? Boolean(checked) : value
        }));
    }

    function formIsValid() {
        const { email, password } = user;
        const errors = {};
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        dispatch(login(user))
            .then(() => {
                history.push("/");
            })
            .catch(err => {
                setSaving(false);
                toast.error(`${err.data.message}, please try again.`, {
                    autoClose: false,
                });
            });
    }

    return (
        <>
            {userIsAuthenticated && <Redirect to="/" />}
            <LoginForm
                user={user}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                saving={saving}
            />
        </>
    );
};

export default LoginPage;
