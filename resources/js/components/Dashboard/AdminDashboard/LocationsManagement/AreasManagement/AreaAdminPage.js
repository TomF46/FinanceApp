import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deactivateAreaById, getAreaById, removeAreaManager } from "../../../../../api/areasApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import RetailLocationsList from "../../../../DisplayComponents/RetailLocationsList";
import ManagersList from "../../../../DisplayComponents/ManagersList";
import AddAreaManagerForm from "./AddAreaManagerForm";
import history from "../../../../../history";
import { confirm } from "../../../../../tools/PopupHelper";


const AreaAdminPage = ({ areaId }) => {
    const [area, setArea] = useState(null);
    useEffect(() => {
        if (!area) {
            getArea();
        }
    }, [areaId, area])

    function getArea() {
        getAreaById(areaId).then(areaData => {
            setArea(areaData);
        }).catch(error => {
            toast.error("Error getting area " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleManagerAdded() {
        getArea();
    }

    function handleManagerRemove(id) {
        confirm(
            "Confirm removal",
            `Are you sure you want to remove this area manager?`,
            () => {removeManager(id)}
        );
    }

    function removeManager(id) {
        removeAreaManager(area, id).then(response => {
            toast.success("Manager removed.")
            getArea();
        }).catch(error => {
            toast.error("Unable to remove manager " + error.message, {
                autoClose: false,
            });
        })
    }

    function handleDeactivate() {
        confirm(
            "Confirm deactivation",
            `Are you sure you want to deactivate this area?`,
            deactivate
        );
    }

    function deactivate() {
        deactivateAreaById(areaId).then(response => {
            toast.success("Area deactivated");
            history.push("/admin/locations");
        }).catch(error => {
            toast.error("Error deactivating area" + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            {!area ? (
                <LoadingMessage message={"Loading Area"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {area.name}
                    </h1>
                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Locations</p>
                            </div>
                            <div>
                                <RetailLocationsList retailLocations={area.locations} isAdmin={true} />
                            </div>
                        </div>
                    </div>
                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Managers</p>
                            </div>
                            <div>
                                <ManagersList managers={area.managers} onManagerRemove={handleManagerRemove} />
                            </div>
                        </div>
                    </div>
                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Add Manager</p>
                            </div>
                            <div className="p-2">
                                <AddAreaManagerForm area={area} onManagerAdded={handleManagerAdded} />
                            </div>
                        </div>
                    </div>

                    <div className="my-4 card shadow-md rounded-md">
                        <div className="bg-secondary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                        </div>
                        <div className="px-2 py-2 flex justify-between">
                            <Link
                                to={`/admin/locations/areas/${area.id}/edit`}
                                className="bg-secondary text-white rounded py-2 px-4 hover:opacity-75 shadow"
                            >
                                Edit Area
                            </Link>
                            <button
                                onClick={() => (handleDeactivate())}
                                className="bg-danger text-white rounded py-2 px-4 hover:opacity-75 shadow"
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

AreaAdminPage.propTypes = {
    areaId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        areaId: ownProps.match.params.areaId,
    };
};


export default connect(mapStateToProps)(AreaAdminPage);
