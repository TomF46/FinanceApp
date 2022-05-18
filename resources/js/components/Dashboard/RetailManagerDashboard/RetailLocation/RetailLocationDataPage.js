import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRetailLocationDataById } from "../../../../api/retailLocationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";
import { getMoneyTextColorClass } from "../../../../tools/HelperFunctions";
import RetailDataSummaryTable from "../../../DisplayComponents/RetailDataSummaryTable";
import RetailInvestmentSummaryTable from "../../../DisplayComponents/RetailInvestmentSummaryTable";

const RetailLocationDataPage = ({ retailLocationId }) => {
    const [retailLocation, setRetailLocation] = useState(null);
    useEffect(() => {
        if (!retailLocation) {
            getRetailLocation();
        }
    }, [retailLocationId, retailLocation])

    function getRetailLocation() {
        getRetailLocationDataById(retailLocationId).then(retailLocationData => {
            setRetailLocation(retailLocationData);
        }).catch(error => {
            toast.error("Error getting retail location " + error.message, {
                autoClose: false,
            });
        });
    }
    return (
        <>
            {!retailLocation ? (
                <LoadingMessage message={"Loading Retail Location"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {retailLocation.name}
                    </h1>

                    <div className="my-4">
                        <RetailDataSummaryTable retailDataSummary={retailLocation.retailDataSummary} />
                    </div>

                    <div className="my-4">
                        <RetailInvestmentSummaryTable investmentSummary={retailLocation.investmentSummary} />
                    </div>
                </>
            )}
        </>
    )
};

RetailLocationDataPage.propTypes = {
    retailLocationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        retailLocationId: ownProps.match.params.retailLocationId,
    };
};


export default connect(mapStateToProps)(RetailLocationDataPage);
