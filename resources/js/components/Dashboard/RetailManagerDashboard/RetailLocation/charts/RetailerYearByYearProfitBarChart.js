import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getYearByYearProfitBarChart } from "../../../../../api/retailLocationsApi";
import BarChart from "../../../../DisplayComponents/Charts/BarChart";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";

const RetailerYearByYearProfitBarChart = ({ retailLocationId }) => {
    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        getGraphData();
    }, [retailLocationId])


    function getGraphData() {
        getYearByYearProfitBarChart(retailLocationId).then(data => {
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
                    <h2 className="text-center text-xl mb-4">Year By Year Profit For Retailer</h2>
                    <BarChart graphData={graphData} />
                </div>
            )}
        </>
    )
};

RetailerYearByYearProfitBarChart.propTypes = {
    retailLocationId: PropTypes.any.isRequired,
};

export default RetailerYearByYearProfitBarChart;
