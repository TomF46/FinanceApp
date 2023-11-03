import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from './PaginationControls';
import AreasList from './AreasList';

const AreasListWithPagination = ({ paginationData, isAdmin, onPageChange }) => {
  return (
    <div className='areas-list-w-pagination'>
      <AreasList areas={paginationData.data} isAdmin={isAdmin} />
      <PaginationControls
        to={paginationData.to}
        from={paginationData.from}
        of={paginationData.total}
        onNext={() => onPageChange(paginationData.next_page_url)}
        onPrevious={() => onPageChange(paginationData.prev_page_url)}
        currentPage={paginationData.current_page}
        lastPage={paginationData.last_page}
      />
    </div>
  );
};

AreasListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default AreasListWithPagination;
