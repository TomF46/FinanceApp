import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../FormComponents/TextInput";
import SelectInput from "../../../../FormComponents/SelectInput";

const RetailLocationManageForm = ({
    retailLocation,
    areas,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="" onSubmit={onSave}>
            <div className="my-8">
                <div className="my-2 card shadow-md rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">{retailLocation.id ? "Edit" : "Add"} Retail Location</p>
                    </div>
                    <div className="p-2">
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
                        
                        {retailLocation.area_id && (
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

RetailLocationManageForm.propTypes = {
    retailLocation: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default RetailLocationManageForm;
