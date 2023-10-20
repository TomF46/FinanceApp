import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getYearById, getApplicationForYearById } from "../../../../../api/yearsApi";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import { getPaginationPage } from "../../../../../api/applicationsApi";
import { useParams } from "react-router-dom";
import HeadOfficeApplicationsListWithPagination from "../../../../DisplayComponents/HeadOfficeApplicationsListWithPagination";

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
        getApplicationForYearById(yearId).then(applicationData => {
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
                        {year.year} applications
                    </h1>

                    {!applicationsPaginator ? (
                        <LoadingMessage message={"Loading completed applications."} />
                    ) : (
                        <div className="card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Applications</p>
                            </div>
                            <div>
                                {applicationsPaginator.total > 0 ? (
                                    <HeadOfficeApplicationsListWithPagination paginationData={applicationsPaginator} onPageChange={getPage}/>
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
