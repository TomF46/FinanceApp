import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from 'react-tooltip';

const MoneyInput = ({ name, label, onChange, placeholder, value, error, tooltipText }) => {
    return (
        <div className="field">
            {label &&
                <label
                    className="block mb-2 font-bold text-xs text-gray-700"
                    htmlFor={name}
                    data-tip={tooltipText}
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
                    min="0"
                    step="0.01"
                    required
                />
                {error && (
                    <div className="text-red-500 text-xs p-1 mt-2">{error}</div>
                )}
            </div>
            <ReactTooltip backgroundColor="#0096b4" />
        </div>
    );
};

MoneyInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    error: PropTypes.string,
    tooltipText: PropTypes.string
};

export default MoneyInput;
