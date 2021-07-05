import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingMessage from "./LoadingMessage";
import { getInvestment } from "../../api/applicationsApi";
import { toast } from "react-toastify";


const InvestmentSummary = ({
    application,
}) => {
    const [investment, setInvestment] = useState(null);

    useEffect(() => {
        if (!investment) {
            getInvestmentSummary();
        }
    }, [investment])

    function getInvestmentSummary() {
        getInvestment(application).then(investmentData => {
            setInvestment(investmentData);
        }).catch(error => {
            toast.error("Error getting investment summary " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            {investment ? (
                <div className="my-4 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Investment summary</p>
                    </div>
                    <table className="table-fixed w-full">
                        <thead>
                            <tr>
                                <th className="w-1/2 text-left pl-2">Source</th>
                                <th className="w-1/2 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-200">
                                <td className="pl-2">From Non-operating income</td>
                                <td>£{investment.fromNOI}</td>
                            </tr>
                            <tr>
                                <td className="pl-2">From Sales</td>
                                <td>£{investment.fromSales}</td>
                            </tr>
                            <tr className="bg-gray-200">
                                <td className="pl-2">From Net profit</td>
                                <td>£{investment.fromNetProfit}</td>
                            </tr>
                            <tr className="border-b border-t">
                                <td className="font-bold pl-2">Total</td>
                                <td className="font-bold">£{investment.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <LoadingMessage message={"Loading Investment"} />
            )}
        </>
    );
};

InvestmentSummary.propTypes = {
    application: PropTypes.object.isRequired
};

export default InvestmentSummary;
