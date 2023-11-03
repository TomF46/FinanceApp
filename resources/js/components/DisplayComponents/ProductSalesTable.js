import React from 'react';
import PropTypes from 'prop-types';
import MoneyFormat from './MoneyFormat';

const ProductSalesTable = ({ products }) => {
  return (
    <div className='my-2 card shadow-md rounded-md'>
      <div className='bg-primary rounded-t-md'>
        <p className='text-white font-bold text-lg px-2 py-1'>
          All time sales summary
        </p>
      </div>
      <table className='table-fixed w-full'>
        <thead>
          <td>Name</td>
          <td>Cost</td>
          <td>Price</td>
          <td>Quantity sold</td>
          <td>Total income</td>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr className='bg-gray-200 px-2 py-1' key={product.id}>
                <td>{product.name}</td>
                <td>
                  <MoneyFormat value={product.cost} />
                </td>
                <td>
                  <MoneyFormat value={product.price} />
                </td>
                <td>{product.totalQuantity}</td>
                <td>
                  <MoneyFormat value={product.totalIncome} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ProductSalesTable.propTypes = {
  products: PropTypes.object.isRequired,
};

export default ProductSalesTable;
