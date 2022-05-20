import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getRetailerProfitContributionBarChart } from "../../../../api/areasApi";
import BarChart from "../../../DisplayComponents/Charts/BarChart";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";

const AreaRetailerProfitContributionBarChart = ({ areaId }) => {
    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        getGraphData();
    }, [areaId])


    function getGraphData() {
        getRetailerProfitContributionBarChart(areaId).then(data => {
            setGraphData(data);
        }).catch(error => {
            toast.error("Error getting graph data " + error.message, {
                autoClose: false,
            });
        });
    }


    return (
        <>
            {!graphData ? (
                <LoadingMessage message={"Loading graph"} />
            ) : (
                <div className="my-8">
                    <h2 className="text-center text-xl mb-4">Total Profit Per Retailer</h2>
                    <BarChart graphData={graphData} />
                </div>
            )}
        </>
    )
};

AreaRetailerProfitContributionBarChart.propTypes = {
    areaId: PropTypes.any.isRequired,
};

export default AreaRetailerProfitContributionBarChart;
