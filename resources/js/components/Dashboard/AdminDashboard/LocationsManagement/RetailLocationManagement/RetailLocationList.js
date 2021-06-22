import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRetailLocationsPaginated, getRetailLocationsWithPaginator } from "../../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage"
import RetailLocationsListWithPagination from "../../../../DisplayComponents/RetailLocationsListWithPagination";
import { Link } from "react-router-dom";

const RetailLocationList = () => {
    const [retailLocationsPaginator, setRetailLocationsPaginator] = useState(null);
    useEffect(() => {
        if (!retailLocationsPaginator) {
            getRetailLocationsPaginated().then(retailLocationsData => {
                setRetailLocationsPaginator(retailLocationsData);
            }).catch(error => {
                toast.error("Error getting retail locations " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [retailLocationsPaginator])

    function getRetailLocationsPage(url) {
        getRetailLocationsWithPaginator(url).then(retailLocationsData => {
            setRetailLocationsPaginator(retailLocationsData);
        }).catch(error => {
            toast.error("Error getting retail locations " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="retailLocations-list">
            <div className="col-span-12 overflow-hidden shadow page">
                {!retailLocationsPaginator ? (
                    <LoadingMessage message={'Loading retail locations'} />
                ) : (
                    <>
                        <h1 className="font-bold text-4xl my-4 text-center">Retail Locations</h1>
                        {retailLocationsPaginator.total > 0 ? (
                            <RetailLocationsListWithPagination paginationData={retailLocationsPaginator} onPageChange={getRetailLocationsPage} />
                        ) : (
                            <p className="text-center">There are currently no retail locations added.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

RetailLocationList.propTypes = {
};

export default RetailLocationList;
