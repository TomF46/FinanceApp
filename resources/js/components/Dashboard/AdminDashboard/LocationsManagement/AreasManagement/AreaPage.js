import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAreaById, RemoveAreaManager } from "../../../../../api/locationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import RetailLocationsList from "../../../../DisplayComponents/RetailLocationsList";
import ManagersList from "../../../../DisplayComponents/ManagersList";
import AddAreaManagerForm from "./AddAreaManagerForm";
import { confirmAlert } from "react-confirm-alert";


const AreaPage = ({ areaId }) => {
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
        confirmAlert({
            title: "Confirm removal",
            message: `Are you sure you want to remove this area manager?`,
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
        RemoveAreaManager(area, id).then(response => {
            toast.success("Manager removed.")
            getArea();
        }).catch(error => {
            toast.error("Unable to remove manager " + error.message, {
                autoClose: false,
            });
        })
    }

    return (
        <>
            {!area ? (
                <LoadingMessage message={"Loading Area"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-6xl">
                        {area.name}
                    </h1>
                    <div className="my-4">
                        <h2 className="text-center font-bold text-xl">
                            Locations
                        </h2>
                        <RetailLocationsList retailLocations={area.locations} />
                    </div>
                    <div className="my-4">
                        <h2 className="text-center font-bold text-xl">
                            Managers
                        </h2>
                        <ManagersList managers={area.managers} onManagerRemove={handleManagerRemove} />
                    </div>
                    <div className="my-4">
                        <h2 className="text-center font-bold text-xl">
                            Add Manager
                        </h2>
                        <AddAreaManagerForm area={area} onManagerAdded={handleManagerAdded} />
                    </div>
                </>
            )}
        </>
    )
};

AreaPage.propTypes = {
    areaId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        areaId: ownProps.match.params.areaId,
    };
};


export default connect(mapStateToProps)(AreaPage);
