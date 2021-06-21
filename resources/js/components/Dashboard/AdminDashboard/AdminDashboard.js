import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeadOfficeRegisterForm from "./HeadOfficeAdmin/HeadOfficeRegisterForm";
import AreaManagerRegisterForm from "./AreaManagerAdmin/AreaManagerRegisterForm";
import RetailManagerRegisterForm from "./RetailManagerAdmin/RetailManagerRegisterForm";

const AdminDashboard = ({ user }) => {
    return (
        <div className="admin-dashboard">
            <p className="text-center"> Admin Dashboard</p>

            <div className="my-4">
                <HeadOfficeRegisterForm />
            </div>

            <div className="my-4">
                <AreaManagerRegisterForm />
            </div>

            <div className="my-4">
                <RetailManagerRegisterForm />
            </div>

        </div>
    );
};

AdminDashboard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default AdminDashboard;
