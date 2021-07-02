import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import TextInput from "../../../../FormComponents/TextInput";
import { AddYear } from "../../../../../api/yearsApi";
import history from "../../../../../history";

const AddYearPage = () => {

    const [year, setYear] = useState({
        year: ""
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);


    function handleChange(event) {
        const { name, value } = event.target;
        setYear(prevYear => ({
            ...prevYear,
            [name]: value
        }));
    }

    function formIsValid() {
        const errors = {};
        if (!year.year) errors.user_id = "Year is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        AddYear(year)
            .then(response => {
                toast.success("Successfully added reporting year");
                history.push("/")
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
        <div className="add-area-year-form">
            <form className="" onSubmit={handleSave}>
                <h2 className="font-bold text-lg mb-4 text-center">Add Year</h2>
                {errors.onSave && (
                    <div className="text-red-500 text-xs p-1" role="alert">
                        {errors.onSave}
                    </div>
                )}
                <div className="mb-6">
                    <TextInput
                        name="year"
                        label="Year"
                        value={year.year}
                        onChange={handleChange}
                        error={errors.year}
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

export default AddYearPage;
