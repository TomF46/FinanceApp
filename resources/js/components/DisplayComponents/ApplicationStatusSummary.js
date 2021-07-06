import React from "react";
import PropTypes from "prop-types";
import RejectionMessage from "./RejectionMessage";


const ApplicationStatusSummary = ({
    application,
}) => {

    function getSummaryText() {
        if (application.status == 1) return "The application has been submitted to the area manager for sign off."
        if (application.status == 3) return "The application has been accepted by the area manager and is now complete."
    }

    return (
        <div className="application-status summary mb-4 border-t-2 border-primary">
            <div className="my-4">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Application Status Summary</p>
                    </div>
                    <div className="p-4">
                        <p className="font-bold">Status: {application.statusText}</p>
                        {application.status == 2 ? (
                            <RejectionMessage application={application} />
                        ) : (
                            <p>{getSummaryText()}</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

ApplicationStatusSummary.propTypes = {
    application: PropTypes.object.isRequired
};

export default ApplicationStatusSummary;
