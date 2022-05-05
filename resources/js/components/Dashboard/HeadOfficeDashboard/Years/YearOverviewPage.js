import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { getYearById, getYearRetailBarChart } from "../../../../api/yearsApi";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";
import BarChart from "../../../DisplayComponents/BarChart";

const YearOverviewPage = ({ yearId }) => {
    const [year, setYear] = useState(null);
    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        if (!year) {
            getYear();
        }
    }, [yearId, year])

    function getYear() {
        getYearById(yearId).then(yearData => {
            setYear(yearData);
            getGraphData();
        }).catch(error => {
            toast.error("Error getting year " + error.message, {
                autoClose: false,
            });
        });
    }

    function getGraphData() {
        getYearRetailBarChart(yearId).then(data => {
            setGraphData(data);
        }).catch(error => {
            toast.error("Error getting graph data " + error.message, {
                autoClose: false,
            });
        });
    }


    return (
        <>
            {!year ? (
                <LoadingMessage message={"Loading Year Overview"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {year.year}
                    </h1>

                    <div className="my-4">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Applications status summary</p>
                            </div>
                            <div className="grid grid-cols-10 px-2 py-1 card shadow-md rounded-md border-b border-gray-200 overflow-hidden text-center">
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">Total Applications:</p>
                                    <p>{year.totalApplications}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">Not Started:</p>
                                    <p>{year.applicationStatusSummary.totalNotStarted}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">Awaiting sign off:</p>
                                    <p>{year.applicationStatusSummary.totalAwaitingSignOff}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">Returned:</p>
                                    <p>{year.applicationStatusSummary.totalReturned}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">Accepted:</p>
                                    <p>{year.applicationStatusSummary.totalAccepted}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-4">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Summary of signed off applications</p>
                            </div>
                            <table className="table-fixed w-full">
                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total Non-operating income</td>
                                        <td><MoneyFormat value={year.retailDataSummary.totalNOIncome} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total sales income</td>
                                        <td><MoneyFormat value={year.retailDataSummary.totalSalesIncome} /></td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total Income</td>
                                        <td><MoneyFormat value={year.retailDataSummary.totalIncome} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total Expenses</td>
                                        <td><MoneyFormat value={year.retailDataSummary.totalExpenses} /></td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2 font-bold">Total profit/loss</td>
                                        <td className="font-bold"><MoneyFormat value={year.retailDataSummary.totalProfitLoss} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="my-4">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Summary of investments</p>
                            </div>
                            <table className="table-fixed w-full">
                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total investment from Non-operating income data</td>
                                        <td><MoneyFormat value={year.investmentSummary.totalFromNOI} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total investment from sales data</td>
                                        <td><MoneyFormat value={year.investmentSummary.totalFromSales} /></td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total investment from net profit data</td>
                                        <td><MoneyFormat value={year.investmentSummary.totalFromNetProfit} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2 font-bold">Total investment</td>
                                        <td className="font-bold"><MoneyFormat value={year.investmentSummary.total} /></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {!graphData ? (
                        <LoadingMessage message={"Loading graph"} />
                    ) : (
                        <div className="my-8">
                            <h2 className="text-center text-xl mb-4">Net Profit Per Retailer</h2>
                            <BarChart graphData={graphData} />
                        </div>
                    )}
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
