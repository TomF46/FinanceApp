import React from "react";
import PropTypes from "prop-types";
import NumberFormat from 'react-number-format';

const MoneyFormat = ({
    value,
}) => {
    return (
        <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'£'} decimalScale={2} />
    );
};

MoneyFormat.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
};

export default MoneyFormat;
