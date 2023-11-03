import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ChangePassword } from '../../../api/authenticationApi';
import ChangePasswordForm from './ChangePasswordForm';
import { useHistory } from 'react-router-dom';

const ChangePasswordPage = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    currentPassword: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { currentPassword, password, password_confirmation } = user;
    const errors = {};
    if (!currentPassword)
      errors.currentPassword = 'Current password is required';
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
    ChangePassword(user)
      .then(() => {
        toast.success('Successfully changed password');
        history.push('/');
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
    <div className='head-office-register-form'>
      <ChangePasswordForm
        user={user}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

export default ChangePasswordPage;
