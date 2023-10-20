import React, { useEffect, useState } from "react";
import SelectInput from "../../../../FormComponents/SelectInput";
import { getYearById, setYearPriority } from "../../../../../api/yearsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";
import { confirm } from "../../../../../tools/PopupHelper";
import { useParams } from "react-router-dom";

const YearPriorityUpdatePage = () => {
    const { yearId } = useParams();
    const [year, setYear] = useState(null);
    const [priority, setPriority] = useState(0);

    const prioritOptions = [
        {text: "Low", value: 0},
        {text: "Medium", value: 1},
        {text: "High", value: 2},
        {text: "Severe", value: 3}
    ];

    useEffect(() => {
        if (!year) {
            getYear();
        }
    }, [yearId, year])

    function getYear() {
        getYearById(yearId).then(yearData => {
            setYear(yearData);
        }).catch(error => {
            toast.error("Error getting year " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleChange(event){
        const { value } = event.target;
        setPriority(value);
    }

    function confirmUpdate(){
        confirm(
            "Confirm priority update.",
            `Are you sure you want to set priority for ${year.year}`,
            handleUpdate
        );
    }

    function handleUpdate(){
        setYearPriority(yearId, priority).then(res => {
            toast.success("Priority updated!");
        }).catch(error => {
            toast.error("Error setting priority." + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
        {!year ? (
            <LoadingMessage message={"Loading Year"} />
        ) : (
            <div className="my-2 card shadow-md rounded-md">
                <div className="bg-primary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Update Priority</p>
                </div>
                <div className="grid grid-cols-10 px-2 py-1 card shadow-md rounded-md border-b pb-4 border-gray-200 overflow-hidden text-center">
                    <div className="col-span-12 my-2">
                        <p>This will set the priority level for all non completed applications for this year.</p>
                    </div>
                    <div className="col-span-10">
                    <SelectInput
                        name="priority"
                        label="Priority"
                        value={priority}
                        options={prioritOptions}
                        onChange={handleChange}
                    />
                    </div>
                    {priority != null && (
                        <div className="col-span-10 mt-4">
                            <button
                                onClick={confirmUpdate}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                            >
                                Update
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}
        </>
    );
};

export default YearPriorityUpdatePage;