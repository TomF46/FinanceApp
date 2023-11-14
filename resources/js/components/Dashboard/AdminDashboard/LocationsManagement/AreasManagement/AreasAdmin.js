import React, { useCallback, useEffect, useState } from 'react';
import { searchAreas, searchAreasWithPage } from '../../../../../api/areasApi';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../../DisplayComponents/LoadingMessage';
import AreasListWithPagination from '../../../../DisplayComponents/AreasListWithPagination';
import debounce from 'lodash/debounce';
import AreaSearchForm from '../../../../DisplayComponents/AreaSearchForm';

const AreasAdmin = () => {
  const [areasPaginator, setAreasPaginator] = useState(null);
  const [searchTerms, setSearchTerms] = useState({ name: '' });

  const search = useCallback(() => {
    searchAreas(searchTerms)
      .then((areasData) => {
        setAreasPaginator(areasData);
      })
      .catch((error) => {
        toast.error('Error getting areas ' + error.message, {
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

  function getAreasPage(url) {
    searchAreasWithPage(url, searchTerms)
      .then((areasData) => {
        setAreasPaginator(areasData);
      })
      .catch((error) => {
        toast.error('Error getting areas ' + error.message, {
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
    <div className='areas-list'>
      <div className='col-span-12'>
        {!areasPaginator ? (
          <LoadingMessage message={'Loading areas'} />
        ) : (
          <>
            <AreaSearchForm
              searchTerms={searchTerms}
              onSearchTermsChange={handleSearchTermsChange}
            />
            <div className='my-4'>
              <div className='my-2 card shadow-md rounded-md'>
                <div className='bg-primary rounded-t-md'>
                  <p className='text-white font-bold text-lg px-2 py-1'>
                    Areas
                  </p>
                </div>
                <div>
                  {areasPaginator.total > 0 ? (
                    <AreasListWithPagination
                      paginationData={areasPaginator}
                      isAdmin={true}
                      onPageChange={getAreasPage}
                    />
                  ) : (
                    <p className='text-center p-4'>
                      There are currently no areas added.
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

export default AreasAdmin;
