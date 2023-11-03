import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  deactivateRetailLocationById,
  getRetailLocationById,
  removeRetailManager,
} from '../../../../../api/retailLocationsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';
import ManagersList from '../../../../DisplayComponents/ManagersList';
import AddRetailManagerForm from './AddRetailManagerForm';
import { confirm } from '../../../../../tools/PopupHelper';

const RetailLocationAdminPage = () => {
  const { retailLocationId } = useParams();
  const history = useHistory();
  const [retailLocation, setRetailLocation] = useState(null);
  useEffect(() => {
    if (!retailLocation) {
      getRetailLocation();
    }
  }, [retailLocationId, retailLocation]);

  function getRetailLocation() {
    getRetailLocationById(retailLocationId)
      .then((retailLocationData) => {
        setRetailLocation(retailLocationData);
      })
      .catch((error) => {
        toast.error('Error getting retail location ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleManagerAdded() {
    getRetailLocation();
  }

  function handleManagerRemove(id) {
    confirm(
      'Confirm removal',
      `Are you sure you want to remove this manager?`,
      () => {
        removeManager(id);
      },
    );
  }

  function removeManager(id) {
    removeRetailManager(retailLocation, id)
      .then((response) => {
        toast.success('Manager removed.');
        getRetailLocation();
      })
      .catch((error) => {
        toast.error('Unable to remove manager ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleDeactivate() {
    confirm(
      'Confirm deactivation',
      `Are you sure you want to deactivate this location?`,
      deactivate,
    );
  }

  function deactivate() {
    deactivateRetailLocationById(retailLocationId)
      .then((response) => {
        toast.success('Retail location deactivated');
        history.push('/admin/locations');
      })
      .catch((error) => {
        toast.error('Error deactivating retail location ' + error.message, {
          autoClose: false,
        });
      });
  }

  return (
    <>
      {!retailLocation ? (
        <LoadingMessage message={'Loading Retail Location'} />
      ) : (
        <>
          <h1 className='text-center font-bold text-4xl'>
            {retailLocation.name}
          </h1>
          <div className='my-8'>
            <div className='my-2 card shadow-md rounded-md'>
              <div className='bg-primary rounded-t-md'>
                <p className='text-white font-bold text-lg px-2 py-1'>
                  Managers
                </p>
              </div>
              <div>
                <ManagersList
                  managers={retailLocation.managers}
                  onManagerRemove={handleManagerRemove}
                />
              </div>
            </div>
          </div>
          <div className='my-8'>
            <div className='my-2 card shadow-md rounded-md'>
              <div className='bg-primary rounded-t-md'>
                <p className='text-white font-bold text-lg px-2 py-1'>
                  Add Manager
                </p>
              </div>
              <div className='p-2'>
                <AddRetailManagerForm
                  retailLocation={retailLocation}
                  onManagerAdded={handleManagerAdded}
                />
              </div>
            </div>
          </div>
          <div className='my-4 card shadow-md rounded-md'>
            <div className='bg-secondary rounded-t-md'>
              <p className='text-white font-bold text-lg px-2 py-1'>Actions</p>
            </div>
            <div className='px-2 py-2 flex justify-between'>
              <Link
                to={`/admin/locations/retail/${retailLocation.id}/edit`}
                className='bg-secondary text-white rounded py-2 px-4 hover:opacity-75 shadow'
              >
                Edit Location
              </Link>
              <button
                onClick={() => handleDeactivate()}
                className='bg-danger text-white rounded py-2 px-4 hover:opacity-75 shadow'
              >
                Deactivate
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RetailLocationAdminPage;
