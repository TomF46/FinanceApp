import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getYearById, getCompletedApplicationForYearById } from "../../../../../api/yearsApi";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import AreaApplicationsListWithPagination from "../../../../DisplayComponents/AreaApplicationListWithPagination";
import { getPaginationPage } from "../../../../../api/applicationsApi";
import { useParams } from "react-router-dom";

const YearApplicationsPage = () => {
    const { yearId } = useParams();
    const [year, setYear] = useState(null);
    const [applicationsPaginator, setApplicationsPaginator] = useState(null);

    useEffect(() => {
        if (!year) {
            getYear();
        }
        if (!applicationsPaginator) {
            getCompletedApplications();
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

    function getCompletedApplications() {
        getCompletedApplicationForYearById(yearId).then(applicationData => {
            setApplicationsPaginator(applicationData);
        }).catch(error => {
            toast.error("Error getting completed applications for year " + error.message, {
                autoClose: false,
            });
        });
    }

    function getPage(url){
        getPaginationPage(url).then(applicationData => {
            setApplicationsPaginator(applicationData);
        }).catch(error => {
            toast.error("Error getting completed applications for year " + error.message, {
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
                    <h1 className="text-center font-bold text-4xl mb-4">
                        {year.year} completed applications
                    </h1>

                    {!applicationsPaginator ? (
                        <LoadingMessage message={"Loading completed applications."} />
                    ) : (
                        <div className="card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Completed applications</p>
                            </div>
                            <div>
                                {applicationsPaginator.total > 0 ? (
                                    <AreaApplicationsListWithPagination paginationData={applicationsPaginator} onPageChange={getPage}/>
                                ) : (
                                    <p className="text-center p-4">This year has no completed applications.</p>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
};

export default YearApplicationsPage;
