import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RetailLocationsList = ({ retailLocations, isAdmin }) => {
    return (
        <div>
            {retailLocations.map((retailLocation) => {
                return (
                    <div key={retailLocation.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link to={isAdmin ? `/admin/locations/retail/${retailLocation.id}` : `/retail/${retailLocation.id}`} className="font-medium text-lg items-center pointer">{retailLocation.name}</Link>
                        </div>
                        <div className="lg:block col-span-4">
                            <p className="text-sm text-gray-600">Location:</p>
                            <p>{retailLocation.location}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">Area:</p>
                            <p>{retailLocation.area}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">Applications:</p>
                            <p>{retailLocation.totalApplications}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

RetailLocationsList.propTypes = {
    retailLocations: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default RetailLocationsList;
