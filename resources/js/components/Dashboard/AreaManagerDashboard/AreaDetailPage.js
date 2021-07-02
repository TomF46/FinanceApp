import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAreaById } from "../../../api/locationsApi"
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
                    <h1 className="text-center font-bold text-6xl">
                        {area.name}
                    </h1>

                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{area.name} Retail Locations</p>
                            </div>
                            <div>
                                <RetailLocationsList retailLocations={area.locations} isAdmin={false} />
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{area.name} Applications</p>
                            </div>
                            <div>
                                <ApplicationsList applications={area.applications} />
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
