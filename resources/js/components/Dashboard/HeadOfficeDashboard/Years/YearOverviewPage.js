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
                        <p>Totals for signed off applications</p>
                        <p>Total non-operating income: £{year.totalNOIncome}</p>
                        <p>Total expenses: £{year.totalExpenses}</p>
                        <p>Total sales income: £{year.totalSalesIncome}</p>
                        <p>Total Profit/Loss: £{getTotalProfitLoss()}</p>
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
