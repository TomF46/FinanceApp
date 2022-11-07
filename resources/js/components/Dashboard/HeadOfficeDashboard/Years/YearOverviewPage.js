import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { getYearById, publishYear } from "../../../../api/yearsApi";
import RetailDataSummaryTable from "../../../DisplayComponents/RetailDataSummaryTable";
import RetailInvestmentSummaryTable from "../../../DisplayComponents/RetailInvestmentSummaryTable";
import ApplicationsStatusSummary from "../../../DisplayComponents/ApplicationsStatusSummary";
import { confirm } from "../../../../tools/PopupHelper";
import { Link } from "react-router-dom";

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

    function confirmPublish(){
        confirm(
            "Confirm publish",
            `Are you sure you want to publish ${year.year} applications? (This is a one time action once published you can't unpublish)`,
            handlePublish
        )
    }

    function handlePublish(){
        publishYear(year.id).then(res => {
            toast.success("Year published")
            getYear();
        }).catch(error => {
            toast.error(`Error publishing year ${error.message}`, {
                autoClose: false,
            });
        })
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

                    {!year.published && (
                        <button
                        onClick={confirmPublish}
                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                    >
                        Publish
                    </button>
                    )}

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
                        <div className="my-4 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">View</p>
                            </div>
                            <div className="px-2 py-2 flex">
                                <Link
                                    to={`/headOffice/years/${yearId}/applications`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow mr-2"
                                >
                                    Completed applications
                                </Link>
                                <Link
                                    to={`/headOffice/years/${yearId}/charts`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow"
                                >
                                    Charts
                                </Link>
                            </div>
                        </div>
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
