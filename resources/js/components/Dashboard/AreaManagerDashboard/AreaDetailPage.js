import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAreaById } from "../../../api/areasApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../DisplayComponents/LoadingMessage";
import ApplicationsList from "../../DisplayComponents/ApplicationList";
import RetailLocationsList from "../../DisplayComponents/RetailLocationsList";


const AreaDetailPage = ({ areaId }) => {
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
    return (
        <>
            {!area ? (
                <LoadingMessage message={"Loading Area Overview"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {area.name}
                    </h1>

                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{area.name} Info</p>
                            </div>
                            <div className="px-2 py-1">
                                <p><span className="font-bold">Name:</span> {area.name}</p>
                                <p><span className="font-bold">Number of retailer:</span> {area.locationCount}</p>
                                {area.managers.length > 0 ? (
                                    <>
                                        <p className="font-bold">{`Manager${area.managers.length > 1 ? 's' : ''}:`}</p>
                                        {area.managers.map((manager) => {
                                            return (
                                                <p>{`${manager.fullName} (${manager.email})`} </p>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <p>No manager assigned</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{area.name} Retail Locations</p>
                            </div>
                            <div>
                                <RetailLocationsList retailLocations={area.locations} isAdmin={false} />
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{area.name} Applications</p>
                            </div>
                            <div>
                                {area.applications.length > 0 ? (
                                    <ApplicationsList applications={area.applications} />
                                ) : (
                                    <p className="text-center p-4">You do not currently have any applications.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

AreaDetailPage.propTypes = {
    areaId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        areaId: ownProps.match.params.areaId,
    };
};


export default connect(mapStateToProps)(AreaDetailPage);
