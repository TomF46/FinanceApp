import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getYearById } from "../../../../../api/yearsApi";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import RetailProfitBarChart from "./RetailProfitBarChart";
import RetailProfitPieChart from "./RetailProfitPieChart";
import AreasProfitBarChart from "./AreasProfitBarChart";

const YearChartsPage = ({ yearId }) => {
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
                <LoadingMessage message={"Loading Year Charts"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl mb-4">
                        {year.year} charts
                    </h1>

                    <div className="my-4">
                        <div className="card shadow-md rounded-md py-1 mb-4">
                            <AreasProfitBarChart yearId={yearId} />
                        </div>
                        <div className="card shadow-md rounded-md py-1 mb-4">
                            <RetailProfitBarChart yearId={yearId} />
                        </div>
                        <div className="card shadow-md rounded-md py-1">
                            <RetailProfitPieChart yearId={yearId} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

YearChartsPage.propTypes = {
    yearId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        yearId: ownProps.match.params.yearId,
    };
};


export default connect(mapStateToProps)(YearChartsPage);
