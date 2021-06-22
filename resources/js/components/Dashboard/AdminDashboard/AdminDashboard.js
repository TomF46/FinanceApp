import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <p className="text-center"> Admin Dashboard</p>

            <div className="my-4">
                <Link to={`/admin/users`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">User Admin</Link>
                <Link to={`/admin/locations`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">Locations Admin</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
