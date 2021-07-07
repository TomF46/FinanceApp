import React, { useEffect, useState } from "react";
import UsersPage from "./UsersPage";
import { Link } from "react-router-dom";

const UsersManagementPage = () => {
    return (
        <div className="user-management">
            <h1 className="text-center font-bold text-4xl">User Management</h1>
            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-secondary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                </div>
                <div className="px-2 py-4">
                    <Link to={`/admin/users/headOffice/register`} className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Register Head Office</Link>
                    <Link to={`/admin/users/areaManager/register`} className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Register Area Manager</Link>
                    <Link to={`/admin/users/retailManager/register`} className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer">Register Retail Manager</Link>
                </div>
            </div>
            <div className="my-4">
                <UsersPage />
            </div>
        </div>
    );
};

export default UsersManagementPage;
