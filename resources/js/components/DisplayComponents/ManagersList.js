import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ManagersList = ({ managers, onManagerRemove }) => {
    return (
        <div>
            {managers.map((manager) => {
                return (
                    <div key={manager.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <p className="font-medium text-lg items-center pointer">{manager.fullName}</p>
                        </div>
                        <div className="lg:block col-span-4">
                            <p className="text-sm text-gray-600">Role:</p>
                            <p>{manager.roleTitle}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">TBC:</p>
                            <p>TBC</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <div className="table vertical-centered">
                                <button
                                    onClick={() => (onManagerRemove(manager.id))}
                                    className="bg-red-800 text-white rounded py-2 px-4 hover:bg-red-600 shadow inline-flex items-center"
                                >
                                    <p className="m-auto">Remove</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

ManagersList.propTypes = {
    managers: PropTypes.array.isRequired,
    onManagerRemove: PropTypes.func.isRequired
};

export default ManagersList;
