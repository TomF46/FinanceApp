import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from './LoadingMessage';
import { getRejectionMessage } from '../../api/applicationsApi';

const RejectionMessage = ({ application }) => {
  const [rejectionMessage, setRejectionMessage] = useState(null);

  useEffect(() => {
    getRejectionMessage(application).then((message) => {
      setRejectionMessage(message);
    });
  }, [application]);

  return (
    <>
      {rejectionMessage ? (
        <div>
          <p>By: {rejectionMessage.by}</p>
          <p>Message: {rejectionMessage.message}</p>
        </div>
      ) : (
        <LoadingMessage message={'Loading Application'} />
      )}
    </>
  );
};

RejectionMessage.propTypes = {
  application: PropTypes.object.isRequired,
};

export default RejectionMessage;
