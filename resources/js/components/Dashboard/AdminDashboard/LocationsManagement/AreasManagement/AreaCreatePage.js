import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import history from "../../../../../history";
import AreaManageForm from "./AreaManageForm";
import { CreateArea } from "../../../../../api/locationsApi"

const AreaCreatePage = () => {

    const [area, setArea] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setArea(prevArea => ({
            ...prevArea,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name } = area;
        const errors = {};
        if (!name) errors.name = "Name is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        CreateArea(area).then(response => {
            toast.success("Area created");
            history.push(`/admin/locations`);
        })
            .catch(err => {
                setSaving(false);
                toast.error("Error creating area", {
                    autoClose: false
                });
                let tempErrors = { ...errors };
                tempErrors.onSave = err.message;
                setErrors({ ...tempErrors });
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
        <div className="area-create-form">
            <AreaManageForm area={area} errors={errors} onChange={handleChange} onSave={handleSave} saving={saving} />
        </div>
    );
};


export default AreaCreatePage;
