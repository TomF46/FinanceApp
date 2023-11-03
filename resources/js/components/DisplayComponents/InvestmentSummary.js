import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from './LoadingMessage';
import { getInvestment } from '../../api/applicationsApi';
import { toast } from 'react-toastify';
import MoneyFormat from './MoneyFormat';
import { getMoneyTextColorClass } from '../../tools/HelperFunctions';

const InvestmentSummary = ({ application }) => {
  const [investment, setInvestment] = useState(null);

  useEffect(() => {
    if (!investment) {
      getInvestmentSummary();
    }
  }, [investment]);

  function getInvestmentSummary() {
    getInvestment(application)
      .then((investmentData) => {
        setInvestment(investmentData);
      })
      .catch((error) => {
        toast.error('Error getting investment summary ' + error.message, {
          autoClose: false,
        });
      });
  }

  return (
    <>
      {investment ? (
        <div className='my-4 card shadow-md rounded-md'>
          <div className='bg-primary rounded-t-md'>
            <p className='text-white font-bold text-lg px-2 py-1'>
              Investment summary
            </p>
          </div>
          <table className='table-fixed w-full'>
            <thead>
              <tr>
                <th className='w-1/2 text-left pl-2'>Source</th>
                <th className='w-1/2 text-left'>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-gray-200'>
                <td className='pl-2'>From Non-operating income</td>
                <td className={`${getMoneyTextColorClass(investment.fromNOI)}`}>
                  <MoneyFormat value={investment.fromNOI} />
                </td>
              </tr>
              <tr>
                <td className='pl-2'>From Sales</td>
                <td
                  className={`${getMoneyTextColorClass(investment.fromSales)}`}
                >
                  <MoneyFormat value={investment.fromSales} />
                </td>
              </tr>
              <tr className='bg-gray-200'>
                <td className='pl-2'>From Net profit</td>
                <td
                  className={`${getMoneyTextColorClass(
                    investment.fromNetProfit,
                  )}`}
                >
                  <MoneyFormat value={investment.fromNetProfit} />
                </td>
              </tr>
              <tr className='border-b border-t'>
                <td className='font-bold pl-2'>Total</td>
                <td
                  className={`font-bold ${getMoneyTextColorClass(
                    investment.total,
                  )}`}
                >
                  <MoneyFormat value={investment.total} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <LoadingMessage message={'Loading Investment'} />
      )}
    </>
  );
};

InvestmentSummary.propTypes = {
  application: PropTypes.object.isRequired,
};

export default InvestmentSummary;
