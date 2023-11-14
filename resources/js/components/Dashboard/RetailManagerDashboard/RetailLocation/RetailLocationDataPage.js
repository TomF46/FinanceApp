import React, { useEffect, useState } from 'react';
import { getRetailLocationDataById } from '../../../../api/retailLocationsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import RetailDataSummaryTable from '../../../DisplayComponents/RetailDataSummaryTable';
import RetailInvestmentSummaryTable from '../../../DisplayComponents/RetailInvestmentSummaryTable';
import RetailerYearByYearProfitBarChart from './charts/RetailerYearByYearProfitBarChart';
import { useParams } from 'react-router-dom';

const RetailLocationDataPage = () => {
  const { retailLocationId } = useParams();
  const [retailLocation, setRetailLocation] = useState(null);

  useEffect(() => {
    getRetailLocationDataById(retailLocationId)
      .then((retailLocationData) => {
        setRetailLocation(retailLocationData);
      })
      .catch((error) => {
        toast.error('Error getting retail location ' + error.message, {
          autoClose: false,
        });
      });
  }, [retailLocationId]);

  return (
    <>
      {!retailLocation ? (
        <LoadingMessage message={'Loading Retail Location'} />
      ) : (
        <>
          <h1 className='text-center font-bold text-4xl'>
            {retailLocation.name}
          </h1>

          <div className='my-4'>
            <RetailDataSummaryTable
              retailDataSummary={retailLocation.retailDataSummary}
            />
          </div>

          <div className='my-4'>
            <RetailInvestmentSummaryTable
              investmentSummary={retailLocation.investmentSummary}
            />
          </div>
          {retailLocation.hasAcceptedApplications ? (
            <RetailerYearByYearProfitBarChart
              retailLocationId={retailLocation.id}
            />
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

export default RetailLocationDataPage;
