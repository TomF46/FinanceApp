import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../FormComponents/TextInput";
import MoneyInput from "../../../FormComponents/MoneyInput";
import TextAreaInput from "../../../FormComponents/TextAreaInput";

const ProductManageForm = ({
    product,
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
                        <p className="text-white font-bold text-lg px-2 py-1">Creat Product</p>
                    </div>
                    <div className="p-2">
                        {errors.onSave && (
                            <div className="text-red-500 text-xs p-1" role="alert">
                                {errors.onSave}
                            </div>
                        )}

                        <div className="mb-2">
                            <TextInput
                                name="name"
                                label="Name"
                                value={product.name}
                                onChange={onChange}
                                error={errors.name}
                                required={true}
                            />
                        </div>

                        <div className="mb-2">
                            <TextAreaInput
                                name="description"
                                label="Description"
                                value={product.description}
                                onChange={onChange}
                                error={errors.description}
                                required={true}
                            />
                        </div>

                        <div className="mb-2">
                            <TextInput
                                name="productCode"
                                label="Product Code"
                                value={product.productCode}
                                onChange={onChange}
                                error={errors.productCode}
                                required={true}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="cost"
                                label="Unit cost (£)"
                                value={product.cost}
                                onChange={onChange}
                                error={errors.cost}
                                required={true}
                            />
                        </div>

                        <div className="mb-2">
                            <MoneyInput
                                name="price"
                                label="Sale price (£)"
                                value={product.price}
                                onChange={onChange}
                                error={errors.price}
                                required={true}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75"
                            >
                                {saving ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

ProductManageForm.propTypes = {
    product: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default ProductManageForm;
