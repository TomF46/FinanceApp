import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getYearRetailBarChart } from '../../../../../api/yearsApi';
import BarChart from '../../../../DisplayComponents/Charts/BarChart';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';

const RetailProfitBarChart = ({ yearId }) => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    getGraphData();
  }, [yearId]);

  function getGraphData() {
    getYearRetailBarChart(yearId)
      .then((data) => {
        setGraphData(data);
      })
      .catch((error) => {
        toast.error('Error getting graph data ' + error.message, {
          autoClose: false,
        });
      });
  }

  return (
    <>
      {!graphData ? (
        <LoadingMessage message={'Loading graph'} />
      ) : (
        <div className='my-8'>
          <h2 className='text-center text-xl mb-4'>Net Profit Per Retailer</h2>
          <BarChart graphData={graphData} />
        </div>
      )}
    </>
  );
};

RetailProfitBarChart.propTypes = {
  yearId: PropTypes.any.isRequired,
};

export default RetailProfitBarChart;
