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
            <div className="col-span-12 overflow-hidden shadow page">
                {!years ? (
                    <LoadingMessage message={'Loading reporting years'} />
                ) : (
                    <>
                        <h1 className="font-bold text-4xl my-4 text-center">Reporting years</h1>
                        {years.length > 0 ? (
                            <div>
                                {years.map((year) => {
                                    return (
                                        <div key={year.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                                            <div className="col-span-6 lg:col-span-4">
                                                <p className="text-sm text-gray-600">Year:</p>
                                                <p className="font-medium text-lg items-center pointer">{year.year}</p>
                                            </div>
                                            <div className="lg:block col-span-4">
                                                <p className="text-sm text-gray-600">TBC:</p>
                                                <p>TBC</p>
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
                        ) : (
                            <p className="text-center">There are currently no years added.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

YearsList.propTypes = {
};

export default YearsList;
