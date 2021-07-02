import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deactivateRetailLocationById, getRetailLocationById, RemoveRetailManager } from "../../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import ManagersList from "../../../../DisplayComponents/ManagersList";
import AddRetailManagerForm from "./AddRetailManagerForm";
import { confirmAlert } from "react-confirm-alert";
import history from "../../../../../history";


const RetailLocationAdminPage = ({ retailLocationId }) => {
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

    function handleDeactivate() {
        confirmAlert({
            title: "Confirm deactivation",
            message: `Are you sure you want to deactivate this location?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        deactivate()
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function deactivate() {
        deactivateRetailLocationById(retailLocationId).then(response => {
            toast.success("Retail location deactivated");
            history.push("/admin/locations");
        }).catch(error => {
            toast.error("Error deactivating retail location " + error.message, {
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
                    <h1 className="text-center font-bold text-6xl">
                        {retailLocation.name}
                    </h1>
                    <button
                        onClick={() => (handleDeactivate())}
                        className="bg-red-800 text-white rounded py-2 px-4 hover:bg-red-600 shadow"
                    >
                        Deactivate
                    </button>
                    <Link
                        to={`/admin/locations/retail/${retailLocation.id}/edit`}
                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow ml-2"
                    >
                        Edit
                    </Link>
                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Managers</p>
                            </div>
                            <div>
                                <ManagersList managers={retailLocation.managers} onManagerRemove={handleManagerRemove} />
                            </div>
                        </div>
                    </div>
                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Add Manager</p>
                            </div>
                            <div className="p-2">
                                <AddRetailManagerForm retailLocation={retailLocation} onManagerAdded={handleManagerAdded} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

RetailLocationAdminPage.propTypes = {
    retailLocationId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        retailLocationId: ownProps.match.params.retailLocationId,
    };
};


export default connect(mapStateToProps)(RetailLocationAdminPage);
