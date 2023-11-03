import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../FormComponents/TextInput';
import { Link } from 'react-router-dom';
import { editUser } from '../../../../api/usersApi';
import { toast } from 'react-toastify';

const UserEditForm = ({ user, onUserUpdated }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { firstName, lastName } = editedUser;
    const errors = {};
    if (!firstName) errors.firstName = 'First Name is required';
    if (!lastName) errors.lastName = 'Last Name is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    editUser(user.id, editedUser)
      .then((response) => {
        toast.success('Successfully updated user');
        onUserUpdated();
        setSaving(false);
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

    for (const [key, value] of Object.entries(error.data.errors)) {
      errorText = `${errorText} ${value}`;
    }

    return errorText;
  }

  return (
    <form className='' onSubmit={handleSave}>
      <div className='my-8'>
        <div className='my-2 card shadow-md rounded-md'>
          <div className='bg-primary rounded-t-md'>
            <p className='text-white font-bold text-lg px-2 py-1'>Edit user</p>
          </div>
          <div className='p-2'>
            {errors.onSave && (
              <div className='text-red-500 text-xs p-1' role='alert'>
                {errors.onSave}
              </div>
            )}

            <div className='mb-6'>
              <TextInput
                name='firstName'
                label='First Name'
                value={editedUser.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
            </div>
            <div className='mb-6'>
              <TextInput
                name='lastName'
                label='Last Name'
                value={editedUser.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={saving}
                className='bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center'
              >
                <svg
                  className='text-white h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
                <span>{saving ? 'Updating...' : 'Update'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

UserEditForm.propTypes = {
  user: PropTypes.object.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
};

export default UserEditForm;
