import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getYearAreasBarChart } from '../../../../../api/yearsApi';
import BarChart from '../../../../DisplayComponents/Charts/BarChart';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';

const AreasProfitBarChart = ({ yearId }) => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    getYearAreasBarChart(yearId)
      .then((data) => {
        setGraphData(data);
      })
      .catch((error) => {
        toast.error('Error getting graph data ' + error.message, {
          autoClose: false,
        });
      });
  }, [yearId]);

  return (
    <>
      {!graphData ? (
        <LoadingMessage message={'Loading graph'} />
      ) : (
        <div className='my-8'>
          <h2 className='text-center text-xl mb-4'>Net Profit Per Area</h2>
          <BarChart graphData={graphData} />
        </div>
      )}
    </>
  );
};

AreasProfitBarChart.propTypes = {
  yearId: PropTypes.any.isRequired,
};

export default AreasProfitBarChart;
