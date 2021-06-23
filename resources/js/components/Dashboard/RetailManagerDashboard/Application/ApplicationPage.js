import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getApplicationById } from "../../../../api/applicationsApi";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";


const ApplicationPage = ({ applicationId }) => {
    const [application, setApplication] = useState(null);

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

    return (
        <>
            {!application ? (
                <LoadingMessage message={"Loading Application"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-6xl">
                        {application.year.year} Application for {application.retailLocationName}
                    </h1>
                    <p className="text-center">Status: {application.status}</p>
                </>
            )}
        </>
    )
};

ApplicationPage.propTypes = {
    applicationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        applicationId: ownProps.match.params.applicationId,
    };
};


export default connect(mapStateToProps)(ApplicationPage);
