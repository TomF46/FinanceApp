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

            <div className="my-8">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Expenses</p>
                    </div>
                    <div className="p-2">
                        <div className="mb-2">
                            <MoneyInput
                                name="rent"
                                label="Rent (£)"
                                value={expenses.rent}
                                onChange={onExpensesChange}
                                error={expensesErrors.rent}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="payroll"
                                label="Payroll (£)"
                                value={expenses.payroll}
                                onChange={onExpensesChange}
                                error={expensesErrors.payroll}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="utilities"
                                label="Utilities (£)"
                                value={expenses.utilities}
                                onChange={onExpensesChange}
                                error={expensesErrors.utilities}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="equipment"
                                label="Equipment (£)"
                                value={expenses.equipment}
                                onChange={onExpensesChange}
                                error={expensesErrors.equipment}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="travel"
                                label="Travel (£)"
                                value={expenses.travel}
                                onChange={onExpensesChange}
                                error={expensesErrors.travel}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="training"
                                label="Training (£)"
                                value={expenses.training}
                                onChange={onExpensesChange}
                                error={expensesErrors.training}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="maintenance"
                                label="Maintenance (£)"
                                value={expenses.maintenance}
                                onChange={onExpensesChange}
                                error={expensesErrors.maintenance}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="employeeBonus"
                                label="Employee Bonuses (£)"
                                value={expenses.employeeBonus}
                                onChange={onExpensesChange}
                                error={expensesErrors.employeeBonus}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="employeeExpenses"
                                label="Employee Expenses (£)"
                                value={expenses.employeeExpenses}
                                onChange={onExpensesChange}
                                error={expensesErrors.employeeExpenses}
                            />
                        </div>
                    </div>
                </div>
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
