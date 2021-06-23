import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";



const HeadOfficeDashboard = ({ user }) => {
    return (
        <div className="headoffice-dashboard">
            <p className="text-center">Head Office Dashboard</p>

            <div className="my-4">
                <Link to={`/headOffice/years`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">Years Admin</Link>
            </div>
        </div>
    );
};

HeadOfficeDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default HeadOfficeDashboard;
