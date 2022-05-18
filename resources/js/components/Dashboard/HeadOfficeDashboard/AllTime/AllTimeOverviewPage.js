import React, { useEffect, useState } from "react";
import { getOverview } from "../../../../api/overviewApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";
import YearByYearProfitBarChart from "./charts/YearByYearProfitBarChart";
import { getMoneyTextColorClass } from "../../../../tools/HelperFunctions";
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
