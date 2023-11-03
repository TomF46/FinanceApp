import React from 'react';
import PropTypes from 'prop-types';
import MoneyFormat from './MoneyFormat';
import { getMoneyTextColorClass } from '../../tools/HelperFunctions';

const RetailDataSummaryTable = ({ retailDataSummary }) => {
  return (
    <div className='my-2 card shadow-md rounded-md'>
      <div className='bg-primary rounded-t-md'>
        <p className='text-white font-bold text-lg px-2 py-1'>
          Summary of signed off applications
        </p>
      </div>
      <table className='table-fixed w-full'>
        <tbody>
          <tr className='bg-gray-200'>
            <td className='pl-2'>Total Non-operating income</td>
            <td>
              <MoneyFormat value={retailDataSummary.totalNOIncome} />
            </td>
          </tr>
          <tr>
            <td className='pl-2'>Total sales income</td>
            <td>
              <MoneyFormat value={retailDataSummary.totalSalesIncome} />
            </td>
          </tr>
          <tr className='bg-gray-200'>
            <td className='pl-2'>Total Income</td>
            <td>
              <MoneyFormat value={retailDataSummary.totalIncome} />
            </td>
          </tr>
          <tr>
            <td className='pl-2'>Total Expenses</td>
            <td>
              <MoneyFormat value={retailDataSummary.totalExpenses} />
            </td>
          </tr>
          <tr className='bg-gray-200'>
            <td className='pl-2 font-bold'>Total profit/loss</td>
            <td
              className={`font-bold ${getMoneyTextColorClass(
                retailDataSummary.totalProfitLoss,
              )}`}
            >
              <MoneyFormat value={retailDataSummary.totalProfitLoss} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

RetailDataSummaryTable.propTypes = {
  retailDataSummary: PropTypes.object.isRequired,
};

export default RetailDataSummaryTable;
