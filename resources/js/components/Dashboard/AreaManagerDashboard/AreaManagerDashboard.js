import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AreaManagerDashboard = ({ user }) => {
    return (
        <div className="area-manager-dashboard">
            <p className="text-center">Area Manager Dashboard</p>
        </div>
    );
};

AreaManagerDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default AreaManagerDashboard;
