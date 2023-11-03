import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../../../FormComponents/TextAreaInput';

const AreaManagerApplicationControls = ({
  onAccept,
  rejectionMessage,
  onReject,
  onChange,
  saving = false,
  errors = {},
}) => {
  const [showRejectControls, setRejectControls] = useState(false);
  return (
    <div className='application-admin-controls'>
      <div className='my-4 card shadow-md rounded-md'>
        <div className='bg-secondary rounded-t-md'>
          <p className='text-white font-bold text-lg px-2 py-1'>Actions</p>
        </div>
        <div className='px-2 py-4 flex justify-between'>
          <button
            onClick={() => {
              setRejectControls(true);
            }}
            className='bg-danger hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer'
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className='bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer'
          >
            Accept
          </button>
        </div>
      </div>

      {showRejectControls && (
        <div className='my-4'>
          <form className='' onSubmit={onReject}>
            <div className='my-8'>
              <div className='my-2 card shadow-md rounded-md'>
                <div className='bg-primary rounded-t-md'>
                  <p className='text-white font-bold text-lg px-2 py-1'>
                    Rejection message
                  </p>
                </div>
                <div className='p-2'>
                  {errors.onSave && (
                    <div className='text-red-500 text-xs p-1' role='alert'>
                      {errors.onSave}
                    </div>
                  )}

                  <div className='mb-6'>
                    <TextAreaInput
                      name='message'
                      label='Message'
                      value={rejectionMessage}
                      onChange={onChange}
                      error={errors.message}
                      placeholder={
                        'Let the retailer know why you have rejected the application and what they need to do to get it accepted'
                      }
                      required={true}
                    />
                  </div>

                  <div className='flex justify-center'>
                    <button
                      type='submit'
                      disabled={saving}
                      className='bg-primary text-white rounded py-2 px-4 hover:opactity-75'
                    >
                      {saving ? 'Rejecting...' : 'Reject'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

AreaManagerApplicationControls.propTypes = {
  onReject: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  rejectionMessage: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AreaManagerApplicationControls;
