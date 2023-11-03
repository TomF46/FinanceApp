import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ManagersList = ({ managers, onManagerRemove }) => {
  return (
    <div>
      {managers.length > 0 ? (
        managers.map((manager) => {
          return (
            <div
              key={manager.id}
              className='grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden'
            >
              <div className='col-span-3'>
                <p className='text-sm text-gray-600'>Name:</p>
                <Link
                  to={`/admin/users/${manager.id}`}
                  className='font-bold text-primary hover:text-secondary text-lg pointer'
                >
                  {manager.fullName}
                </Link>
              </div>
              <div className='col-span-3'>
                <p className='text-sm text-gray-600'>Role:</p>
                <p>{manager.roleTitle}</p>
              </div>
              <div className='col-span-4'>
                <p className='text-sm text-gray-600'>Email:</p>
                <p>{manager.email}</p>
              </div>
              <div className='col-span-2'>
                <div className='table vertical-centered'>
                  <button
                    onClick={() => onManagerRemove(manager.id)}
                    className='bg-danger text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center'
                  >
                    <p className='m-auto'>Remove</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className='p-4 text-center'>No managers have been added</p>
      )}
    </div>
  );
};

ManagersList.propTypes = {
  managers: PropTypes.array.isRequired,
  onManagerRemove: PropTypes.func.isRequired,
};

export default ManagersList;
