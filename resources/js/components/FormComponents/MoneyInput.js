import React from "react";
import PropTypes from "prop-types";

const MoneyInput = ({ name, label, onChange, placeholder, value, error }) => {
    return (
        <div className="field">
            {label &&
                <label
                    className="block mb-2 font-bold text-xs text-gray-700"
                    htmlFor={name}
                >
                    {label}
                </label>
            }
            <div className="control">
                <input
                    type="number"
                    name={name}
                    className="border border-gray-400 p-2 w-full"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    pattern="^\d*(\.\d{0,2})?$"
                    required
                />
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
            </div>
        </div>
    );
};

MoneyInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.number,
    error: PropTypes.string
};

export default MoneyInput;
