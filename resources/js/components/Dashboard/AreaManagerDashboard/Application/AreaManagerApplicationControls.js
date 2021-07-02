import React, { useState } from "react";
import PropTypes from "prop-types";
import TextAreaInput from "../../../FormComponents/TextAreaInput";

const AreaManagerApplicationControls = ({
    application,
    onAccept,
    rejectionMessage,
    onReject,
    onChange,
    saving = false,
    errors = {}
}) => {
    const [showRejectControls, setRejectControls] = useState(false);
    return (
        <div className="application-admin-controls">
            <div className="my-4">
                <button onClick={onAccept} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Accept</button>
                <button onClick={() => { setRejectControls(true) }} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Reject</button>
            </div>

            {showRejectControls && (
                <div className="my-4">
                    <form className="" onSubmit={onReject}>
                        <h2 className="font-bold text-lg mb-4 text-center">Rejection message</h2>
                        {errors.onSave && (
                            <div className="text-red-500 text-xs p-1" role="alert">
                                {errors.onSave}
                            </div>
                        )}

                        <div className="mb-6">
                            <TextAreaInput
                                name="message"
                                label="Message"
                                value={rejectionMessage}
                                onChange={onChange}
                                error={errors.message}
                                placeholder={"Let the retailer know why you have rejected the application and what they need to do to get it accepted"}
                                required={true}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600"
                            >
                                {saving ? "Rejecting..." : "Reject"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

AreaManagerApplicationControls.propTypes = {
    application: PropTypes.object.isRequired,
    onReject: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    rejectionMessage: PropTypes.string,
    errors: PropTypes.object,
    onReject: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default AreaManagerApplicationControls;
