import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { acceptApplication, getApplicationById, rejectApplication } from "../../../../api/applicationsApi";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import ApplicationReadOnly from "../../../DisplayComponents/ApplicationReadOnly";
import AreaManagerApplicationControls from "./AreaManagerApplicationControls";
import { confirmAlert } from "react-confirm-alert";
import ApplicationSummary from "../../../DisplayComponents/ApplicationSummary";
import InvestmentSummary from "../../../DisplayComponents/InvestmentSummary";


const AreaManagerApplicationViewPage = ({ applicationId }) => {
    const [application, setApplication] = useState(null);
    const [rejectionMessage, setRejectionMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!application) {
            getApplication();
        }
    }, [applicationId, application])

    function getApplication() {
        getApplicationById(applicationId).then(applicationData => {
            setApplication(applicationData);
        }).catch(error => {
            toast.error("Error getting retail location " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleAccept() {
        confirmAlert({
            title: "Confirm acceptence",
            message: `Are you sure you want to accept this application?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        accept();
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function accept() {
        acceptApplication(application).then(res => {
            toast.success("Appliation accepted");
            getApplication();
        }).catch(error => {
            toast.error("Error accepting application " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleReject(event) {
        event.preventDefault();
        if (!messageIsValid()) return;
        setSaving(true);

        confirmAlert({
            title: "Confirm rejection",
            message: `Are you sure you want to reject this application?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        reject();
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function reject() {
        rejectApplication(application, { message: rejectionMessage }).then(res => {
            toast.success("Application rejected");
            getApplication();
        }).catch(error => {
            toast.error("Error rejecting application " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleRejectionMessageChange(event) {
        const { value } = event.target;
        setRejectionMessage(value);
    }

    function messageIsValid() {
        const errors = {};
        if (!rejectionMessage) errors.message = "Message is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    return (
        <div className="pb-8">
            {application ? (
                <>
                    {application.status == "0" &&
                        <ApplicationSummary application={application} />
                    }
                    {application.status == "1" &&
                        <>
                            <ApplicationReadOnly application={application} />
                            <AreaManagerApplicationControls application={application} onAccept={handleAccept} onReject={handleReject} rejectionMessage={rejectionMessage} onChange={handleRejectionMessageChange} errors={errors} saving={saving} />
                        </>
                    }
                    {(application.status == "2" || application.status == "3") &&
                        <>
                            <ApplicationReadOnly application={application} />
                            <ApplicationSummary application={application} />
                        </>
                    }
                </>
            ) : (
                <LoadingMessage message={"Loading Application"} />
            )}
        </div>
    )
};

AreaManagerApplicationViewPage.propTypes = {
    applicationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        applicationId: ownProps.match.params.applicationId,
    };
};


export default connect(mapStateToProps)(AreaManagerApplicationViewPage);
