import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../FormComponents/TextInput";
import SelectInput from "../../../../FormComponents/SelectInput";

const RetailLocationCreateForm = ({
    retailLocation,
    areas,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">Creat Retail Location</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-6">
                <TextInput
                    name="name"
                    label="Name"
                    value={retailLocation.name}
                    onChange={onChange}
                    error={errors.name}
                />
            </div>

            <div className="mb-6">
                <TextInput
                    name="location"
                    label="Location"
                    value={retailLocation.location}
                    onChange={onChange}
                    error={errors.location}
                />
            </div>

            <div className="mb-6">
                <SelectInput
                    name="area_id"
                    label="Area"
                    value={retailLocation.area_id}
                    options={areas}
                    onChange={onChange}
                    error={errors.area_id}
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-gray-800 text-white rounded py-2 px-4 hover:bg-gray-600"
                >
                    {saving ? "Creating..." : "Create"}
                </button>
            </div>
        </form>
    );
};

RetailLocationCreateForm.propTypes = {
    retailLocation: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default RetailLocationCreateForm;
