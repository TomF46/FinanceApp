import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { addAreaManager } from '../../../../../api/areasApi';
import { getAreaManagers } from '../../../../../api/usersApi';
import SelectInput from '../../../../FormComponents/SelectInput';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';

const AddAreaManagerForm = ({ area, onManagerAdded }) => {
  const [manager, setManager] = useState({
    user_id: null,
  });
  const [managers, setManagers] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!managers) {
      getAreaManagers().then((managerData) => {
        setManagers(managerData);
      });
    }
  }, [managers]);

  function handleChange(event) {
    const { name, value } = event.target;
    setManager((prevManager) => ({
      ...prevManager,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { user_id } = manager;
    const errors = {};
    if (!user_id) errors.user_id = 'Manager is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    addAreaManager(area, manager)
      .then(() => {
        toast.success('Successfully added area manager');
        setSaving(false);
        setManager({
          user_id: null,
        });
        onManagerAdded();
      })
      .catch((err) => {
        setSaving(false);
        toast.error(formatErrorText(err), {
          autoClose: false,
        });
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
    <div className='add-area-manager-form'>
      {managers ? (
        <>
          {managers.length > 0 ? (
            <form className='' onSubmit={handleSave}>
              {errors.onSave && (
                <div className='text-red-500 text-xs p-1' role='alert'>
                  {errors.onSave}
                </div>
              )}
              <div className='mb-6'>
                <SelectInput
                  name='user_id'
                  label='Manager'
                  value={manager.user_id}
                  options={managers}
                  onChange={handleChange}
                  error={errors.user_id}
                />
              </div>

              {manager.user_id && (
                <div className='flex justify-center'>
                  <button
                    type='submit'
                    disabled={saving}
                    className='bg-primary text-white rounded py-2 px-4 hover:opacity-75'
                  >
                    {saving ? 'Adding...' : 'Add'}
                  </button>
                </div>
              )}
            </form>
          ) : (
            <p className='text-center p-4'>
              There are currently no area managers registered, please add one to
              be able to assign a manager.
            </p>
          )}
        </>
      ) : (
        <LoadingMessage message={'Loading area managers'} />
      )}
    </div>
  );
};

AddAreaManagerForm.propTypes = {
  area: PropTypes.object.isRequired,
  onManagerAdded: PropTypes.func.isRequired,
};

export default AddAreaManagerForm;
