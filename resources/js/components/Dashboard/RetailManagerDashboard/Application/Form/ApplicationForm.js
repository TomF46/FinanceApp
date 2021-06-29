import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../../FormComponents/MoneyInput";
import IncomeSection from "./IncomeSection";
import ExpensesSection from "./ExpensesSection";
import SalesSection from "./SalesSection";


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
    salesErrors
}) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">{application.retailLocationName} Application</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <IncomeSection income={income} onIncomeChange={onIncomeChange} incomeErrors={incomeErrors} />

            <ExpensesSection expenses={expenses} onExpensesChange={onExpensesChange} expensesErrors={expensesErrors} />

            <SalesSection sales={sales} onChange={onSalesChange} errors={salesErrors} />


            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600"
                >
                    {saving ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

ApplicationForm.propTypes = {
    application: PropTypes.object.isRequired,
    income: PropTypes.object.isRequired,
    expenses: PropTypes.object.isRequired,
    sales: PropTypes.object.isRequired,
    errors: PropTypes.object,
    incomeErrors: PropTypes.object,
    expensesErrors: PropTypes.object,
    salesErrors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onIncomeChange: PropTypes.func.isRequired,
    onExpensesChange: PropTypes.func.isRequired,
    onSalesChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default ApplicationForm;
