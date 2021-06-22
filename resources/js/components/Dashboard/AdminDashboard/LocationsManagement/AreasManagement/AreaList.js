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
            <div className="col-span-12 overflow-hidden shadow page">
                {!areasPaginator ? (
                    <LoadingMessage message={'Loading areas'} />
                ) : (
                    <>
                        <h1 className="font-bold text-4xl my-4 text-center">Areas</h1>
                        {areasPaginator.total > 0 ? (
                            <AreasListWithPagination paginationData={areasPaginator} onPageChange={getAreasPage} />
                        ) : (
                            <p className="text-center">There are currently no areas added.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

AreaList.propTypes = {
};

export default AreaList;
