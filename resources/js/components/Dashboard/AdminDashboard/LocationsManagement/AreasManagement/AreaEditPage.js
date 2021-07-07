import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import history from "../../../../../history";
import AreaManageForm from "./AreaManageForm";
import { editArea, getAreaById } from "../../../../../api/areasApi"
import LoadingMessage from "../../../../DisplayComponents/LoadingMessage";

const AreaEditPage = ({ areaId }) => {

    const [area, setArea] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getAreaById(areaId).then(areaData => {
            setArea(areaData);
        }).catch(error => {
            toast.error("Error getting area " + error.message, {
                autoClose: false,
            });
        });
    }, [areaId]);

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

        editArea(area.id, area).then(response => {
            toast.success("Area updated");
            history.push(`/admin/locations/areas/${area.id}`);
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
        <div className="area-edit-form">
            {!area ? (
                <LoadingMessage message={"Loading Area"} />
            ) : (
                <AreaManageForm area={area} errors={errors} onChange={handleChange} onSave={handleSave} saving={saving} />
            )}
        </div>
    );
};


AreaEditPage.propTypes = {
    areaId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        areaId: ownProps.match.params.areaId,
    };
};


export default connect(mapStateToProps)(AreaEditPage);

