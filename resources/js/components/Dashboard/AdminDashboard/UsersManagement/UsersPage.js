import React, { useEffect, useState } from 'react';
import { searchUsers, searchUsersWithPage } from '../../../../api/usersApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import UsersListWithPagination from '../../../DisplayComponents/UsersListWithPagination';
import _, { debounce } from 'lodash';
import UserSearchForm from '../../../DisplayComponents/UsersSearchForm';

const UsersPage = () => {
  const [usersPaginator, setUsersPaginator] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    firstName: '',
    lastName: '',
    role: null,
  });

  useEffect(() => {
    if (!usersPaginator) {
      search();
    }
  }, [usersPaginator]);

  useEffect(() => {
    let debounced = debounce(() => {
      search();
    }, 50);

    debounced();
  }, [searchTerms]);

  function search() {
    searchUsers(searchTerms)
      .then((usersData) => {
        setUsersPaginator(usersData);
      })
      .catch((error) => {
        toast.error('Error getting users ' + error.message, {
          autoClose: false,
        });
      });
  }

  function getUsersPage(url) {
    searchUsersWithPage(url, searchTerms)
      .then((usersData) => {
        setUsersPaginator(usersData);
      })
      .catch((error) => {
        toast.error('Error getting users ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleSearchTermsChange(event) {
    const { name, value } = event.target;

    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: name == 'role' ? Number(value) : value,
    }));
  }

  return (
    <div className='users-admin-page'>
      <div className='col-span-12'>
        {!usersPaginator ? (
          <LoadingMessage message={'Loading users'} />
        ) : (
          <>
            <UserSearchForm
              searchTerms={searchTerms}
              onSearchTermsChange={handleSearchTermsChange}
            />
            <div className='my-4'>
              <div className='my-2 card shadow-md rounded-md'>
                <div className='bg-primary rounded-t-md'>
                  <p className='text-white font-bold text-lg px-2 py-1'>
                    Users
                  </p>
                </div>
                <div>
                  {usersPaginator.total > 0 ? (
                    <UsersListWithPagination
                      paginationData={usersPaginator}
                      onPageChange={getUsersPage}
                    />
                  ) : (
                    <p className='text-center'>
                      There are currently no users added that match your search.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
