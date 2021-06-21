import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../../api/authenticationApi";
import { toast } from "react-toastify";


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
            <h1 className="text-center font-bold text-6xl">
                Dashboard
            </h1>
            {user && (
                <p className="text-center"> Welcome {user.firstName}</p>
            )}
        </div>
    );
};

DashboardPage.propTypes = {
    history: PropTypes.object.isRequired
};

export default DashboardPage;
