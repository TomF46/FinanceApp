import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RegisterHeadOffice } from '../../../../../api/authenticationApi';
import RegisterForm from '../../../../DisplayComponents/RegisterForm';
import { useHistory } from 'react-router-dom';

const HeadOfficeRegisterForm = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
    const { firstName, lastName, email, password, password_confirmation } =
      user;
    const errors = {};
    if (!firstName) errors.firstName = 'First Name is required';
    if (!lastName) errors.lastName = 'Last Name is required';
    if (!email) errors.email = 'Email is required';
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
    RegisterHeadOffice(user)
      .then(() => {
        toast.success('Successfully registered head office user');
        history.push('/admin/users');
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
      <RegisterForm
        user={user}
        headerText={'Register Head Office User'}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

export default HeadOfficeRegisterForm;
