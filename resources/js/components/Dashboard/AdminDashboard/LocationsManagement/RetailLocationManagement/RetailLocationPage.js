import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRetailLocationById, RemoveRetailManager } from "../../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import RetailLocationsList from "../../../../DisplayComponents/RetailLocationsList";
import ManagersList from "../../../../DisplayComponents/ManagersList";
import AddRetailManagerForm from "./AddRetailManagerForm";
import { confirmAlert } from "react-confirm-alert";


const RetailLocationPage = ({ retailLocationId }) => {
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

    function handleManagerAdded() {
        getRetailLocation();
    }

    function handleManagerRemove(id) {
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this manager?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        removeManager(id);
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function removeManager(id) {
        RemoveRetailManager(retailLocation, id).then(response => {
            toast.success("Manager removed.")
            getRetailLocation();
        }).catch(error => {
            toast.error("Unable to remove manager " + error.message, {
                autoClose: false,
            });
        })
    }

    return (
        <>
            {!retailLocation ? (
                <LoadingMessage message={"Loading Retail Location"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-6xl">
                        {retailLocation.name}
                    </h1>
                    <div className="my-4">
                        <h2 className="text-center font-bold text-xl">
                            Managers
                        </h2>
                        <ManagersList managers={retailLocation.managers} onManagerRemove={handleManagerRemove} />
                    </div>
                    <div className="my-4">
                        <h2 className="text-center font-bold text-xl">
                            Add Manager
                        </h2>
                        <AddRetailManagerForm retailLocation={retailLocation} onManagerAdded={handleManagerAdded} />
                    </div>
                </>
            )}
        </>
    )
};

RetailLocationPage.propTypes = {
    retailLocationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        retailLocationId: ownProps.match.params.retailLocationId,
    };
};


export default connect(mapStateToProps)(RetailLocationPage);
