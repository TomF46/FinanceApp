import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAreaDataById } from "../../../api/areasApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import RetailDataSummaryTable from "../../DisplayComponents/RetailDataSummaryTable";
import RetailInvestmentSummaryTable from "../../DisplayComponents/RetailInvestmentSummaryTable";
import AreaYearByYearProfitBarChart from "./charts/AreaYearByYearProfitBarChart";
import AreaRetailerProfitContributionBarChart from "./charts/AreaRetailerProfitContributionBarChart";


const AreaDataPage = ({ areaId }) => {
    const [area, setArea] = useState(null);
    useEffect(() => {
        if (!area) {
            getArea();
        }
    }, [areaId, area])

    function getArea() {
        getAreaDataById(areaId).then(areaData => {
            setArea(areaData);
        }).catch(error => {
            toast.error("Error getting area " + error.message, {
                autoClose: false,
            });
        });
    }
    return (
        <>
            {!area ? (
                <LoadingMessage message={"Loading Area Overview"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {area.name}
                    </h1>

                    <div className="my-4">
                        <RetailDataSummaryTable retailDataSummary={area.retailDataSummary} />
                    </div>

                    <div className="my-4">
                        <RetailInvestmentSummaryTable investmentSummary={area.investmentSummary} />
                    </div>

                    {area.hasAcceptedApplications ? (
                        <>
                            <AreaYearByYearProfitBarChart areaId={area.id} />
                            <AreaRetailerProfitContributionBarChart areaId={area.id} />
                        </>
                    ) : (
                        <p className="text-center mt-4">Graphs will appear once applications start to be accepted.</p>
                    )}
                </>
            )}
        </>
    )
};

AreaDataPage.propTypes = {
    areaId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        areaId: ownProps.match.params.areaId,
    };
};


export default connect(mapStateToProps)(AreaDataPage);
