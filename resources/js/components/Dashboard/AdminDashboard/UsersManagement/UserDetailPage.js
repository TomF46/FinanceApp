import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import { getUserById } from '../../../../api/usersApi';
import { useParams } from 'react-router-dom';

const UserDetailPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [userId, user]);

  function getUser() {
    getUserById(userId)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        toast.error('Error getting user ' + error.message, {
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

          <div className='my-8'>
            <div className='my-2 card shadow-md rounded-md'>
              <div className='bg-primary rounded-t-md'>
                <p className='text-white font-bold text-lg px-2 py-1'>
                  {user.fullName} Info
                </p>
              </div>
              <div className='px-2 py-1'>
                <p>
                  <span className='font-bold'>First name:</span>{' '}
                  {user.firstName}
                </p>
                <p>
                  <span className='font-bold'>Last name:</span> {user.lastName}
                </p>
                <p>
                  <span className='font-bold'>Email:</span> {user.email}
                </p>
                <p>
                  <span className='font-bold'>Role:</span> {user.roleTitle}
                </p>
                {user.areasManaged.length > 0 && (
                  <>
                    <p className='font-bold'>{`Area${
                      user.areasManaged.length > 1 ? 's' : ''
                    } managed:`}</p>
                    {user.areasManaged.map((area) => {
                      return <p key={area.id}>{area.name}</p>;
                    })}
                  </>
                )}
                {user.retailLocationsManaged.length > 0 && (
                  <>
                    <p className='font-bold'>{`Retail location${
                      user.retailLocationsManaged.length > 1 ? 's' : ''
                    } managed:`}</p>
                    {user.retailLocationsManaged.map((location) => {
                      return (
                        <p key={location.id}>
                          {location.name} ({location.area})
                        </p>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='my-4 card shadow-md rounded-md'>
            <div className='bg-secondary rounded-t-md'>
              <p className='text-white font-bold text-lg px-2 py-1'>Actions</p>
            </div>
            <div className='px-2 py-4'>
              <Link
                to={`/admin/users/${user.id}/manage`}
                className='bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer'
              >
                Manage
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailPage;
