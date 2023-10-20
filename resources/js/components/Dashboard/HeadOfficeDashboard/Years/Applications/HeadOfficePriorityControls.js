import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { confirm } from "../../../../../tools/PopupHelper";
import SelectInput from "../../../../FormComponents/SelectInput";
import { setApplicationPriority } from "../../../../../api/applicationsApi";
import { toast } from "react-toastify";

const HeadOfficePriorityControls = ({
    application,
    onPriorityUpdated
}) => {
    const [priority, setPriority] = useState(0);

    const prioritOptions = [
        {text: "Low", value: 0},
        {text: "Medium", value: 1},
        {text: "High", value: 2},
        {text: "Severe", value: 3}
    ];

    useEffect(() => {
        setPriority(application.priority)
    }, [application])

    function handleChange(event){
        const { value } = event.target;
        setPriority(value);
    }

    function confirmUpdate(){
        confirm(
            "Confirm priority update.",
            `Are you sure you want to set priority for this application`,
            handleUpdate
        );
    }

    function handleUpdate(){
        setApplicationPriority(application.id, priority).then(res => {
            toast.success("Priority updated!");
            onPriorityUpdated();
        }).catch(error => {
            toast.error("Error setting priority." + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="application-headoffice-controls">

            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-secondary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Set priority</p>
                </div>
                <div className="px-2 py-4 grid grid-cols-12">
                <div className="col-span-12">
                    <SelectInput
                        name="priority"
                        label="Priority"
                        value={priority}
                        options={prioritOptions}
                        onChange={handleChange}
                    />
                    </div>
                    {priority != null && (
                        <div className="col-span-12 mt-4">
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
        </div>
    );
};

HeadOfficePriorityControls.propTypes = {
    application: PropTypes.object.isRequired,
    onPriorityUpdated: PropTypes.func.isRequired
};

export default HeadOfficePriorityControls;
