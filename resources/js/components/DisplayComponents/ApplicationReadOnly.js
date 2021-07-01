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
            <h1 className="text-center font-bold text-2xl">
                {application.year.year} Application for {application.retailLocationName} Read only
            </h1>

            <div className="my-4 card shadow-sm rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg p-2">Non-operating Income</p>
                </div>
                <table class="table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-1/2 text-left pl-2">Source</th>
                            <th className="w-1/2 text-left">Income(£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Dividends</td>
                            <td>£{application.incomeRecord.dividends}</td>
                        </tr>
                        <tr>
                            <td className="pl-2">Asset sales</td>
                            <td>£{application.incomeRecord.assetSales}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Maintenance grant</td>
                            <td>£{application.incomeRecord.maintenanceGrant}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2">Sponsorship</td>
                            <td>£{application.incomeRecord.sponsorship}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Rewards</td>
                            <td>£{application.incomeRecord.rewards}</td>
                        </tr>
                        <tr className="border-b border-t">
                            <td className="font-bold pl-2">Total</td>
                            <td className="font-bold">£{application.incomeRecord.totalIncome}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4 card shadow-sm rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg p-2">Sales</p>
                </div>
                <table class="table-fixed w-full">
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
                                    <td>£{sale.income}</td>
                                </tr>
                            )
                        })}
                        <tr className="border-b border-t">
                            <td className="font-bold pl-2">Total</td>
                            <td className="font-bold">£{getTotalSalesIncome()} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4 card shadow-sm rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg p-2">Expenses</p>
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
                            <td className="pl-2">Rent</td>
                            <td>£{application.expensesRecord.rent}</td>
                        </tr>
                        <tr>
                            <td className="pl-2">Payroll</td>
                            <td>£{application.expensesRecord.payroll}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Utilities</td>
                            <td>£{application.expensesRecord.utilities}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2">Equipment</td>
                            <td>£{application.expensesRecord.equipment}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Travel</td>
                            <td>£{application.expensesRecord.travel}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2">Training</td>
                            <td>£{application.expensesRecord.training}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Maintenance</td>
                            <td>£{application.expensesRecord.maintenance}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="pl-2">Employee bonus</td>
                            <td>£{application.expensesRecord.employeeBonus}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="pl-2">Employee expenses</td>
                            <td>£{application.expensesRecord.employeeExpenses}</td>
                        </tr>
                        <tr className="border-b border-t">
                            <td className="font-bold pl-2">Total</td>
                            <td className="font-bold">£{application.incomeRecord.totalIncome}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="my-4">
                <div className="my-2 card shadow-sm rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg p-2">Summary</p>
                    </div>
                    <table class="table-fixed w-full">
                        <thead>
                            <tr>
                                <th className="w-1/2 text-left pl-2">Type</th>
                                <th className="w-1/2 text-left">Income(£)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-200">
                                <td className="pl-2">Total Non-operating income</td>
                                <td>£{application.incomeRecord.totalIncome}</td>
                            </tr>
                            <tr>
                                <td className="pl-2">Total sales income</td>
                                <td>£{getTotalSalesIncome()}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="pl-2">Overall Total income</td>
                                <td>£{getTotalIncome()}</td>
                            </tr>
                            <tr>
                                <td className="pl-2">Total Expenses</td>
                                <td>£{application.expensesRecord.totalExpenses}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="pl-2">Total profit/loss</td>
                                <td>£{getTotalProfitLoss()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

ApplicationReadOnly.propTypes = {
    application: PropTypes.object.isRequired
};

export default ApplicationReadOnly;
