import React from "react";
import PropTypes from "prop-types";
import TextInput from "../FormComponents/TextInput";
import EmailInput from "../FormComponents/EmailInput";
import PasswordInput from "../FormComponents/PasswordInput";
import { Link } from "react-router-dom";

const RegisterForm = ({
    user,
    headerText,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <div className="centerFormCardContainer mt-24">
            <div className="centerFormCard max-w-md rounded overflow-hidden card">
                <form className="" onSubmit={onSave}>
                    <div>
                        <div className="card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{headerText}</p>
                            </div>
                            <div className="p-2">
                                {errors.onSave && (
                                    <div className="text-red-500 text-xs p-1" role="alert">
                                        {errors.onSave}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <TextInput
                                        name="firstName"
                                        label="First Name"
                                        value={user.firstName}
                                        onChange={onChange}
                                        error={errors.firstName}
                                    />
                                </div>
                                <div className="mb-6">
                                    <TextInput
                                        name="lastName"
                                        label="Last Name"
                                        value={user.lastName}
                                        onChange={onChange}
                                        error={errors.lastName}
                                    />
                                </div>
                                <div className="mb-6">
                                    <EmailInput
                                        name="email"
                                        label="Email"
                                        value={user.email}
                                        onChange={onChange}
                                        error={errors.email}
                                    />
                                </div>
                                <div className="mb-6">
                                    <PasswordInput
                                        name="password"
                                        label="Password"
                                        value={user.password}
                                        onChange={onChange}
                                        error={errors.password}
                                    />
                                </div>
                                <div className="mb-6">
                                    <PasswordInput
                                        name="password_confirmation"
                                        label="Password confirmation"
                                        value={user.password_confirmation}
                                        onChange={onChange}
                                        error={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
                                    >
                                        <svg className="text-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{saving ? "Registering..." : "Register"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

RegisterForm.propTypes = {
    headerText: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default RegisterForm;
