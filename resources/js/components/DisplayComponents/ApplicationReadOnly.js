import React from "react";
import PropTypes from "prop-types";


const ApplicationReadOnly = ({
    application,
}) => {

    function getTotalSalesIncome() {
        return application.sales.map(sale => sale.income).reduce((prev, next) => prev + next);
    }

    function getTotalIncome() {
        return getTotalSalesIncome() + application.incomeRecord.totalIncome;
    }

    function getTotalProfitLoss() {
        return getTotalIncome() - application.expensesRecord.totalExpenses;
    }

    return (
        <div className="application-read-only">
            <h1 className="text-center font-bold text-6xl">
                {application.year.year} Application for {application.retailLocationName} Read only
            </h1>

            <div className="my-4">
                <p className="font-bold text-md">Non-operating Income</p>
                <p>Dividends: £{application.incomeRecord.dividends}</p>
                <p>Asset sales: £{application.incomeRecord.assetSales}</p>
                <p>Maintenance Grant: £{application.incomeRecord.maintenanceGrant}</p>
                <p>Sponsorship: £{application.incomeRecord.sponsorship}</p>
                <p>Rewards: £{application.incomeRecord.rewards}</p>
                <p className="font-bold">Total non-operating income: £{application.incomeRecord.totalIncome}</p>
            </div>

            <div className="my-4">
                <p className="font-bold text-md">Expenses</p>
                <p>Rent: £{application.expensesRecord.rent}</p>
                <p>Payroll: £{application.expensesRecord.payroll}</p>
                <p>Utilities: £{application.expensesRecord.utilities}</p>
                <p>Equipment: £{application.expensesRecord.equipment}</p>
                <p>Travel: £{application.expensesRecord.travel}</p>
                <p>Training: £{application.expensesRecord.training}</p>
                <p>Maintenance: £{application.expensesRecord.maintenance}</p>
                <p>Employee Bonuses: £{application.expensesRecord.employeeBonus}</p>
                <p>Employee Expenses: £{application.expensesRecord.employeeExpenses}</p>
                <p className="font-bold">Total Expenses: £{application.expensesRecord.totalExpenses}</p>
            </div>

            <div className="my-4">
                <p className="font-bold text-md">Sales</p>
                {application.sales.map(sale => {
                    return (
                        <p>{sale.productName}(£{sale.productPrice}) x {sale.quantity} = £{sale.income}</p>
                    )
                })}
                <p className="font-bold">Total sales income: £{getTotalSalesIncome()} </p>
            </div>

            <div className="my-4">
                <p className="font-bold text-md">Summary</p>
                <div className="my-2">
                    <p className="font-bold">Income</p>
                    <p>Total Non-operating income: £{application.incomeRecord.totalIncome}</p>
                    <p>Total sales income: £{getTotalSalesIncome()} </p>
                    <p>Overall Total income: £{getTotalIncome()}</p>
                </div>
                <div className="my-2">
                    <p className="font-bold">Expenses</p>
                    <p>Total Expenses: £{application.expensesRecord.totalExpenses}</p>
                </div>
                <div className="my-2">
                    <p className="font-bold">Total</p>
                    <p>Total profit/loss: £{getTotalProfitLoss()}</p>
                </div>
            </div>
        </div>
    );
};

ApplicationReadOnly.propTypes = {
    application: PropTypes.object.isRequired
};

export default ApplicationReadOnly;
