import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RetailLocationManageForm from './RetailLocationManageForm';
import {
  editRetailLocation,
  getRetailLocationById,
} from '../../../../../api/retailLocationsApi';
import { getAreas } from '../../../../../api/areasApi';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';
import { useParams, useHistory } from 'react-router-dom';

const RetailLocationEditPage = () => {
  const { retailLocationId } = useParams();
  const history = useHistory();
  const [retailLocation, setRetailLocation] = useState(null);
  const [areas, setAreas] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getRetailLocationById(retailLocationId)
      .then((retailLocationData) => {
        retailLocationData.area_id = retailLocationData.areaId;
        setRetailLocation(retailLocationData);
      })
      .catch((error) => {
        toast.error('Error getting retail location ' + error.message, {
          autoClose: false,
        });
      });
  }, [retailLocationId]);

  useEffect(() => {
    if (!areas) {
      getAreas().then((areaData) => {
        setAreas(areaData);
      });
    }
  }, [areas]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRetailLocation((prevRetailLocation) => ({
      ...prevRetailLocation,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = retailLocation;
    const errors = {};
    if (!name) errors.name = 'Name is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    editRetailLocation(retailLocation.id, retailLocation)
      .then(() => {
        toast.success('Retail Location updated');
        history.push(`/admin/locations/retail/${retailLocation.id}`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(formatErrorText(err), {
          autoClose: false,
        });
        let tempErrors = { ...errors };
        tempErrors.onSave = err.message;
        setErrors({ ...tempErrors });
      });
  }

  function formatErrorText(error) {
    let errorText = '';

    for (const [value] of Object.entries(error.data.errors)) {
      errorText = `${errorText} ${value}`;
    }

    return errorText;
  }

  return (
    <div className='retailLocation-edit-form'>
      {!retailLocation && !areas ? (
        <LoadingMessage message={'Loading RetailLocation'} />
      ) : (
        <RetailLocationManageForm
          retailLocation={retailLocation}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
          areas={areas}
        />
      )}
    </div>
  );
};

export default RetailLocationEditPage;
