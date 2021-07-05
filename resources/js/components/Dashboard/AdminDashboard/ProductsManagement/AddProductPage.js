import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AddProduct } from "../../../../api/productsApi";
import history from "../../../../history"
import ProductManageForm from "./ProductManageForm";

const AddProductPage = () => {

    const [product, setProduct] = useState({
        name: "",
        productCode: "",
        cost: 0,
        price: 0
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        if (name == "price" || name == "cost") {
            if (!isValidMoney(value)) return;
        }

        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name, productCode, cost, price } = product;
        const errors = {};
        if (!name) errors.name = "Name is required";
        if (!productCode) errors.productCode = "Product code is required";
        if (!cost) errors.cost = "Cost is required";
        if (!price) errors.price = "Price is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        AddProduct(product).then(response => {
            toast.success("Product added");
            history.push(`/admin/products`);
        })
            .catch(err => {
                setSaving(false);
                toast.error("Error creating product", {
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

    function isValidMoney(value) {
        let $decimals = 0;
        if ((value % 1) != 0)
            $decimals = value.toString().split(".")[1].length;

        return $decimals <= 2
    }

    return (
        <div className="product-create-form">
            <ProductManageForm product={product} errors={errors} onChange={handleChange} onSave={handleSave} saving={saving} />
        </div>
    );
};


export default AddProductPage;
