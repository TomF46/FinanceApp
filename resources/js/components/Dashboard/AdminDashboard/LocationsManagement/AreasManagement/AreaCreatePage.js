import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AreaManageForm from './AreaManageForm';
import { createArea } from '../../../../../api/areasApi';
import { useHistory } from 'react-router-dom';

const AreaCreatePage = () => {
  const history = useHistory();
  const [area, setArea] = useState({
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setArea((prevArea) => ({
      ...prevArea,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = area;
    const errors = {};
    if (!name) errors.name = 'Name is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    createArea(area)
      .then((response) => {
        toast.success('Area created');
        history.push(`/admin/locations/areas/${response.data.id}`);
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
    <div className='area-create-form'>
      <AreaManageForm
        area={area}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

export default AreaCreatePage;
