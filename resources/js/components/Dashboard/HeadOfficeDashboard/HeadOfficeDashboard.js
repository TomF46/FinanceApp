import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const HeadOfficeDashboard = ({ user }) => {
    return (
        <div className="headoffice-dashboard">
            <p className="text-center">Head Office Dashboard</p>
        </div>
    );
};

HeadOfficeDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default HeadOfficeDashboard;
