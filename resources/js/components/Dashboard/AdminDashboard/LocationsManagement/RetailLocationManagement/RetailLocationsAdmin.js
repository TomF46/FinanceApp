import React, { useCallback, useEffect, useState } from 'react';
import {
  searchRetailLocations,
  searchRetailLocationsWithPage,
} from '../../../../../api/retailLocationsApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';
import RetailLocationsListWithPagination from '../../../../DisplayComponents/RetailLocationsListWithPagination';
import debounce from 'lodash/debounce';
import RetailLocationSearchForm from '../../../../DisplayComponents/RetailLocationSearchForm';

const RetailLocationsAdmin = () => {
  const [retailLocationsPaginator, setRetailLocationsPaginator] =
    useState(null);
  const [searchTerms, setSearchTerms] = useState({ name: '', location: '' });

  const search = useCallback(() => {
    searchRetailLocations(searchTerms)
      .then((retailLocationsData) => {
        setRetailLocationsPaginator(retailLocationsData);
      })
      .catch((error) => {
        toast.error('Error getting retail locations ' + error.message, {
          autoClose: false,
        });
      });
  }, [searchTerms]);

  useEffect(() => {
    let debounced = debounce(() => {
      search();
    }, 50);

    debounced();
  }, [searchTerms, search]);

  function getRetailLocationsPage(url) {
    searchRetailLocationsWithPage(url, searchTerms)
      .then((retailLocationsData) => {
        setRetailLocationsPaginator(retailLocationsData);
      })
      .catch((error) => {
        toast.error('Error getting retail locations ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleSearchTermsChange(event) {
    const { name, value } = event.target;

    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: value,
    }));
  }

  return (
    <div className='retailLocations-list'>
      <div className='col-span-12'>
        {!retailLocationsPaginator ? (
          <LoadingMessage message={'Loading retail locations'} />
        ) : (
          <>
            <RetailLocationSearchForm
              searchTerms={searchTerms}
              onSearchTermsChange={handleSearchTermsChange}
            />
            <div className='my-4'>
              <div className='my-2 card shadow-md rounded-md'>
                <div className='bg-primary rounded-t-md'>
                  <p className='text-white font-bold text-lg px-2 py-1'>
                    Retail Locations
                  </p>
                </div>
                <div>
                  {retailLocationsPaginator.total > 0 ? (
                    <RetailLocationsListWithPagination
                      paginationData={retailLocationsPaginator}
                      onPageChange={getRetailLocationsPage}
                      isAdmin={true}
                    />
                  ) : (
                    <p className='text-center p-4'>
                      There are currently no retail locations added.
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

export default RetailLocationsAdmin;
