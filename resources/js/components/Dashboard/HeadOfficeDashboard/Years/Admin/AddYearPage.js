import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { AddYear } from "../../../../../api/yearsApi";
import history from "../../../../../history";
import YearInput from "../../../../FormComponents/YearInput";

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
                toast.error(err, {
                    autoClose: false,
                });
            });
    }


    return (
        <div className="add-area-year-form">
            <form className="" onSubmit={handleSave}>
                <div className="my-8">
                    <div className="my-2 card shadow-md rounded-md">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">Add Year</p>
                        </div>
                        <div className="p-2">
                            {errors.onSave && (
                                <div className="text-red-500 text-xs p-1" role="alert">
                                    {errors.onSave}
                                </div>
                            )}
                            <div className="mb-6">
                                <YearInput
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
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                                >
                                    {saving ? "Adding..." : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddYearPage;
