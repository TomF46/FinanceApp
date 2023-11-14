import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAreaManagerById } from '../../../api/usersApi';
import LoadingMessage from '../../DisplayComponents/LoadingMessage';
import { toast } from 'react-toastify';
import AreaApplicationsList from '../../DisplayComponents/AreaApplicationList';
import AreasList from '../../DisplayComponents/AreasList';

const AreaManagerDashboard = ({ user }) => {
  const [areaManager, setAreaManager] = useState(null);

  useEffect(() => {
    getAreaManagerById(user.id)
      .then((areaManagerData) => {
        setAreaManager(areaManagerData);
      })
      .catch((error) => {
        toast.error('Error getting area manager data ' + error.message, {
          autoClose: false,
        });
      });
  }, [user]);

  function getApplicationsRequireAttention(applications) {
    return applications.returned.concat(applications.notSubmitted);
  }

  return (
    <div className='area-manager-dashboard'>
      <div className='grid grid-cols-12 pb-4'>
        <div className='col-span-12 lg:col-span-3 lg:mr-4 mb-4 lg:mb-0 px-4 overflow-hidden shadow-md rounded-md page'>
          <h2 className='font-bold text-xl py-4 border-b lg:border-none text-center'>
            Dashboard
          </h2>
          <p className='my-2'>
            This is your dashboard, where you can manage your areas and their
            retail locations applications.
          </p>
        </div>
        <div className='col-span-12 lg:col-span-9'>
          {!areaManager ? (
            <LoadingMessage message={'Loading dashboard'} />
          ) : (
            <>
              <div className='mb-4'>
                <div className='card shadow-md rounded-md'>
                  <div className='bg-primary rounded-t-md'>
                    <p className='text-white font-bold text-lg px-2 py-1'>
                      My Areas Managed
                    </p>
                  </div>
                  <div>
                    {areaManager.areasManaged.length > 0 ? (
                      <AreasList
                        areas={areaManager.areasManaged}
                        isAdmin={false}
                      />
                    ) : (
                      <p className='text-center p-4'>
                        You do not currently manage any areas.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className='card shadow-md rounded-md mb-4'>
                  <div className='bg-primary rounded-t-md'>
                    <p className='text-white font-bold text-lg px-2 py-1'>
                      Applications Requiring Attention
                    </p>
                  </div>
                  <div>
                    {areaManager.applications.submitted.length > 0 ? (
                      <AreaApplicationsList
                        applications={areaManager.applications.submitted}
                      />
                    ) : (
                      <p className='text-center p-4'>
                        You do not currently have any applications awaiting sign
                        off.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className='card shadow-md rounded-md mb-4'>
                  <div className='bg-primary rounded-t-md'>
                    <p className='text-white font-bold text-lg px-2 py-1'>
                      Applications Awaiting Retail Manager Response
                    </p>
                  </div>
                  <div>
                    {areaManager.applications.notSubmitted.length +
                      areaManager.applications.returned.length >
                    0 ? (
                      <AreaApplicationsList
                        applications={getApplicationsRequireAttention(
                          areaManager.applications,
                        )}
                      />
                    ) : (
                      <p className='text-center p-4'>
                        You do not currently have any applications that require
                        attention from retailers.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className='card shadow-md rounded-md'>
                  <div className='bg-primary rounded-t-md'>
                    <p className='text-white font-bold text-lg px-2 py-1'>
                      My Finished Applications
                    </p>
                  </div>
                  <div>
                    {areaManager.applications.accepted.length > 0 ? (
                      <AreaApplicationsList
                        applications={areaManager.applications.accepted}
                      />
                    ) : (
                      <p className='text-center p-4'>
                        You do not currently have any applications.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

AreaManagerDashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AreaManagerDashboard;
