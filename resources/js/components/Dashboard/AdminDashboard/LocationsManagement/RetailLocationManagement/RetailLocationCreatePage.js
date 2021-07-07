import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import history from "../../../../../history";
import RetailLocationManageForm from "./RetailLocationManageForm";
import { createRetailLocation } from "../../../../../api/retailLocationsApi"
import { getAreas } from "../../../../../api/areasApi";

const RetailLocationCreatePage = () => {

    const [retailLocation, setRetailLocation] = useState({
        name: "",
        location: "",
        area_id: null
    });
    const [areas, setAreas] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!areas) {
            getAreas().then(areaData => {
                setAreas(areaData);
            });
        }
    }, [areas]);

    function handleChange(event) {
        const { name, location, area_id, value } = event.target;
        setRetailLocation(prevRetailLocation => ({
            ...prevRetailLocation,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name, location, area_id } = retailLocation;
        const errors = {};
        if (!name) errors.name = "Name is required";
        if (!location) errors.location = "Location is required";
        if (!area_id) errors.area_id = "Area is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        createRetailLocation(retailLocation).then(response => {
            toast.success("Retail location created");
            history.push(`/admin/locations`);
        })
            .catch(err => {
                setSaving(false);
                toast.error("Error creating retail location", {
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
        <div className="retailLocation-create-form">
            {areas && (
                <RetailLocationManageForm retailLocation={retailLocation} errors={errors} onChange={handleChange} onSave={handleSave} saving={saving} areas={areas} />
            )}
        </div>
    );
};


export default RetailLocationCreatePage;
