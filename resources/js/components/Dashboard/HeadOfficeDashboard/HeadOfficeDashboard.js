import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import YearsDashboard from "./Years/YearsDashboard";


const HeadOfficeDashboard = ({ user }) => {
    return (
        <div className="headoffice-dashboard">
            <p className="text-center">This is your dashboard, manage and create reporting years and look into individual years to find in depth information about retail location reporting figures</p>
            <YearsDashboard />
        </div>
    );
};

HeadOfficeDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default HeadOfficeDashboard;
