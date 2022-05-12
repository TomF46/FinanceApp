import React from "react";
import PropTypes from "prop-types";
import MoneyFormat from "./MoneyFormat";
import ReactTooltip from 'react-tooltip';
import tooltips from "../../tools/TooltipConstants";
import { getMoneyTextColorClass } from "../../tools/HelperFunctions";

const ApplicationReadOnly = ({
    application,
}) => {


    function getTotalSalesIncome() {
        return application.sales.map(sale => sale.income).reduce((prev, next) => prev + next);
    }
    function getTotalSalesIncomeDisplay() {
        return Number(getTotalSalesIncome()).toFixed(2);
    }

    function getTotalIncome() {
        return Number(getTotalSalesIncome() + Number(application.incomeRecord.totalIncome)).toFixed(2);;
    }

    function getTotalProfitLoss() {
        return Number(getTotalIncome() - application.expensesRecord.totalExpenses).toFixed(2);
    }

    return (
        <div className="application-read-only">
            <h1 className="text-center font-bold text-2xl">
                {application.year.year} Application for {application.retailLocationName} Read only
            </h1>

            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Non-operating Income</p>
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/2 text-left pl-2">Source</th>
                            <th className="w-1/2 text-left">Income(£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.income.dividends}>Dividends</td>
                            <td><MoneyFormat value={application.incomeRecord.dividends} /></td>
                        </tr>
                        <tr>
                            <td className="pl-2" data-tip={tooltips.income.assetSales}>Asset sales</td>
                            <td><MoneyFormat value={application.incomeRecord.assetSales} /></td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.income.maintenanceGrant}>Maintenance grant</td>
                            <td><MoneyFormat value={application.incomeRecord.maintenanceGrant} /></td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2" data-tip={tooltips.income.sponsorship}>Sponsorship</td>
                            <td><MoneyFormat value={application.incomeRecord.sponsorship} /></td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.income.rewards}>Rewards</td>
                            <td><MoneyFormat value={application.incomeRecord.rewards} /></td>
                        </tr>
                        <tr className="border-b border-t">
                            <td className="font-bold pl-2">Total</td>
                            <td className={`font-bold ${getMoneyTextColorClass(application.incomeRecord.totalIncome)}`}><MoneyFormat value={application.incomeRecord.totalIncome} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Sales</p>
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/2 text-left pl-2">Item (quantity)</th>
                            <th className="w-1/2 text-left">Income(£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {application.sales.map((sale, index) => {
                            return (
                                <tr key={sale.id} className={index % 2 == 0 ? "bg-gray-200" : ""}>
                                    <td className="pl-2">{sale.productName} ({sale.quantity})</td>
                                    <td><MoneyFormat value={sale.income} /></td>
                                </tr>
                            )
                        })}
                        <tr className="border-b border-t">
                            <td className="font-bold pl-2">Total</td>
                            <td className={`font-bold ${getMoneyTextColorClass(getTotalSalesIncomeDisplay())}`}><MoneyFormat value={getTotalSalesIncomeDisplay()} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Expenses</p>
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/2 text-left pl-2">Source</th>
                            <th className="w-1/2 text-left">Expense(£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.expenses.rent}>Rent</td>
                            <td><MoneyFormat value={application.expensesRecord.rent} /></td>
                        </tr>
                        <tr>
                            <td className="pl-2" data-tip={tooltips.expenses.payroll}>Payroll</td>
                            <td><MoneyFormat value={application.expensesRecord.payroll} /></td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.expenses.utilities}>Utilities</td>
                            <td><MoneyFormat value={application.expensesRecord.utilities} /></td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2" data-tip={tooltips.expenses.equipment}>Equipment</td>
                            <td><MoneyFormat value={application.expensesRecord.equipment} /></td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.expenses.travel}>Travel</td>
                            <td><MoneyFormat value={application.expensesRecord.travel} /></td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2" data-tip={tooltips.expenses.training}>Training</td>
                            <td><MoneyFormat value={application.expensesRecord.training} /></td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.expenses.maintenance}>Maintenance</td>
                            <td><MoneyFormat value={application.expensesRecord.maintenance} /></td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2" data-tip={tooltips.expenses.employeeBonus}>Employee bonus</td>
                            <td><MoneyFormat value={application.expensesRecord.employeeBonus} /></td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2" data-tip={tooltips.expenses.employeeExpenses}>Employee expenses</td>
                            <td><MoneyFormat value={application.expensesRecord.employeeExpenses} /></td>
                        </tr>
                        <tr className="border-b border-t">
                            <td className="font-bold pl-2">Total</td>
                            <td className="font-bold text-money-negative"><MoneyFormat value={application.expensesRecord.totalExpenses} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Summary</p>
                    </div>
                    <table className="table-fixed w-full">
                        <thead>
                            <tr>
                                <th className="w-1/2 text-left pl-2">Type</th>
                                <th className="w-1/2 text-left">Income(£)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-200">
                                <td className="pl-2">Total Non-operating income</td>
                                <td><MoneyFormat value={application.incomeRecord.totalIncome} /></td>
                            </tr>
                            <tr>
                                <td className="pl-2">Total sales income</td>
                                <td><MoneyFormat value={getTotalSalesIncomeDisplay()} /></td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="pl-2">Overall Total income</td>
                                <td><MoneyFormat value={getTotalIncome()} /></td>
                            </tr>
                            <tr>
                                <td className="pl-2">Total Expenses</td>
                                <td><MoneyFormat value={application.expensesRecord.totalExpenses} /></td>
                            </tr>
                            <tr className="border-b border-t">
                                <td className="pl-2 font-bold">Total profit/loss</td>
                                <td className={`font-bold ${getMoneyTextColorClass(getTotalProfitLoss())}`}><MoneyFormat value={getTotalProfitLoss()} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ReactTooltip backgroundColor="#0096b4" />
        </div >
    );
};

ApplicationReadOnly.propTypes = {
    application: PropTypes.object.isRequired
};

export default ApplicationReadOnly;
