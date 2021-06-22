import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { Link } from "react-router-dom";

const UsersManagementPage = () => {
    return (
        <div className="user-management">
            <p className="text-center">User Management</p>

            <div className="my-4">
                <UserList />
            </div>
            <div className="mb-4">
                <Link to={`/admin/users/headOffice/register`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">Register Head Office</Link>
                <Link to={`/admin/users/areaManager/register`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">Register Area Manager</Link>
                <Link to={`/admin/users/retailManager/register`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer">Register Retail Manager</Link>
            </div>
        </div>
    );
};

export default UsersManagementPage;