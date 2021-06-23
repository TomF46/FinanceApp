import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { AddRetailManager } from "../../../../../api/locationsApi"
import { getRetailManagers } from "../../../../../api/usersApi";
import history from "../../../../../history";
import SelectInput from "../../../../FormComponents/SelectInput";

const AddRetailManagerForm = ({ retailLocation, onManagerAdded }) => {

    const [manager, setManager] = useState({
        user_id: null
    });
    const [managers, setManagers] = useState(null)
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!managers) {
            getRetailManagers().then(managerData => {
                setManagers(managerData);
            });
        }
    }, [managers]);

    function handleChange(event) {
        const { name, value } = event.target;
        setManager(prevManager => ({
            ...prevManager,
            [name]: value
        }));
    }

    function formIsValid() {
        const { user_id } = manager;
        const errors = {};
        if (!user_id) errors.user_id = "Manager is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        AddRetailManager(retailLocation, manager)
            .then(response => {
                toast.success("Successfully added retail manager");
                onManagerAdded();
            })
            .catch(err => {
                setSaving(false);
                toast.error(formatErrorText(err), {
                    autoClose: false,
                });
            });
    }

    function formatErrorText(error) {
        let errorText = '';

        for (const [key, value] of Object.entries(error.data.errors)) {
            errorText = `${errorText} ${value}`;
        }

        return errorText;
    }

    return (
        <div className="add-retail-manager-form">
            <form className="" onSubmit={handleSave}>
                <h2 className="font-bold text-lg mb-4 text-center">Add Manager</h2>
                {errors.onSave && (
                    <div className="text-red-500 text-xs p-1" role="alert">
                        {errors.onSave}
                    </div>
                )}
                <div className="mb-6">
                    <SelectInput
                        name="user_id"
                        label="Manager"
                        value={manager.user_id}
                        options={managers}
                        onChange={handleChange}
                        error={errors.user_id}
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600"
                    >
                        {saving ? "Adding..." : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
};

AddRetailManagerForm.propTypes = {
    retailLocation: PropTypes.object.isRequired,
    onManagerAdded: PropTypes.func.isRequired
};


export default AddRetailManagerForm;
