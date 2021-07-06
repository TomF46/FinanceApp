import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getApplicationById, submitApplication } from "../../../../api/applicationsApi";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import ApplicationForm from "./Form/ApplicationForm";
import { blankIncome, blankExpenses } from "../../../../applicationShape";
import { getAllProducts } from "../../../../api/productsApi";
import ApplicationReadOnly from "../../../DisplayComponents/ApplicationReadOnly";
import ApplicationStatusSummary from "../../../DisplayComponents/ApplicationStatusSummary";
import InvestmentSummary from "../../../DisplayComponents/InvestmentSummary";
import * as ApplicationService from "../../../../tools/ApplicationService";


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
        mapSalesForForm()
        setApplicationRestarted(true);
    }

    function mapSalesForForm() {
        setSales(ApplicationService.mapSales(sales));
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
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleIncomeChange(event) {
        const { name, value } = event.target;

        if (!ApplicationService.isValidMoney(value)) return;

        setIncome(prevIncome => ({
            ...prevIncome,
            [name]: value
        }));
    }

    function handleExpensesChange(event) {
        const { name, value } = event.target;

        if (!ApplicationService.isValidMoney(value)) return;

        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [name]: value
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
        let totalErrors = Object.keys(incomeErrors).length + Object.keys(expensesErrors).length + Object.keys(salesErrors).length;
        return totalErrors === 0;
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
        alert("good");
        // submitApplication(payload).then(res => {
        //     toast.success("Application submitted");
        //     setApplicationRestarted(false);
        //     getApplication();
        // }).catch(err => {
        //     setSaving(false);
        //     console.log(err);
        //     toast.error("Error submitting application", {
        //         autoClose: false
        //     });
        //     let tempErrors = { ...errors };
        //     tempErrors.onSave = err.message;
        //     setErrors({ ...tempErrors });
        // });
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
                            <button onClick={() => { restartApplication() }} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 mb-4 rounded pointer float-right">Restart application</button>
                        </>
                    }
                    {(application.status == "1") &&
                        <>
                            <ApplicationReadOnly application={application} />
                            <ApplicationStatusSummary application={application} />
                        </>
                    }
                    {(application.status == "3") &&
                        <>
                            <ApplicationReadOnly application={application} />
                            <ApplicationStatusSummary application={application} />
                            <InvestmentSummary application={application} />
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
