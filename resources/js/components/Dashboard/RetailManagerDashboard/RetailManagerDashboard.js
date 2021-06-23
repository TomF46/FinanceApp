import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRetailManagerById } from "../../../api/usersApi";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import RetailLocationsList from "../../DisplayComponents/RetailLocationsList";
import { toast } from "react-toastify";
import ApplicationsList from "../../DisplayComponents/ApplicationList";

const RetailManagerDashboard = ({ user }) => {
    const [retailManager, setRetailManager] = useState(null);
    useEffect(() => {
        if (!retailManager) {
            getRetailManager()
        }
    }, [user, retailManager])

    function getRetailManager() {
        getRetailManagerById(user.id).then(retailManagerData => {
            setRetailManager(retailManagerData);
        }).catch(error => {
            toast.error("Error getting retail manager data " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="Retail-manager-dashboard">
            <p className="text-center">Retail Manager Dashboard</p>
            {!retailManager ? (
                <LoadingMessage message={"Loading dashboard"} />
            ) : (
                <>
                    <div className="my-4">
                        <p>My Locations Managed</p>
                        <RetailLocationsList retailLocations={retailManager.retailLocationsManaged} />
                    </div>

                    <div className="my-4">
                        <p>My Applications</p>
                        <ApplicationsList applications={retailManager.applications} />
                    </div>
                </>
            )}
        </div>
    );
};

RetailManagerDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default RetailManagerDashboard;
