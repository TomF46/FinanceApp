import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import YearsDashboard from './Years/YearsDashboard';

const HeadOfficeDashboard = ({ user }) => {
  return (
    <div className='headoffice-dashboard'>
      <div className='grid grid-cols-12 pb-4'>
        <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow-md rounded-md page'>
          <h2 className='font-bold text-xl py-4 border-b lg:border-none text-center'>
            Actions
          </h2>
          <div className='my-2'>
            <Link
              to={`/headOffice/years/add`}
              className='bg-primary block text-center hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer'
            >
              Add Reporting Year
            </Link>
          </div>
          <div className='my-2'>
            <Link
              to={`/headOffice/overview`}
              className='bg-primary block text-center hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer'
            >
              Overview
            </Link>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-9'>
          <div className='card shadow-md rounded-md px-2 py-4 mb-4'>
            <p>
              This is the head office dashboard, as a head office user it is
              your responsibility to create and manage reporting years. Once a
              new application year is created each retailer will recieve a
              request to submit an application for that year. As a head office
              user you will also be able to view high level company wide data
              for each period by selecting the year from the list below.
            </p>
          </div>
          <YearsDashboard />
        </div>
      </div>
    </div>
  );
};

HeadOfficeDashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default HeadOfficeDashboard;
