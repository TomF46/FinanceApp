import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getApplicationById,
  submitApplication,
} from '../../../../api/applicationsApi';
import LoadingMessage from '../../../DisplayComponents/LoadingMessage';
import ApplicationForm from './Form/ApplicationForm';
import { blankIncome, blankExpenses } from '../../../../applicationShape';
import { getAllProducts } from '../../../../api/productsApi';
import ApplicationReadOnly from '../../../DisplayComponents/ApplicationReadOnly';
import ApplicationSummary from '../../../DisplayComponents/ApplicationSummary';
import * as ApplicationService from '../../../../tools/ApplicationService';
import { confirm } from '../../../../tools/PopupHelper';
import { useParams } from 'react-router-dom';

const ApplicationPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [applicationRestarted, setApplicationRestarted] = useState(false);
  const [income, setIncome] = useState(null);
  const [incomeErrors, setIncomeErrors] = useState({});
  const [expenses, setExpenses] = useState(null);
  const [expensesErrors, setExpensesErrors] = useState({});
  const [sales, setSales] = useState(null);
  const [salesErrors, setSalesErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!application) {
      getApplication();
    }
  }, [applicationId, application]);

  function getApplication() {
    getApplicationById(applicationId)
      .then((applicationData) => {
        setApplication(applicationData);
        if (applicationData.status == 0) {
          createBlankApplication();
        } else {
          createPrePopulatedApplication(applicationData);
        }
      })
      .catch((error) => {
        toast.error('Error getting application ' + error.message, {
          autoClose: false,
        });
      });
  }

  function createBlankApplication() {
    setIncome({ ...blankIncome });
    setExpenses({ ...blankExpenses });
    getSalesProducts();
  }

  function createPrePopulatedApplication(application) {
    setIncome(application.incomeRecord);
    setExpenses(application.expensesRecord);
    setSales(application.sales);
  }

  function restartApplication() {
    let recordsWithoutIds = ApplicationService.stripRecordsIdsForRestart(
      { ...income },
      { ...expenses },
    );
    setIncome(recordsWithoutIds.income);
    setExpenses(recordsWithoutIds.expenses);
    mapSalesForForm();
    setApplicationRestarted(true);
  }

  function mapSalesForForm() {
    setSales(ApplicationService.mapSales(sales));
  }

  function getSalesProducts() {
    getAllProducts()
      .then((productData) => {
        setSales(ApplicationService.mapProductsForApplication(productData));
      })
      .catch((error) => {
        toast.error('Error getting products ' + error.message, {
          autoClose: false,
        });
      });
  }

  function handleIncomeChange(event) {
    const { name, value } = event.target;
    if (!ApplicationService.isValidMoney(value)) return;

    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  }

  function handleExpensesChange(event) {
    const { name, value } = event.target;
    if (!ApplicationService.isValidMoney(value)) return;

    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [name]: value,
    }));
  }

  function handleSalesChange(event) {
    const { name, value } = event.target;
    if (!ApplicationService.isValidMoney(value)) return;

    let copy = [...sales];
    copy[name].quantity = Math.trunc(value);
    setSales(copy);
  }

  function formIsValid() {
    const incomeErrors = ApplicationService.checkIncomeIsValid(income);
    setIncomeErrors(incomeErrors);
    const expensesErrors = ApplicationService.checkExpensesIsValid(expenses);
    setExpensesErrors(expensesErrors);
    let totalErrors =
      Object.keys(incomeErrors).length +
      Object.keys(expensesErrors).length +
      Object.keys(salesErrors).length;
    return totalErrors === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    confirm(
      'Confirm submission?',
      'Please ensure you have checked your figures before submitting',
      save,
    );
  }

  function save() {
    if (!formIsValid()) return;
    setSaving(true);

    submitApplication(
      ApplicationService.mapCreatePayload(application, income, expenses, sales),
    )
      .then(() => {
        toast.success('Application submitted');
        setApplicationRestarted(false);
        getApplication();
      })
      .catch((err) => {
        setSaving(false);
        toast.error('Error submitting application', {
          autoClose: false,
        });
        let tempErrors = { ...errors };
        tempErrors.onSave = err.message;
        setErrors({ ...tempErrors });
      });
  }

  return (
    <>
      {application && income && expenses && sales ? (
        <>
          {(application.status == '0' || applicationRestarted) && (
            <ApplicationForm
              application={application}
              income={income}
              expenses={expenses}
              sales={sales}
              onIncomeChange={handleIncomeChange}
              onExpensesChange={handleExpensesChange}
              onSalesChange={handleSalesChange}
              onSave={handleSave}
              errors={errors}
              incomeErrors={incomeErrors}
              expensesErrors={expensesErrors}
              salesErrors={salesErrors}
              saving={saving}
            />
          )}
          {application.status != '0' && !applicationRestarted && (
            <>
              <ApplicationReadOnly application={application} />
              <ApplicationSummary
                application={application}
                isRetailer={true}
                onRestartApplication={restartApplication}
              />
            </>
          )}
        </>
      ) : (
        <LoadingMessage message={'Loading Application'} />
      )}
    </>
  );
};

export default ApplicationPage;
