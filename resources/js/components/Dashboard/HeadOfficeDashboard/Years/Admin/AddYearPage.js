import React, { useState } from "react";
import { toast } from "react-toastify";
import { AddYear } from "../../../../../api/yearsApi";
import YearInput from "../../../../FormComponents/YearInput";
import { useHistory } from "react-router-dom";

const AddYearPage = () => {
    const history = useHistory();
    const [year, setYear] = useState({
        year: "",
        publish: false
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

    function handleSave(publish) {
        if (!formIsValid()) return;
        setSaving(true);

        let yearToPost = { ...year };
        yearToPost.publish = publish;

        AddYear(yearToPost)
            .then(response => {
                toast.success(`Year ${publish ? 'published' : 'saved'}`);
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
            <form>
                <div className="my-8">
                    <div className="my-2 card shadow-md rounded-md">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">Add Year</p>
                        </div>
                        <div className="p-2">
                            <p className="my-2">Add a new reporting year below, please enter the year that will be covered by these applications. Applications will be sent to retailers once you choose to publish.</p>
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

                            <div className="grid grid-cols-12 justify-between">
                            <div className="col-span-6">
                                <button
                                    type="submit"
                                    onClick={() =>{handleSave(false)}}
                                    disabled={saving}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                            <div className="col-span-6">
                                <button
                                    type="submit"
                                    onClick={() =>{handleSave(true)}}
                                    disabled={saving}
                                    className="bg-secondary text-white rounded py-2 px-4 hover:opacity-75 float-right"
                                >
                                    {saving ? "Publishing..." : "Save & Publish"}
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddYearPage;
