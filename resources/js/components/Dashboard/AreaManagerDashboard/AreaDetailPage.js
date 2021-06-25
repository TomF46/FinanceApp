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
                <LoadingMessage message={"Loading Retail Location"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-6xl">
                        {area.name}
                    </h1>

                    <div className="my-4">
                        <p>{area.name} Retail Locations</p>
                        <RetailLocationsList retailLocations={area.locations} isAdmin={false} />
                    </div>

                    <div className="my-4">
                        <p>{area.name} Applications</p>
                        <ApplicationsList applications={area.applications} />
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
