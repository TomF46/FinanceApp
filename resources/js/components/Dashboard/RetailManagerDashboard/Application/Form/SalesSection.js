import React from "react";
import PropTypes from "prop-types";
import MoneyInput from "../../../../FormComponents/MoneyInput";

const SalesSection = ({
    sales,
    onChange,
    errors
}) => {
    return (
        <>

            <div className="my-8">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Sales</p>
                    </div>
                    <div>
                        {sales.map((sale, index) => {
                            return (
                                <div key={index} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                                    <div className="col-span-6 lg:col-span-4 vertical-centered">
                                        <p>{sale.name}</p>
                                    </div>
                                    <div className="lg:block col-span-4 vertical-centered">
                                        <p>£{sale.price}</p>
                                    </div>
                                    <div className="lg:block col-span-4">
                                        <div>
                                            <MoneyInput
                                                name={index}
                                                label="Amount sold"
                                                value={sales[index].quantity}
                                                onChange={onChange}
                                                error={null}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

SalesSection.propTypes = {
    sales: PropTypes.array.isRequired,
    errors: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

export default SalesSection;
