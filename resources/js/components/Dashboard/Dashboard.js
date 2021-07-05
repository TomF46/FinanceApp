import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../../api/authenticationApi";
import { toast } from "react-toastify";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import HeadOfficeDashboard from "./HeadOfficeDashboard/HeadOfficeDashboard";
import AreaManagerDashboard from "./AreaManagerDashboard/AreaManagerDashboard";
import RetailManagerDashboard from "./RetailManagerDashboard/RetailManagerDashboard";


const DashboardPage = ({ history }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            getCurrentUser().then(userData => {
                setUser(userData);
            }).catch(error => {
                toast.error("Error getting user " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [user])

    return (
        <div className="dashboard-page">
            {user && (
                <>
                    <h1 className="text-center font-bold mb-4 text-4xl"> Welcome {user.firstName}</h1>
                    {user.role == "0" && <AdminDashboard user={user} />}
                    {user.role == "1" && <HeadOfficeDashboard user={user} />}
                    {user.role == "2" && <AreaManagerDashboard user={user} />}
                    {user.role == "3" && <RetailManagerDashboard user={user} />}
                    {user.role == "4" && <p className="text-center">Unassigned user, please contact your manager to escelate</p>}
                </>
            )}
        </div>
    );
};

DashboardPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default DashboardPage;
