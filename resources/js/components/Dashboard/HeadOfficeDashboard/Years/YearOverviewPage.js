import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { getYearById } from "../../../../api/yearsApi";


const YearOverviewPage = ({ yearId }) => {
    const [year, setYear] = useState(null);

    useEffect(() => {
        if (!year) {
            getYear();
        }
    }, [yearId, year])

    function getYear() {
        getYearById(yearId).then(yearData => {
            setYear(yearData);
        }).catch(error => {
            toast.error("Error getting year " + error.message, {
                autoClose: false,
            });
        });
    }

    function getTotalProfitLoss() {
        return (year.totalNOIncome + year.totalSalesIncome) - year.totalExpenses;
    }
    return (
        <>
            {!year ? (
                <LoadingMessage message={"Loading Year Overview"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-6xl">
                        {year.year}
                    </h1>

                    <div className="my-4">
                        <div className="grid grid-cols-10 px-2 py-1 border-b border-gray-200 overflow-hidden text-center">
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
                    </div>

                    <div className="my-4">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Summary of signed off applications</p>
                            </div>
                            <table className="table-fixed w-full">
                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total Non-operating income</td>
                                        <td>£{year.totalNOIncome}</td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total sales income</td>
                                        <td>£{year.totalSalesIncome}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total Income</td>
                                        <td>£{year.totalNOIncome + year.totalSalesIncome}</td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total Expenses</td>
                                        <td>£{year.totalSalesIncome}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total profit/loss</td>
                                        <td>£{getTotalProfitLoss()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

YearOverviewPage.propTypes = {
    yearId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        yearId: ownProps.match.params.yearId,
    };
};


export default connect(mapStateToProps)(YearOverviewPage);
