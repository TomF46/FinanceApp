import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AreaList from "./AreasManagement/AreaList";
import RetailLocationList from "./RetailLocationManagement/RetailLocationList";


const LocationsManagementPage = () => {
    return (
        <div className="location-management">
            <h1 className="text-center font-bold text-4xl">Location Management</h1>
            <div className="my-4">
                <Link to={`/admin/locations/areas/create`} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Create Area</Link>
                <Link to={`/admin/locations/retail/create`} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Create Retail Location</Link>
            </div>
            <div className="mb-4">
                <AreaList />
            </div>
            <div className="mb-4">
                <RetailLocationList />
            </div>
        </div>
    );
};

export default LocationsManagementPage;
