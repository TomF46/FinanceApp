import React, { useEffect, useState } from 'react';
import { getAreaDataById } from '../../../api/areasApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import RetailDataSummaryTable from '../../DisplayComponents/RetailDataSummaryTable';
import RetailInvestmentSummaryTable from '../../DisplayComponents/RetailInvestmentSummaryTable';
import AreaYearByYearProfitBarChart from './charts/AreaYearByYearProfitBarChart';
import AreaRetailerProfitContributionBarChart from './charts/AreaRetailerProfitContributionBarChart';
import { useParams } from 'react-router-dom';

const AreaDataPage = () => {
  const { areaId } = useParams();
  const [area, setArea] = useState(null);
  useEffect(() => {
    if (!area) {
      getArea();
    }
  }, [areaId, area]);

  function getArea() {
    getAreaDataById(areaId)
      .then((areaData) => {
        setArea(areaData);
      })
      .catch((error) => {
        toast.error('Error getting area ' + error.message, {
          autoClose: false,
        });
      });
  }
  return (
    <>
      {!area ? (
        <LoadingMessage message={'Loading Area Overview'} />
      ) : (
        <>
          <h1 className='text-center font-bold text-4xl'>{area.name}</h1>

          <div className='my-4'>
            <RetailDataSummaryTable
              retailDataSummary={area.retailDataSummary}
            />
          </div>

          <div className='my-4'>
            <RetailInvestmentSummaryTable
              investmentSummary={area.investmentSummary}
            />
          </div>

          {area.hasAcceptedApplications ? (
            <>
              <div className='mb-4'>
                <AreaYearByYearProfitBarChart areaId={area.id} />
              </div>
              <div className='mb-4'>
                <AreaRetailerProfitContributionBarChart areaId={area.id} />
              </div>
            </>
          ) : (
            <p className='text-center mt-4'>
              Graphs will appear once applications start to be accepted.
            </p>
          )}
        </>
      )}
    </>
  );
};

export default AreaDataPage;
