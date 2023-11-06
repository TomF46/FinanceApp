import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAreas } from '../../../../../api/areasApi';
import SelectInput from '../../../../FormComponents/SelectInput';

const ApplicationsSearch = ({ filters, onUpdateFilters }) => {
  const [areas, setAreas] = useState(null);

  const prioritOptions = [
    { text: 'Low', value: 0 },
    { text: 'Medium', value: 1 },
    { text: 'High', value: 2 },
    { text: 'Severe', value: 3 },
  ];

  const statusOptions = [
    { text: 'Not submitted', value: 0 },
    { text: 'Submitted', value: 1 },
    { text: 'Returned', value: 2 },
    { text: 'Accepted', value: 3 },
    { text: 'Inactive', value: 4 },
  ];

  useEffect(() => {
    getAreas().then((data) => {
      setAreas(data);
    });
  }, []);

  function onChange(event) {
    const { name, value } = event.target;
    let input = value;

    input = value == 'All' ? null : Number(input);

    let copy = structuredClone(filters);
    onUpdateFilters({ ...copy, [name]: input });
  }

  return (
    <div className='my-4 card shadow-md rounded-md'>
      <div className='bg-secondary rounded-t-md'>
        <p className='text-white font-bold text-lg px-2 py-1'>Search</p>
      </div>
      <div className='px-2 py-4 flex'>
        {areas && (
          <div>
            <SelectInput
              name='area'
              label='Area'
              value={filters.area}
              defaultOption={'All'}
              options={areas}
              onChange={onChange}
            />
          </div>
        )}
        <div className='mx-2'>
          <SelectInput
            name='status'
            label='Status'
            value={filters.status}
            defaultOption={'All'}
            options={statusOptions}
            onChange={onChange}
          />
        </div>
        <div>
          <SelectInput
            name='priority'
            label='Priority'
            value={filters.priority}
            defaultOption={'All'}
            options={prioritOptions}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

ApplicationsSearch.propTypes = {
  filters: PropTypes.object.isRequired,
  onUpdateFilters: PropTypes.func.isRequired,
};

export default ApplicationsSearch;
