import React from 'react';
import { Link } from 'react-router-dom';
import YearsList from './YearsList';

const YearsDashboard = () => {
  return (
    <div className='years-page'>
      <YearsList />
    </div>
  );
};

export default YearsDashboard;
