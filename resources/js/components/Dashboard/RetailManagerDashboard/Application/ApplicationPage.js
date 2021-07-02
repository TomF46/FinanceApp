import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getApplicationById, submitApplication } from "../../../../api/applicationsApi";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import ApplicationForm from "./Form/ApplicationForm";
import { blankIncome, blankExpenses } from "../../../../applicationShape";
import { getAllProducts } from "../../../../api/productsApi";
import ApplicationReadOnly from "../../../DisplayComponents/ApplicationReadOnly";
import RejectionMessage from "../../../DisplayComponents/RejectionMessage";
import ApplicationStatusSummary from "../../../DisplayComponents/ApplicationStatusSummary";


const ApplicationPage = ({ applicationId }) => {
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
    }, [applicationId, application])

    function getApplication() {
        getApplicationById(applicationId).then(applicationData => {
            setApplication(applicationData);
            if (applicationData.status == 0) {
                setIncome({ ...blankIncome });
                setExpenses({ ...blankExpenses });
                getSalesProducts();
            } else {
                setIncome(applicationData.incomeRecord);
                setExpenses(applicationData.expensesRecord);
                setSales(applicationData.sales);
            }
        }).catch(error => {
            toast.error("Error getting retail location " + error.message, {
                autoClose: false,
            });
        });
    }

    function restartApplication() {
        let incomeWithoutId = { ...income };
        delete incomeWithoutId.id;
        let expensesWithoutId = { ...expenses };
        delete expensesWithoutId.id;
        setIncome(incomeWithoutId);
        setExpenses(expensesWithoutId);
        getSalesProducts();
        setApplicationRestarted(true);
    }
    function getSalesProducts() {
        let productSales = [];
        getAllProducts().then(productData => {
            productData.forEach(product => {
                product.quantity = null;
                productSales.push(product);
                return sales;
            });
            setSales(productSales);
        }).catch(error => {
            toast.error("Error getting products" + error.message, {
                autoClose: false,
            });
        });
    }

    function handleIncomeChange(event) {
        const { name, value } = event.target;

        if (!isValidMoney(value)) return;

        setIncome(prevIncome => ({
            ...prevIncome,
            [name]: value
        }));
    }

    function handleExpensesChange(event) {
        const { name, value } = event.target;

        if (!isValidMoney(value)) return;

        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [name]: value
        }));
    }

    function handleSalesChange(event) {
        const { name, value } = event.target;

        if (!isValidMoney(value)) return;

        let copy = [...sales];
        copy[name].quantity = Math.trunc(value);
        setSales(copy);
    }

    function formIsValid() {
        const incomeErrors = checkIncomeIsValid();
        const expensesErrors = checkExpensesIsValid();
        let totalErrors = Object.keys(incomeErrors).length + Object.keys(expensesErrors).length + Object.keys(salesErrors).length;
        return totalErrors === 0;
    }

    function checkIncomeIsValid() {
        const { dividends, assetSales, maintenanceGrant, sponsorship, rewards } = income;
        const errors = {};
        if (!dividends || dividends < 0) errors.dividends = "Dividends entry is invalid";
        if (!assetSales || assetSales < 0) errors.assetSales = "Asset sales entry is invalid";
        if (!maintenanceGrant || maintenanceGrant < 0) errors.maintenanceGrant = "Maintenance grant entry is invalid";
        if (!sponsorship || sponsorship < 0) errors.sponsorship = "Sponsorship entry is invalid";
        if (!rewards || rewards < 0) errors.rewards = "Rewards entry is invalid";
        setIncomeErrors(errors);
        return errors;
    }

    function checkExpensesIsValid() {
        const { rent, payroll, utilities, equipment, travel, training, maintenance, employeeBonus, employeeExpenses } = expenses;
        const errors = {};
        if (!rent || rent < 0) errors.rent = "Rent entry is invalid";
        if (!payroll || payroll < 0) errors.payroll = "Payroll entry is invalid";
        if (!utilities || utilities < 0) errors.utilities = "Utilities entry is invalid";
        if (!equipment || equipment < 0) errors.equipment = "Equipment entry is invalid";
        if (!travel || travel < 0) errors.travel = "Travel entry is invalid";
        if (!training || training < 0) errors.training = "Training entry is invalid";
        if (!maintenance || maintenance < 0) errors.maintenance = "Maintenance entry is invalid";
        if (!employeeBonus || employeeBonus < 0) errors.employeeBonus = "Employee bonus entry is invalid";
        if (!employeeExpenses || employeeExpenses < 0) errors.employeeExpenses = "Employee expenses entry is invalid";
        setExpensesErrors(errors);
        return errors;
    }

    function isValidMoney(value) {
        let $decimals = 0;
        if ((value % 1) != 0)
            $decimals = value.toString().split(".")[1].length;

        return $decimals <= 2
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        let payload = {
            applicationId: application.id,
            income: income,
            expenses: expenses,
            sales: sales
        };
        submitApplication(payload).then(res => {
            toast.success("Application submitted");
            setApplicationRestarted(false);
            getApplication();
        }).catch(err => {
            setSaving(false);
            console.log(err);
            toast.error("Error creating product", {
                autoClose: false
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
                    {(application.status == "0" || applicationRestarted) &&
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
                            saving={saving} />
                    }
                    {(application.status == "2" && !applicationRestarted) &&
                        <>
                            <ApplicationReadOnly application={application} />
                            <ApplicationStatusSummary application={application} />
                            <button onClick={() => { restartApplication() }} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer float-right">Restart application</button>
                        </>
                    }
                    {(application.status == "1" || application.status == "3") &&
                        <>
                            <ApplicationReadOnly application={application} />
                            <ApplicationStatusSummary application={application} />
                        </>
                    }
                </>
            ) : (
                <LoadingMessage message={"Loading Application"} />
            )}
        </>
    )
};

ApplicationPage.propTypes = {
    applicationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        applicationId: ownProps.match.params.applicationId,
    };
};


export default connect(mapStateToProps)(ApplicationPage);
