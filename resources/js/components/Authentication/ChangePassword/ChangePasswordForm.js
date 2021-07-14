import React from "react";
import PropTypes from "prop-types";
import PasswordInput from "../../FormComponents/PasswordInput";

const ChangePasswordForm = ({
    user,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <div className="centerFormCardContainer mt-24">
            <div className="centerFormCard max-w-md rounded shadow-md overflow-hidden card">
                <form className="" onSubmit={onSave}>
                    <div>
                        <div className="card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Change password</p>
                            </div>
                            <div className="p-2">
                                {errors.onSave && (
                                    <div className="text-red-500 text-xs p-1" role="alert">
                                        {errors.onSave}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <PasswordInput
                                        name="currentPassword"
                                        label="Current password"
                                        value={user.currentPassword}
                                        onChange={onChange}
                                        error={errors.currentPassword}
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>{saving ? "Changing..." : "Change"}</span>
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

ChangePasswordForm.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default ChangePasswordForm;
