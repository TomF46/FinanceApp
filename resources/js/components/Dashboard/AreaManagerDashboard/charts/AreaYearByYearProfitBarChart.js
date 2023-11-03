import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getYearByYearProfitBarChart } from '../../../../api/areasApi';
import BarChart from '../../../DisplayComponents/Charts/BarChart';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';

const AreaYearByYearProfitBarChart = ({ areaId }) => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    getGraphData();
  }, [areaId]);

  function getGraphData() {
    getYearByYearProfitBarChart(areaId)
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
    <div className='card shadow-md rounded-md py-4'>
      {!graphData ? (
        <LoadingMessage message={'Loading graph'} />
      ) : (
        <div>
          <h2 className='text-center text-xl mb-4'>
            Year By Year Profit For Area
          </h2>
          <BarChart graphData={graphData} />
        </div>
      )}
    </div>
  );
};

AreaYearByYearProfitBarChart.propTypes = {
  areaId: PropTypes.any.isRequired,
};

export default AreaYearByYearProfitBarChart;
