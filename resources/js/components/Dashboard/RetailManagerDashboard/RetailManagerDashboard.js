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
            <p className="text-center">This is your dashboard, you can manage your retail locations and any current open applications</p>
            {!retailManager ? (
                <LoadingMessage message={"Loading dashboard"} />
            ) : (
                <>
                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">My Locations Managed</p>
                            </div>
                            <div>
                                <RetailLocationsList retailLocations={retailManager.retailLocationsManaged} isAdmin={false} />
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">My Open Applications</p>
                            </div>
                            <div>
                                <ApplicationsList applications={retailManager.applications} />
                            </div>
                        </div>
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
