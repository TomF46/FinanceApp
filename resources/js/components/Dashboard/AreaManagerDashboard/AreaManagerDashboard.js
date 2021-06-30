import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAreaManagerById } from "../../../api/usersApi";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import { toast } from "react-toastify";
import AreaApplicationsList from "../../DisplayComponents/AreaApplicationList";
import AreasList from "../../DisplayComponents/AreasList";

const AreaManagerDashboard = ({ user }) => {
    const [areaManager, setAreaManager] = useState(null);
    useEffect(() => {
        if (!areaManager) {
            getAreaManager()
        }
    }, [user, areaManager])

    function getAreaManager() {
        getAreaManagerById(user.id).then(areaManagerData => {
            setAreaManager(areaManagerData);
        }).catch(error => {
            toast.error("Error getting area manager data " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="area-manager-dashboard">
            <p className="text-center">Area Manager Dashboard</p>
            {!areaManager ? (
                <LoadingMessage message={"Loading dashboard"} />
            ) : (
                <>
                    <div className="my-4">
                        <p>My Areas Managed</p>
                        <AreasList areas={areaManager.areasManaged} isAdmin={false} />
                    </div>

                    <div className="my-4">
                        <p>My Open Applications</p>
                        <AreaApplicationsList applications={areaManager.applications} />
                    </div>
                </>
            )}
        </div>
    );
};

AreaManagerDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default AreaManagerDashboard;
