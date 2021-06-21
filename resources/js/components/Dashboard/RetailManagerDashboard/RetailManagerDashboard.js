import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const RetailManagerDashboard = ({ user }) => {
    return (
        <div className="Retail-manager-dashboard">
            <p className="text-center">Retail Manager Dashboard</p>
        </div>
    );
};

RetailManagerDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default RetailManagerDashboard;
