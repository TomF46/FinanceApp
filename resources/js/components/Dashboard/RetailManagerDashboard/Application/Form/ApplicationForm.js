import React from 'react';
import PropTypes from 'prop-types';
import IncomeSection from './IncomeSection';
import ExpensesSection from './ExpensesSection';
import SalesSection from './SalesSection';

const ApplicationForm = ({
  application,
  income,
  expenses,
  sales,
  onSave,
  onIncomeChange,
  onExpensesChange,
  onSalesChange,
  saving = false,
  errors = {},
  incomeErrors,
  expensesErrors,
  salesErrors,
}) => {
  return (
    <form className='' onSubmit={onSave}>
      <h2 className='font-bold text-2xl mb-4 text-center'>
        {application.retailLocationName} {application.year.year} Application
      </h2>
      {errors.onSave && (
        <div className='text-red-500 text-xs p-1' role='alert'>
          {errors.onSave}
        </div>
      )}

      <IncomeSection
        income={income}
        onIncomeChange={onIncomeChange}
        incomeErrors={incomeErrors}
      />

      <SalesSection
        sales={sales}
        onChange={onSalesChange}
        errors={salesErrors}
      />

      <ExpensesSection
        expenses={expenses}
        onExpensesChange={onExpensesChange}
        expensesErrors={expensesErrors}
      />

      <div className='my-4 card shadow-md rounded-md'>
        <div className='bg-secondary rounded-t-md'>
          <p className='text-white font-bold text-lg px-2 py-1'>Actions</p>
        </div>
        <div className='px-2 py-4 flex justify-center'>
          <button
            type='submit'
            disabled={saving}
            className='bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer'
          >
            {saving ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

ApplicationForm.propTypes = {
  application: PropTypes.object.isRequired,
  income: PropTypes.object.isRequired,
  expenses: PropTypes.object.isRequired,
  sales: PropTypes.array.isRequired,
  errors: PropTypes.object,
  incomeErrors: PropTypes.object,
  expensesErrors: PropTypes.object,
  salesErrors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onIncomeChange: PropTypes.func.isRequired,
  onExpensesChange: PropTypes.func.isRequired,
  onSalesChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ApplicationForm;
