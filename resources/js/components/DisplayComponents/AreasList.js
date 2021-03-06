import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AreasList = ({ areas, isAdmin }) => {
    return (
        <div>
            {areas.map((area) => {
                return (
                    <div key={area.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link to={isAdmin ? `/admin/locations/areas/${area.id}` : `/areas/${area.id}`} className="font-bold text-primary hover:text-secondary text-lg items-center pointer">{area.name}</Link>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Locations:</p>
                            <p>{area.locationCount}</p>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Require action:</p>
                            <p>{area.areaManagerActionsRequired}</p>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Waiting for retailer:</p>
                            <p>{area.retailManagerActionsRequired}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

AreasList.propTypes = {
    areas: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default AreasList;
