import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import PasswordInput from '../../../FormComponents/PasswordInput';
import { changeUserPassword } from '../../../../api/usersApi';

const UserPasswordChangeForm = ({ user }) => {
  const [userPassword, setUserPassword] = useState({
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserPassword((prevUserPassword) => ({
      ...prevUserPassword,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { password, password_confirmation } = userPassword;
    const errors = {};
    if (!password) errors.password = 'Password is required';
    if (!password_confirmation)
      errors.password_confirmation = 'Confirmation is required';
    if (password_confirmation != password)
      errors.password_confirmation =
        'Password confirmation does not match password';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    changeUserPassword(user.id, userPassword)
      .then(() => {
        toast.success('Successfully changed user password');
        setSaving(false);
        setUserPassword({
          password: '',
          password_confirmation: '',
        });
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
    <form className='' onSubmit={handleSave}>
      <div className='my-8'>
        <div className='my-2 card shadow-md rounded-md'>
          <div className='bg-primary rounded-t-md'>
            <p className='text-white font-bold text-lg px-2 py-1'>
              Change password
            </p>
          </div>
          <div className='p-2'>
            {errors.onSave && (
              <div className='text-red-500 text-xs p-1' role='alert'>
                {errors.onSave}
              </div>
            )}

            <div className='mb-6'>
              <PasswordInput
                name='password'
                label='Password'
                value={userPassword.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>
            <div className='mb-6'>
              <PasswordInput
                name='password_confirmation'
                label='Password confirmation'
                value={userPassword.password_confirmation}
                onChange={handleChange}
                error={errors.password_confirmation}
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
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
                <span>{saving ? 'Changing...' : 'Change'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

UserPasswordChangeForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserPasswordChangeForm;
