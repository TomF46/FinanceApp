import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getYearByYearProfitBarChart } from '../../../../../api/overviewApi';
import BarChart from '../../../../DisplayComponents/Charts/BarChart';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';

const YearByYearProfitBarChart = () => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    getGraphData();
  }, []);

  function getGraphData() {
    getYearByYearProfitBarChart()
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
          <h2 className='text-center text-xl mb-4'>Year By Year Profit</h2>
          <BarChart graphData={graphData} />
        </div>
      )}
    </div>
  );
};

export default YearByYearProfitBarChart;
