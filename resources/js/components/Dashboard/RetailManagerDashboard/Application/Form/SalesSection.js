import React from 'react';
import PropTypes from 'prop-types';
import MoneyInput from '../../../../FormComponents/MoneyInput';
import MoneyFormat from '../../../../DisplayComponents/MoneyFormat';

const SalesSection = ({ sales, onChange, errors }) => {
  function getTotalSalesIncome() {
    let total = 0;
    sales.forEach((sale) => {
      let profit = (sale.price - sale.cost) * sale.quantity;
      total = total + profit;
    });
    return total;
  }

  return (
    <>
      <div className='my-4'>
        <div className='my-2 card shadow-md rounded-md'>
          <div className='bg-primary rounded-t-md'>
            <p className='text-white font-bold text-lg px-2 py-1'>Sales</p>
          </div>
          <div>
            {sales.map((sale, index) => {
              return (
                <div
                  key={index}
                  className='grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden'
                >
                  <div className='col-span-3 vertical-centered'>
                    <p className='text-sm text-gray-600'>Product:</p>
                    <p>{sale.name}</p>
                  </div>
                  <div className='col-span-3 vertical-centered'>
                    <p className='text-sm text-gray-600'>Profit per sale:</p>
                    <p>
                      <MoneyFormat value={sale.price - sale.cost} />
                    </p>
                  </div>
                  <div className='col-span-3 pr-4'>
                    <div>
                      <MoneyInput
                        name={index}
                        label='Amount sold'
                        value={sales[index].quantity}
                        onChange={onChange}
                        error={null}
                      />
                    </div>
                  </div>
                  <div className='col-span-3 vertical-centered'>
                    <p className='text-sm text-gray-600'>Total Profit:</p>
                    <p>
                      <MoneyFormat
                        value={(sale.price - sale.cost) * sales[index].quantity}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='py-2 px-2'>
            {errors.map((error) => {
              return (
                <p key={error} className='text-red-500'>
                  {error}
                </p>
              );
            })}
          </div>
          <div className='py-2 px-2'>
            <p className='font-bold text-money-positive'>
              Total sales profit: <MoneyFormat value={getTotalSalesIncome()} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

SalesSection.propTypes = {
  sales: PropTypes.array.isRequired,
  errors: PropTypes.Array,
  onChange: PropTypes.func.isRequired,
};

export default SalesSection;
