import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AreasAdmin from "./AreasManagement/AreasAdmin";
import RetailLocationsAdmin from "./RetailLocationManagement/RetailLocationsAdmin";


const LocationsManagementPage = () => {
    return (
        <div className="location-management">
            <h1 className="text-center font-bold text-4xl">Location Management</h1>
            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-secondary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                </div>
                <div className="px-2 py-4">
                    <Link to={`/admin/locations/areas/create`} className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Create Area</Link>
                    <Link to={`/admin/locations/retail/create`} className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Create Retail Location</Link>
                </div>
            </div>
            <div className="mb-4">
                <AreasAdmin />
            </div>
            <div className="mb-4">
                <RetailLocationsAdmin />
            </div>
        </div>
    );
};

export default LocationsManagementPage;
