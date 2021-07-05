import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../../FormComponents/MoneyInput";

const ApplicationForm = ({
    income,
    onIncomeChange,
    incomeErrors
}) => {
    return (
        <>
            <div className="my-8">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Non-operating income</p>
                    </div>
                    <div className="p-2">
                        <div className="mb-2">
                            <MoneyInput
                                name="dividends"
                                label="Dividends (£)"
                                value={income.dividends}
                                onChange={onIncomeChange}
                                error={incomeErrors.dividends}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="assetSales"
                                label="Asset Sales (£)"
                                value={income.assetSales}
                                onChange={onIncomeChange}
                                error={incomeErrors.assetSales}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="maintenanceGrant"
                                label="Maintenance Grants (£)"
                                value={income.maintenanceGrant}
                                onChange={onIncomeChange}
                                error={incomeErrors.maintenanceGrant}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="sponsorship"
                                label="Sponsorship (£)"
                                value={income.sponsorship}
                                onChange={onIncomeChange}
                                error={incomeErrors.sponsorship}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="rewards"
                                label="Rewards (£)"
                                value={income.rewards}
                                onChange={onIncomeChange}
                                error={incomeErrors.rewards}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ApplicationForm.propTypes = {
    income: PropTypes.object.isRequired,
    incomeErrors: PropTypes.object,
    onIncomeChange: PropTypes.func.isRequired,
};

export default ApplicationForm;
