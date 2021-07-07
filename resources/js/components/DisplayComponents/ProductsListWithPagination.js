import React from "react";
import PropTypes from "prop-types";
import PaginationControls from "./PaginationControls";
import ProductsList from "./ProducstList";


const ProductsListWithPagination = ({ paginationData, onProductDeactivate, onPageChange }) => {
    return (
        <div className="users-list-w-pagination">
            <ProductsList products={paginationData.data} onProductDeactivate={onProductDeactivate} />
            <PaginationControls to={paginationData.to} from={paginationData.from} of={paginationData.total} onNext={() => onPageChange(paginationData.next_page_url)} onPrevious={() => onPageChange(paginationData.prev_page_url)} currentPage={paginationData.current_page} lastPage={paginationData.last_page} />
        </div>
    );
};

ProductsListWithPagination.propTypes = {
    paginationData: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onProductDeactivate: PropTypes.func.isRequired
};

export default ProductsListWithPagination;
