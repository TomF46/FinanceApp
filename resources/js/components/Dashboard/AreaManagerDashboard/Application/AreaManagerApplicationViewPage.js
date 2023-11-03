import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  acceptApplication,
  getApplicationById,
  rejectApplication,
} from '../../../../api/applicationsApi';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import ApplicationReadOnly from '../../../DisplayComponents/ApplicationReadOnly';
import AreaManagerApplicationControls from './AreaManagerApplicationControls';
import ApplicationSummary from '../../../DisplayComponents/ApplicationSummary';
import { confirm } from '../../../../tools/PopupHelper';
import { useParams } from 'react-router-dom';

const AreaManagerApplicationViewPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [rejectionMessage, setRejectionMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!application) {
      getApplication();
    }
  }, [applicationId, application]);

  function getApplication() {
    getApplicationById(applicationId)
      .then((applicationData) => {
        setApplication(applicationData);
      })
      .catch((error) => {
        toast.error('Error getting retail location ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleAccept() {
    confirm(
      'Confirm acceptence',
      `Are you sure you want to accept this application?`,
      accept,
    );
  }

  function accept() {
    acceptApplication(application)
      .then(() => {
        toast.success('Application accepted');
        getApplication();
      })
      .catch((error) => {
        toast.error('Error accepting application ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleReject(event) {
    event.preventDefault();
    confirm(
      'Confirm rejection',
      `Are you sure you want to reject this application?`,
      reject,
    );
  }

  function reject() {
    if (!messageIsValid()) return;
    setSaving(true);

    rejectApplication(application, { message: rejectionMessage })
      .then(() => {
        toast.success('Application rejected');
        getApplication();
      })
      .catch((error) => {
        toast.error('Error rejecting application ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleRejectionMessageChange(event) {
    const { value } = event.target;
    setRejectionMessage(value);
  }

  function messageIsValid() {
    const errors = {};
    if (!rejectionMessage) errors.message = 'Message is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div className='pb-8'>
      {application ? (
        <>
          {application.status == '0' && (
            <ApplicationSummary application={application} />
          )}
          {application.status == '1' && (
            <>
              <ApplicationReadOnly application={application} />
              <AreaManagerApplicationControls
                onAccept={handleAccept}
                onReject={handleReject}
                rejectionMessage={rejectionMessage}
                onChange={handleRejectionMessageChange}
                errors={errors}
                saving={saving}
              />
            </>
          )}
          {(application.status == '2' || application.status == '3') && (
            <>
              <ApplicationReadOnly application={application} />
              <ApplicationSummary
                application={application}
                isRetailer={false}
              />
            </>
          )}
        </>
      ) : (
        <LoadingMessage message={'Loading Application'} />
      )}
    </div>
  );
};

export default AreaManagerApplicationViewPage;
