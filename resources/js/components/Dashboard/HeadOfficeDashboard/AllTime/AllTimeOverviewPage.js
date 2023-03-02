import React, { useEffect, useState } from "react";
import { getAllApplicationsCSV, getOverview, getYearByYearCSV } from "../../../../api/overviewApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";
import YearByYearProfitBarChart from "./charts/YearByYearProfitBarChart";
import { downloadCSVStream, getMoneyTextColorClass } from "../../../../tools/HelperFunctions";
import RetailDataSummaryTable from "../../../DisplayComponents/RetailDataSummaryTable";
import RetailInvestmentSummaryTable from "../../../DisplayComponents/RetailInvestmentSummaryTable";

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

    function downloadOverviewCSV(){
        getYearByYearCSV().then(data => {
            downloadCSVStream(data, "YearByYearOverview.csv");
        }).catch(error => {
            toast.error("Error getting CSV " + error.message, {
                autoClose: false,
            });
        });
    }

    function downloadAllApplicationsCSV(){
        getAllApplicationsCSV().then(data => {
            downloadCSVStream(data, "AllApplications.csv");
        }).catch(error => {
            toast.error("Error getting CSV " + error.message, {
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
                        <RetailDataSummaryTable retailDataSummary={overview.retailDataSummary} />
                    </div>

                    <div className="my-4">
                        <RetailInvestmentSummaryTable investmentSummary={overview.investmentSummary} />
                    </div>

                    <div className="my-4 card shadow-md rounded-md">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                        </div>
                        <div className="px-2 py-2 flex">
                            <button onClick={() => downloadOverviewCSV()} className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow mr-2">
                                Download overview CSV
                            </button>
                            <button onClick={() => downloadAllApplicationsCSV()} className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow">
                                Download all applications CSV
                            </button>
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