import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAreasPaginated, getAreasWithPaginator } from "../../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage"
import AreasListWithPagination from "../../../../DisplayComponents/AreasListWithPagination";
import { Link } from "react-router-dom";

const AreaList = () => {
    const [areasPaginator, setAreasPaginator] = useState(null);
    useEffect(() => {
        if (!areasPaginator) {
            getAreasPaginated().then(areasData => {
                setAreasPaginator(areasData);
            }).catch(error => {
                toast.error("Error getting areas " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [areasPaginator])

    function getAreasPage(url) {
        getAreasWithPaginator(url).then(areasData => {
            setAreasPaginator(areasData);
        }).catch(error => {
            toast.error("Error getting areas " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="areas-list">
            <div className="col-span-12">
                {!areasPaginator ? (
                    <LoadingMessage message={'Loading areas'} />
                ) : (
                    <>
                        <div className="my-8">
                            <div className="my-2 card shadow-md rounded-md">
                                <div className="bg-primary rounded-t-md">
                                    <p className="text-white font-bold text-lg px-2 py-1">Areas</p>
                                </div>
                                <div>
                                    {areasPaginator.total > 0 ? (
                                        <AreasListWithPagination paginationData={areasPaginator} isAdmin={true} onPageChange={getAreasPage} />
                                    ) : (
                                        <p className="text-center">There are currently no areas added.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

AreaList.propTypes = {
};

export default AreaList;
