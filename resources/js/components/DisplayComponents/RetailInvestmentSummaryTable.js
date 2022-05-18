import React from "react";
import PropTypes from "prop-types";
import MoneyFormat from "./MoneyFormat";
import { getMoneyTextColorClass } from "../../tools/HelperFunctions";

const RetailInvestmentSummaryTable = ({
    investmentSummary,
}) => {
    return (
        <div className="my-2 card shadow-md rounded-md">
            <div className="bg-primary rounded-t-md">
                <p className="text-white font-bold text-lg px-2 py-1">Summary of investments</p>
            </div>
            <table className="table-fixed w-full">
                <tbody>
                    <tr className="bg-gray-200">
                        <td className="pl-2">Total investment from Non-operating income data</td>
                        <td><MoneyFormat value={investmentSummary.totalFromNOI} /></td>
                    </tr>
                    <tr>
                        <td className="pl-2">Total investment from sales data</td>
                        <td><MoneyFormat value={investmentSummary.totalFromSales} /></td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="pl-2">Total investment from net profit data</td>
                        <td><MoneyFormat value={investmentSummary.totalFromNetProfit} /></td>
                    </tr>
                    <tr>
                        <td className="pl-2 font-bold">Total investment</td>
                        <td className={`font-bold ${getMoneyTextColorClass(investmentSummary.total)}`}><MoneyFormat value={investmentSummary.total} /></td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
};

RetailInvestmentSummaryTable.propTypes = {
    investmentSummary: PropTypes.object.isRequired
};

export default RetailInvestmentSummaryTable;
