import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingMessage from "./LoadingMessage";
import { getRejectionMessage } from "../../api/applicationsApi";
import { toast } from "react-toastify";


const RejectionMessage = ({
    application,
}) => {
    const [rejectionMessage, setRejectionMessage] = useState(null);

    useEffect(() => {
        if (!rejectionMessage) {
            getMessage();
        }
    }, [rejectionMessage])

    function getMessage() {
        getRejectionMessage(application).then(message => {
            setRejectionMessage(message);
        }).catch(error => {
            toast.error("Error getting rejection message" + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            {rejectionMessage ? (
                <div>
                    <h4 className="font-bold text-lg">Rejected</h4>
                    <p>By: {rejectionMessage.by}</p>
                    <p>Message: {rejectionMessage.message}</p>
                </div>
            ) : (
                <LoadingMessage message={"Loading Application"} />
            )}
        </>
    );
};

RejectionMessage.propTypes = {
    application: PropTypes.object.isRequired
};

export default RejectionMessage;
