import React, { useEffect, useState } from "react";
import { getOverview } from "../../../../api/overviewApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";
import YearByYearProfitBarChart from "./charts/YearByYearProfitBarChart";
import { getMoneyTextColorClass } from "../../../../tools/HelperFunctions";

const AllTimeOverviewPage = () => {
    const [overview, setOverview] = useState(null);

    useEffect(() => {
        if (!overview) {
            getOrganisationOverview();
        }
    }, [overview])

    function getOrganisationOverview() {
        getOverview().then(data => {
            setOverview(data);
        }).catch(error => {
            toast.error("Error getting overview " + error.message, {
                autoClose: false,
            });
        });
    }


    return (
        <div className="headoffice-overview">
            <h1 className="text-center font-bold text-4xl">
                Organisational financial overview
            </h1>
            {!overview ? (
                <LoadingMessage message={"Loading Year Overview"} />
            ) : (
                <>
                    <div className="my-4">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Summary of signed off applications</p>
                            </div>
                            <table className="table-fixed w-full">
                                <tbody>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total Non-operating income</td>
                                        <td><MoneyFormat value={overview.retailDataSummary.totalNOIncome} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total sales income</td>
                                        <td><MoneyFormat value={overview.retailDataSummary.totalSalesIncome} /></td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total Income</td>
                                        <td><MoneyFormat value={overview.retailDataSummary.totalIncome} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total Expenses</td>
                                        <td><MoneyFormat value={overview.retailDataSummary.totalExpenses} /></td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2 font-bold">Total profit/loss</td>
                                        <td className={`font-bold ${getMoneyTextColorClass(overview.retailDataSummary.totalProfitLoss)}`} ><MoneyFormat value={overview.retailDataSummary.totalProfitLoss} /></td>
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
                                        <td><MoneyFormat value={overview.investmentSummary.totalFromNOI} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2">Total investment from sales data</td>
                                        <td><MoneyFormat value={overview.investmentSummary.totalFromSales} /></td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="pl-2">Total investment from net profit data</td>
                                        <td><MoneyFormat value={overview.investmentSummary.totalFromNetProfit} /></td>
                                    </tr>
                                    <tr>
                                        <td className="pl-2 font-bold">Total investment</td>
                                        <td className={`font-bold ${getMoneyTextColorClass(overview.investmentSummary.total)}`}><MoneyFormat value={overview.investmentSummary.total} /></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {overview.hasAcceptedApplications ? (
                        <YearByYearProfitBarChart />
                    ) : (
                        <p className="text-center mt-4">Graphs will appear once applications start to be accepted.</p>
                    )}
                </>
            )
            }
        </div >
    );
};

export default AllTimeOverviewPage;
