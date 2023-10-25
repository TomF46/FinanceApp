import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getYearById } from "../../../../../api/yearsApi";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import { getPageWithPaginationUrlAndFilters, searchApplications } from "../../../../../api/applicationsApi";
import { useParams } from "react-router-dom";
import HeadOfficeApplicationsListWithPagination from "../../../../DisplayComponents/HeadOfficeApplicationsListWithPagination";
import ApplicationsSearch from "./ApplicationsSearch";
import { debounce } from "lodash";

const YearApplicationsPage = () => {
    const { yearId } = useParams();
    const [year, setYear] = useState(null);
    const [applicationsPaginator, setApplicationsPaginator] = useState(null);
    const [filters, setFilters] = useState({ year: yearId, area: null, status: null, priority: null});

    useEffect(() => {
        if (!year) {
            getYear();
        }
        if (!applicationsPaginator) {
            getApplications();
        }
    }, [yearId, year])

    useEffect(() => {
        let debounced = debounce(
            () => { getApplications(); }, 50
        );

        debounced();
    }, [filters]);

    function getYear() {
        getYearById(yearId).then(yearData => {
            setYear(yearData);
        }).catch(error => {
            toast.error("Error getting year " + error.message, {
                autoClose: false,
            });
        });
    }

    function getApplications() {
        searchApplications(filters).then(applicationData => {
            setApplicationsPaginator(applicationData);
        }).catch(error => {
            toast.error("Error applications for year " + error.message, {
                autoClose: false,
            });
        });
    }

    function getPage(url){
        getPageWithPaginationUrlAndFilters(url, filters).then(applicationData => {
            setApplicationsPaginator(applicationData);
        }).catch(error => {
            toast.error("Error getting applications for year " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            {!year ? (
                <LoadingMessage message={"Loading Years applications"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl mb-4">
                        {year.year} applications
                    </h1>

                    <ApplicationsSearch filters={filters} onUpdateFilters={(newFilters) => setFilters(newFilters)} />

                    {!applicationsPaginator ? (
                        <LoadingMessage message={"Loading applications."} />
                    ) : (
                        <div className="card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Applications</p>
                            </div>
                            <div>
                                {applicationsPaginator.total > 0 ? (
                                    <HeadOfficeApplicationsListWithPagination paginationData={applicationsPaginator} onPageChange={getPage}/>
                                ) : (
                                    <p className="text-center p-4">This year has no applications that match your search.</p>
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
