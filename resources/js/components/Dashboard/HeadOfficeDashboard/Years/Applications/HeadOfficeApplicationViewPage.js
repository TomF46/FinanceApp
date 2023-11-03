import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import HeadOfficePriorityControls from './HeadOfficePriorityControls';
import { getApplicationById } from '../../../../../api/applicationsApi';
import ApplicationSummary from '../../../../DisplayComponents/ApplicationSummary';
import ApplicationReadOnly from '../../../../DisplayComponents/ApplicationReadOnly';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';

const HeadOfficeApplicationViewPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);

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
          {application.status != 3 && (
            <HeadOfficePriorityControls
              application={application}
              onPriorityUpdated={() => getApplication()}
            />
          )}
        </>
      ) : (
        <LoadingMessage message={'Loading Application'} />
      )}
    </div>
  );
};

export default HeadOfficeApplicationViewPage;
