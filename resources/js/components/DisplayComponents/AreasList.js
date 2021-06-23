import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AreasList = ({ areas }) => {
    return (
        <div>
            {areas.map((area) => {
                return (
                    <div key={area.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <Link to={`/admin/locations/areas/${area.id}`} className="font-medium text-lg items-center pointer">{area.name}</Link>
                        </div>
                        <div className="lg:block col-span-4">
                            <p className="text-sm text-gray-600">Locations:</p>
                            <p>{area.locationCount}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">TBC:</p>
                            <p>TBC</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">TBC:</p>
                            <p>TBC</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

AreasList.propTypes = {
    areas: PropTypes.array.isRequired,
};

export default AreasList;
