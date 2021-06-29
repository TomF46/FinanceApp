import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../../FormComponents/MoneyInput";

const ExpensesSection = ({
    expenses,
    onExpensesChange,
    expensesErrors
}) => {
    return (
        <>
            <h3 className="font-bold text-md mb-4 text-center">Expenses</h3>

            <div className="mb-6">
                <MoneyInput
                    name="rent"
                    label="Rent"
                    value={expenses.rent}
                    onChange={onExpensesChange}
                    error={expensesErrors.rent}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="payroll"
                    label="Payroll"
                    value={expenses.payroll}
                    onChange={onExpensesChange}
                    error={expensesErrors.payroll}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="utilities"
                    label="Utilities"
                    value={expenses.utilities}
                    onChange={onExpensesChange}
                    error={expensesErrors.utilities}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="equipment"
                    label="Equipment"
                    value={expenses.equipment}
                    onChange={onExpensesChange}
                    error={expensesErrors.equipment}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="travel"
                    label="Travel"
                    value={expenses.travel}
                    onChange={onExpensesChange}
                    error={expensesErrors.travel}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="training"
                    label="Training"
                    value={expenses.training}
                    onChange={onExpensesChange}
                    error={expensesErrors.training}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="maintenance"
                    label="Maintenance"
                    value={expenses.maintenance}
                    onChange={onExpensesChange}
                    error={expensesErrors.maintenance}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="employeeBonus"
                    label="Employee Bonuses"
                    value={expenses.employeeBonus}
                    onChange={onExpensesChange}
                    error={expensesErrors.employeeBonus}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="employeeExpenses"
                    label="Employee Expenses"
                    value={expenses.employeeExpenses}
                    onChange={onExpensesChange}
                    error={expensesErrors.employeeExpenses}
                />
            </div>
        </>
    );
};

ExpensesSection.propTypes = {
    expenses: PropTypes.object.isRequired,
    expensesErrors: PropTypes.object,
    onExpensesChange: PropTypes.func.isRequired
};

export default ExpensesSection;
