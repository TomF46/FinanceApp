import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../../FormComponents/TextInput";
import MoneyInput from "../../../FormComponents/MoneyInput";

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
                <div className="my-2 card shadow-sm rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">Creat Product</p>
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
                                value={product.name}
                                onChange={onChange}
                                error={errors.name}
                            />
                        </div>

                        <div className="mb-6">
                            <TextInput
                                name="productCode"
                                label="Product Code"
                                value={product.productCode}
                                onChange={onChange}
                                error={errors.productCode}
                            />
                        </div>


                        <div className="mb-6">
                            <MoneyInput
                                name="price"
                                label="Price"
                                value={product.price}
                                onChange={onChange}
                                error={errors.price}
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
