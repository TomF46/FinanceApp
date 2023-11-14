import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import { deactivateUserById, getUserById } from '../../../../api/usersApi';
import UserEditForm from './UserEditForm';
import UserPasswordChangeForm from './UserPasswordChangeForm';
import { confirm } from '../../../../tools/PopupHelper';
import { useParams, useHistory } from 'react-router-dom';

const UserManagePage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);

  const getUser = useCallback(() => {
    getUserById(userId)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        toast.error('Error getting user ' + error.message, {
          autoClose: false,
        });
      });
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [userId, getUser]);

  function handleDeactivate() {
    confirm(
      'Confirm deactivation',
      `Are you sure you want to deactivate this user?`,
      deactivate,
    );
  }

  function deactivate() {
    deactivateUserById(userId)
      .then(() => {
        toast.success('User deactivated');
        history.push('/admin/users');
      })
      .catch((error) => {
        toast.error('Error deactivating user ' + error.message, {
          autoClose: false,
        });
      });
  }

  return (
    <>
      {!user ? (
        <LoadingMessage message={'Loading User'} />
      ) : (
        <>
          <h1 className='text-center font-bold text-4xl'>{user.fullName}</h1>

          <div className='my-4'>
            <UserEditForm user={user} onUserUpdated={getUser} />
          </div>

          <div className='my-4'>
            <UserPasswordChangeForm user={user} onUserUpdated={getUser} />
          </div>

          <div className='my-4 card shadow-md rounded-md'>
            <div className='bg-secondary rounded-t-md'>
              <p className='text-white font-bold text-lg px-2 py-1'>Actions</p>
            </div>
            <div className='px-2 py-2 flex justify-end'>
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

export default UserManagePage;
