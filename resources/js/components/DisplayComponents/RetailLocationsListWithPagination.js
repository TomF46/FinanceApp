import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import RetailLocationsList from "./RetailLocationsList";


const RetailLocationsListWithPagination = ({ paginationData, isAdmin, onPageChange }) => {
    return (
        <div className="retailLocations-list-w-pagination">
            <RetailLocationsList retailLocations={paginationData.data} isAdmin={isAdmin} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

RetailLocationsListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default RetailLocationsListWithPagination;
