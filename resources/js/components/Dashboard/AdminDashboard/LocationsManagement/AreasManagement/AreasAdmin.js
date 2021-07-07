import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { searchAreas, searchAreasWithPage } from "../../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage"
import AreasListWithPagination from "../../../../DisplayComponents/AreasListWithPagination";
import _, { debounce } from 'lodash';
import AreaSearchForm from "../../../../DisplayComponents/AreaSearchForm";

const AreasAdmin = () => {
    const [areasPaginator, setAreasPaginator] = useState(null);
    const [searchTerms, setSearchTerms] = useState({ name: "" });

    useEffect(() => {
        if (!areasPaginator) {
            search();
        }
    }, [areasPaginator]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerms]);

    function search() {
        searchAreas(searchTerms).then(areasData => {
            setAreasPaginator(areasData);
        }).catch(error => {
            toast.error("Error getting areas " + error.message, {
                autoClose: false,
            });
        });
    }

    function getAreasPage(url) {
        searchAreasWithPage(url, searchTerms).then(areasData => {
            setAreasPaginator(areasData);
        }).catch(error => {
            toast.error("Error getting areas " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleSearchTermsChange(event) {
        const { name, value } = event.target;

        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [name]: value
        }));
    }

    return (
        <div className="areas-list">
            <div className="col-span-12">
                {!areasPaginator ? (
                    <LoadingMessage message={'Loading areas'} />
                ) : (
                    <>
                        <AreaSearchForm searchTerms={searchTerms} onSearchTermsChange={handleSearchTermsChange} />
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
        </div >
    );
};

AreasAdmin.propTypes = {
};

export default AreasAdmin;
