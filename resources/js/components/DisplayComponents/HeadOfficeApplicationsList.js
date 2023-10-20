import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPriorityTextClass } from "../../tools/HelperFunctions";

const HeadOfficeApplicationsList = ({ applications }) => {
    return (
        <div>
            {applications.map((application) => {
                return (
                    <div key={application.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Location:</p>
                            <p>{application.retailLocationName}</p>
                        </div>
                        <div className="col-span-3">
                            <p className="text-sm text-gray-600">Area:</p>
                            <p>{application.areaName}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Status:</p>
                            <p>{application.statusText}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Priority:</p>
                            <p className={getPriorityTextClass(application.priority)}>{application.status == 3 ? "-" : application.priorityText}</p>
                        </div>
                        <div className="col-span-2 inline-flex items-center">
                            <Link to={`/headOffice/years/${application.year.id}/applications/${application.id}`} className="text-primary underline hover:opacity-75">View</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

HeadOfficeApplicationsList.propTypes = {
    applications: PropTypes.array.isRequired,
};

export default HeadOfficeApplicationsList;
