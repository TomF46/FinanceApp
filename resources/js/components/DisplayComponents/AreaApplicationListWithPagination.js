import React from 'react';
import PropTypes from 'prop-types';
import PaginationControls from './PaginationControls';
import AreaApplicationsList from './AreaApplicationList';

const AreaApplicationsListWithPagination = ({
  paginationData,
  onPageChange,
}) => {
  return (
    <div className='application-list-w-pagination'>
      <AreaApplicationsList applications={paginationData.data} />
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

AreaApplicationsListWithPagination.propTypes = {
  paginationData: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default AreaApplicationsListWithPagination;
