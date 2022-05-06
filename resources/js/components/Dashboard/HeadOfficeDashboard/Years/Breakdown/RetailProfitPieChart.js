import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getProfitPieChart } from "../../../../../api/yearsApi";
import PieChart from "../../../../DisplayComponents/Charts/PieChart";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import MoneyFormat from "../../../../DisplayComponents/MoneyFormat";

const RetailProfitPieChart = ({ yearId }) => {
    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        getGraphData();
    }, [yearId])


    function getGraphData() {
        getProfitPieChart(yearId).then(data => {
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
                    <h2 className="text-center text-xl mb-2">Share of total profit per retailer</h2>
                    <p className="text-center mb-4">Total profit: <MoneyFormat value={graphData.total} /></p>
                    <PieChart graphData={graphData} />
                </div>
            )}
        </>
    )
};

RetailProfitPieChart.propTypes = {
    yearId: PropTypes.any.isRequired,
};



export default RetailProfitPieChart;
