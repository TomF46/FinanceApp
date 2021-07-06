import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">

            <div className="grid grid-cols-12 pb-4">
                <div className="col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow-md rounded-md page">
                    <h2 className="font-bold text-xl py-4 border-b lg:border-none text-center">
                        Actions
                    </h2>
                    <div className="my-2">
                        <Link to={`/admin/users`} className="bg-primary block text-center hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer">User Admin</Link>
                    </div>
                    <div className="my-2">
                        <Link to={`/admin/locations`} className="bg-primary block text-center hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer">Locations Admin</Link>
                    </div>
                    <div className="my-2">
                        <Link to={`/admin/products`} className="bg-primary block text-center hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer">Products Admin</Link>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9">
                    <div className="card shadow-md rounded-md px-2 py-4">
                        <p>This is the admin dashboard, as an admin at Metior Corp you are responsible for inputting all the correct data about our workforce, locations and products, please see the sections below for more detail on each.</p>
                        <p className="my-4"><span className="font-bold">Users admin:</span> Using data from the central employee database populate this application with our head office, area manager and retail managers who will have access to this application. This section can also be used to update any users with complaints of incorrect information.</p>
                        <p className="my-4"><span className="font-bold">Locations admin:</span> Using data from the Metior Corp retailer and franchise location list, create update and remove where applicable our regional areas and retail locations. First create all the areas we cover then create and assign retail locations within these areas. Once an area or location is created you can also assign a area/retail manager who is responsbile for the related applications.</p>
                        <p className="my-4"><span className="font-bold">Products admin:</span> Using data from the product inventory database, create, update and remove where applicable products in this application. When a new reporting year is approaching it is imperative that all new products have been added and all discontinued items have been removed from the application (Historical applications are not effected by this) </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
