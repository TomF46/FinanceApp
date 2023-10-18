import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocationApplicationsCSV, getRetailLocationById } from "../../../../api/retailLocationsApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import ApplicationsList from "../../../DisplayComponents/ApplicationList";
import { downloadCSVStream } from "../../../../tools/HelperFunctions";
import { useParams } from "react-router-dom";


const RetailLocationDetailPage = () => {
    const { retailLocationId } = useParams();
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

    function downloadApplicationsCSV(){
        getLocationApplicationsCSV(retailLocationId).then(data => {
            downloadCSVStream(data, `${retailLocation.name}Applications.csv`);
        }).catch(error => {
            toast.error("Error getting CSV " + error.message, {
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
                                <p className="text-white font-bold text-lg px-2 py-1">{retailLocation.name} Info</p>
                            </div>
                            <div className="px-2 py-1">
                                <p><span className="font-bold">Name:</span> {retailLocation.name}</p>
                                <p><span className="font-bold">Area:</span> {retailLocation.area}</p>
                                <p><span className="font-bold">Location:</span> {retailLocation.location}</p>
                                {retailLocation.managers.length > 0 ? (
                                    <>
                                        <p className="font-bold">{`Manager${retailLocation.managers.length > 1 ? 's' : ''}:`}</p>
                                        {retailLocation.managers.map((manager) => {
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

                    <div className="my-4 card shadow-md rounded-md">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                        </div>
                        <div className="px-2 py-2 flex">
                        <Link to={`/retail/${retailLocation.id}/data`} className="bg-primary hover:opacity-75 text-white py-2 px-4 mr-2 rounded pointer">Data overview</Link>
                            <button onClick={() => downloadApplicationsCSV()} className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow pointer">
                                Download applications CSV
                            </button>
                        </div>
                    </div>

                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{retailLocation.name} Applications</p>
                            </div>
                            <div>
                                {retailLocation.applications.length > 0 ? (
                                    <ApplicationsList applications={retailLocation.applications} />
                                ) : (
                                    <p className="text-center p-4">This location doesn't currently have any applications.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
};

export default RetailLocationDetailPage;
