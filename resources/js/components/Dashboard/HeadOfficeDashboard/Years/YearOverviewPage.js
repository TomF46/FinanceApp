import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { getYearById } from "../../../../api/yearsApi";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";
import RetailProfitBarChart from "./Breakdown/RetailProfitBarChart";
import RetailProfitPieChart from "./Breakdown/RetailProfitPieChart";
import AreasProfitBarChart from "./Breakdown/AreasProfitBarChart";
import { getMoneyTextColorClass } from "../../../../tools/HelperFunctions";
import RetailDataSummaryTable from "../../../DisplayComponents/RetailDataSummaryTable";
import RetailInvestmentSummaryTable from "../../../DisplayComponents/RetailInvestmentSummaryTable";
import ApplicationsStatusSummary from "../../../DisplayComponents/ApplicationsStatusSummary";

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
                        <ApplicationsStatusSummary summary={year.applicationStatusSummary} />
                    </div>

                    <div className="my-4">
                        <RetailDataSummaryTable retailDataSummary={year.retailDataSummary} />
                    </div>

                    <div className="my-4">
                        <RetailInvestmentSummaryTable investmentSummary={year.investmentSummary} />
                    </div>
                    {year.applicationStatusSummary.totalAccepted > 0 ? (
                        <>
                            <AreasProfitBarChart yearId={yearId} />
                            <RetailProfitBarChart yearId={yearId} />
                            <RetailProfitPieChart yearId={yearId} />
                        </>
                    ) : (
                        <p className="text-center mt-4">Graphs will appear once applications start to be accepted.</p>
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
