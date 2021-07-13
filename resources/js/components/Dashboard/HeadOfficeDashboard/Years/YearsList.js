import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage"
import { Link } from "react-router-dom";
import { getYears } from "../../../../api/yearsApi";


const YearsList = () => {
    const [years, setYears] = useState(null);
    useEffect(() => {
        if (!years) {
            getYears().then(yearsData => {
                setYears(yearsData);
            }).catch(error => {
                toast.error("Error getting years " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [years])

    return (
        <div className="years-list">
            <div className="col-span-12">
                {!years ? (
                    <LoadingMessage message={'Loading reporting years'} />
                ) : (
                    <>
                        <div>
                            <div className="card shadow-md rounded-md">
                                <div className="bg-primary rounded-t-md">
                                    <p className="text-white font-bold text-lg px-2 py-1">Reporting years</p>
                                </div>
                                <div>
                                    {years.length > 0 ? (
                                        <div>
                                            {years.map((year) => {
                                                return (
                                                    <div key={year.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                                                        <div className="col-span-6 lg:col-span-2">
                                                            <p className="text-sm text-gray-600">Year:</p>
                                                            <Link to={`/headOffice/years/${year.id}`} className="font-medium text-lg items-center pointer">{year.year}</Link>
                                                        </div>
                                                        <div className="lg:block col-span-2">
                                                            <p className="text-sm text-gray-600">Total Applications:</p>
                                                            <p>{year.totalApplications}</p>
                                                        </div>
                                                        <div className="lg:block col-span-2">
                                                            <p className="text-sm text-gray-600">Not Started:</p>
                                                            <p>{year.totalNotStarted}</p>
                                                        </div>
                                                        <div className="lg:block col-span-2">
                                                            <p className="text-sm text-gray-600">Awaiting sign off:</p>
                                                            <p>{year.totalAwaitingSignOff}</p>
                                                        </div>
                                                        <div className="lg:block col-span-2">
                                                            <p className="text-sm text-gray-600">Returned:</p>
                                                            <p>{year.totalReturned}</p>
                                                        </div>
                                                        <div className="lg:block col-span-2">
                                                            <p className="text-sm text-gray-600">Accepted:</p>
                                                            <p>{year.totalAccepted}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-center p-4">There are currently no years added.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

YearsList.propTypes = {
};

export default YearsList;
