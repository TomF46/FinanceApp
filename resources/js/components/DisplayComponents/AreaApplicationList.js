import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AreaApplicationsList = ({ applications }) => {
    return (
        <div>
            {applications.map((application) => {
                return (
                    <div key={application.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Year:</p>
                            <Link to={`/areas/${application.areaId}/retail/${application.retailLocationId}/applications/${application.id}`} className="font-bold text-primary hover:text-secondary text-lg items-center pointer">{application.year.year}</Link>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Location:</p>
                            <p>{application.retailLocationName}</p>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Area:</p>
                            <p>{application.areaName}</p>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Status:</p>
                            <p>{application.statusText}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

AreaApplicationsList.propTypes = {
    applications: PropTypes.array.isRequired,
};

export default AreaApplicationsList;
