import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../../FormComponents/MoneyInput";
import tooltips from "../../../../../tools/TooltipConstants";
import MoneyFormat from "../../../../DisplayComponents/MoneyFormat";

const ExpensesSection = ({
    expenses,
    onExpensesChange,
    expensesErrors
}) => {

    function getTotalExpenses(){
        return Number(expenses.rent)
        + Number(expenses.payroll)
        + Number(expenses.utilities)
        + Number(expenses.equipment)
        + Number(expenses.travel)
        + Number(expenses.training)
        + Number(expenses.maintenance)
        + Number(expenses.employeeBonus)
        + Number(expenses.employeeExpenses);
    }

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
                                tooltipText={tooltips.expenses.rent}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="payroll"
                                label="Payroll (£)"
                                value={expenses.payroll}
                                onChange={onExpensesChange}
                                error={expensesErrors.payroll}
                                tooltipText={tooltips.expenses.payroll}

                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="utilities"
                                label="Utilities (£)"
                                value={expenses.utilities}
                                onChange={onExpensesChange}
                                error={expensesErrors.utilities}
                                tooltipText={tooltips.expenses.utilities}

                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="equipment"
                                label="Equipment (£)"
                                value={expenses.equipment}
                                onChange={onExpensesChange}
                                error={expensesErrors.equipment}
                                tooltipText={tooltips.expenses.equipment}

                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="travel"
                                label="Travel (£)"
                                value={expenses.travel}
                                onChange={onExpensesChange}
                                error={expensesErrors.travel}
                                tooltipText={tooltips.expenses.travel}

                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="training"
                                label="Training (£)"
                                value={expenses.training}
                                onChange={onExpensesChange}
                                error={expensesErrors.training}
                                tooltipText={tooltips.expenses.training}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="maintenance"
                                label="Maintenance (£)"
                                value={expenses.maintenance}
                                onChange={onExpensesChange}
                                error={expensesErrors.maintenance}
                                tooltipText={tooltips.expenses.maintenance}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="employeeBonus"
                                label="Employee Bonuses (£)"
                                value={expenses.employeeBonus}
                                onChange={onExpensesChange}
                                error={expensesErrors.employeeBonus}
                                tooltipText={tooltips.expenses.employeeBonus}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="employeeExpenses"
                                label="Employee Expenses (£)"
                                value={expenses.employeeExpenses}
                                onChange={onExpensesChange}
                                error={expensesErrors.employeeExpenses}
                                tooltipText={tooltips.expenses.employeeExpenses}
                            />
                        </div>
                        <div className="mb-2">
                            <p className="font-bold text-money-negative">Total expenses: <MoneyFormat value={getTotalExpenses()} /></p>
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
