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
            <h3 className="font-bold text-md mb-4 text-center">Income</h3>

            <div className="mb-6">
                <MoneyInput
                    name="dividends"
                    label="Dividends"
                    value={income.dividends}
                    onChange={onIncomeChange}
                    error={incomeErrors.dividends}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="assetSales"
                    label="Asset Sales"
                    value={income.assetSales}
                    onChange={onIncomeChange}
                    error={incomeErrors.assetSales}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="maintenanceGrant"
                    label="Maintenance Grants"
                    value={income.maintenanceGrant}
                    onChange={onIncomeChange}
                    error={incomeErrors.maintenanceGrant}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="sponsorship"
                    label="Sponsorship"
                    value={income.sponsorship}
                    onChange={onIncomeChange}
                    error={incomeErrors.sponsorship}
                />
            </div>

            <div className="mb-6">
                <MoneyInput
                    name="rewards"
                    label="Rewards"
                    value={income.rewards}
                    onChange={onIncomeChange}
                    error={incomeErrors.rewards}
                />
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
