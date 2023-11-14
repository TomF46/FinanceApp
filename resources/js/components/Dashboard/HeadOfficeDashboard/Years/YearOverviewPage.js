import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import {
  getYearApplicationsCSV,
  getYearById,
  publishYear,
} from '../../../../api/yearsApi';
import RetailDataSummaryTable from '../../../DisplayComponents/RetailDataSummaryTable';
import RetailInvestmentSummaryTable from '../../../DisplayComponents/RetailInvestmentSummaryTable';
import ApplicationsStatusSummary from '../../../DisplayComponents/ApplicationsStatusSummary';
import { confirm } from '../../../../tools/PopupHelper';
import { Link } from 'react-router-dom';
import { downloadCSVStream } from '../../../../tools/HelperFunctions';
import { useParams } from 'react-router-dom';

const YearOverviewPage = () => {
  const { yearId } = useParams();
  const [year, setYear] = useState(null);

  const getYear = useCallback(() => {
    getYearById(yearId)
      .then((yearData) => {
        setYear(yearData);
      })
      .catch((error) => {
        toast.error('Error getting year ' + error.message, {
          autoClose: false,
        });
      });
  }, [yearId]);

  useEffect(() => {
    getYear();
  }, [yearId, getYear]);

  function confirmPublish() {
    confirm(
      'Confirm publish',
      `Are you sure you want to publish ${year.year} applications? (This is a one time action once published you can't unpublish)`,
      handlePublish,
    );
  }

  function handlePublish() {
    publishYear(year.id)
      .then(() => {
        toast.success('Year published');
        getYear();
      })
      .catch((error) => {
        toast.error(`Error publishing year ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function downloadApplicationsCSV() {
    getYearApplicationsCSV(yearId)
      .then((data) => {
        downloadCSVStream(data, `${year.year}Applications.csv`);
      })
      .catch((error) => {
        toast.error('Error getting CSV ' + error.message, {
          autoClose: false,
        });
      });
  }

  return (
    <>
      {!year ? (
        <LoadingMessage message={'Loading Year Overview'} />
      ) : (
        <>
          <h1 className='text-center font-bold text-4xl'>{year.year}</h1>

          <div className='flex'>
            {!year.published && (
              <button
                onClick={confirmPublish}
                className='bg-primary text-white rounded py-2 px-4 hover:opacity-75 mr-4'
              >
                Publish
              </button>
            )}
            <Link
              to={`/headOffice/years/${yearId}/applications`}
              className='bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow mr-4'
            >
              Applications
            </Link>
            <Link
              to={`/headOffice/years/${yearId}/priority`}
              className='bg-primary text-white rounded py-2 px-4 hover:opacity-75 mr-4'
            >
              Set priority
            </Link>
          </div>

          <div className='my-4'>
            <ApplicationsStatusSummary
              summary={year.applicationStatusSummary}
            />
          </div>

          <div className='my-4'>
            <RetailDataSummaryTable
              retailDataSummary={year.retailDataSummary}
            />
          </div>

          <div className='my-4'>
            <RetailInvestmentSummaryTable
              investmentSummary={year.investmentSummary}
            />
          </div>
          {year.applicationStatusSummary.totalAccepted > 0 ? (
            <div className='my-4 card shadow-md rounded-md'>
              <div className='bg-primary rounded-t-md'>
                <p className='text-white font-bold text-lg px-2 py-1'>View</p>
              </div>
              <div className='px-2 py-2 flex'>
                <Link
                  to={`/headOffice/years/${yearId}/charts`}
                  className='bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow mr-2'
                >
                  Charts
                </Link>
                <button
                  onClick={() => downloadApplicationsCSV()}
                  className='bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow pointer'
                >
                  Download applications CSV
                </button>
              </div>
            </div>
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

export default YearOverviewPage;
