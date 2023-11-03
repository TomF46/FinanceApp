import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../FormComponents/TextInput';

const ProductsSearchForm = ({ searchTerms, onSearchTermsChange }) => {
  return (
    <div className='mt-8 mb-4'>
      <div className='my-2 card shadow-md rounded-md'>
        <div className='bg-gray-500 rounded-t-md'>
          <p className='text-white font-bold text-lg px-2 py-1'>Search</p>
        </div>
        <div>
          <div className='grid grid-cols-12 px-2 py-1'>
            <div className='col-span-12 md:col-span-3 py-2'>
              <TextInput
                name='name'
                label='Name'
                value={searchTerms.name}
                onChange={onSearchTermsChange}
              />
            </div>
            <div className='col-span-12 md:col-span-3 p-2'>
              <TextInput
                name='productCode'
                label='Product code'
                value={searchTerms.productCode}
                onChange={onSearchTermsChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductsSearchForm.propTypes = {
  searchTerms: PropTypes.object.isRequired,
  onSearchTermsChange: PropTypes.func.isRequired,
};

export default ProductsSearchForm;
