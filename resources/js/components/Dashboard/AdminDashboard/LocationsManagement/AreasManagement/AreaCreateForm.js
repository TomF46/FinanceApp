import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../FormComponents/TextInput";

const AreaCreateForm = ({
    area,
    onSave,
    onChange,
    saving = false,
    errors = {}
}) => {
    return (
        <form className="" onSubmit={onSave}>
            <h2 className="font-bold text-lg mb-4 text-center">Creat Area</h2>
            {errors.onSave && (
                <div className="text-red-500 text-xs p-1" role="alert">
                    {errors.onSave}
                </div>
            )}

            <div className="mb-6">
                <TextInput
                    name="name"
                    label="Name"
                    value={area.name}
                    onChange={onChange}
                    error={errors.name}
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

AreaCreateForm.propTypes = {
    area: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default AreaCreateForm;
