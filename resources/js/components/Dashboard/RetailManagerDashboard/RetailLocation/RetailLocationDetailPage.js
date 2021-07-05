import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRetailLocationById } from "../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import ApplicationsList from "../../../DisplayComponents/ApplicationList";


const RetailLocationDetailPage = ({ retailLocationId }) => {
    const [retailLocation, setRetailLocation] = useState(null);
    useEffect(() => {
        if (!retailLocation) {
            getRetailLocation();
        }
    }, [retailLocationId, retailLocation])

    function getRetailLocation() {
        getRetailLocationById(retailLocationId).then(retailLocationData => {
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

                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{retailLocation.name} Applications</p>
                            </div>
                            <div>
                                <ApplicationsList applications={retailLocation.applications} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

RetailLocationDetailPage.propTypes = {
    retailLocationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        retailLocationId: ownProps.match.params.retailLocationId,
    };
};


export default connect(mapStateToProps)(RetailLocationDetailPage);
