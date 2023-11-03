import React from 'react';
import PropTypes from 'prop-types';

const ApplicationsStatusSummary = ({ summary }) => {
  return (
    <div className='my-2 card shadow-md rounded-md'>
      <div className='bg-primary rounded-t-md'>
        <p className='text-white font-bold text-lg px-2 py-1'>
          Applications status summary
        </p>
      </div>
      <div className='grid grid-cols-10 px-2 py-1 card shadow-md rounded-md border-b border-gray-200 overflow-hidden text-center'>
        <div className='col-span-2'>
          <p className='text-sm text-gray-600'>Total Applications:</p>
          <p>{summary.totalApplications}</p>
        </div>
        <div className='col-span-2'>
          <p className='text-sm text-gray-600'>Not Started:</p>
          <p>{summary.totalNotStarted}</p>
        </div>
        <div className='col-span-2'>
          <p className='text-sm text-gray-600'>Awaiting sign off:</p>
          <p>{summary.totalAwaitingSignOff}</p>
        </div>
        <div className='col-span-2'>
          <p className='text-sm text-gray-600'>Returned:</p>
          <p>{summary.totalReturned}</p>
        </div>
        <div className='col-span-2'>
          <p className='text-sm text-gray-600'>Accepted:</p>
          <p>{summary.totalAccepted}</p>
        </div>
      </div>
    </div>
  );
};

ApplicationsStatusSummary.propTypes = {
  summary: PropTypes.object.isRequired,
};

export default ApplicationsStatusSummary;
