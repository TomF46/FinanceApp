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
                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">My Areas Managed</p>
                            </div>
                            <div>
                                <AreasList areas={areaManager.areasManaged} isAdmin={false} />
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">My Open Applications</p>
                            </div>
                            <div>
                                <AreaApplicationsList applications={areaManager.applications} />
                            </div>
                        </div>
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
