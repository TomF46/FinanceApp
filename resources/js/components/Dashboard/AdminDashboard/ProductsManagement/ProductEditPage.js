import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ProductManageForm from "./ProductManageForm";
import { editProduct, getProductById } from "../../../../api/productsApi";
import history from "../../../../history";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";

const ProductEditPage = ({ productId }) => {
    const [product, setProduct] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getProductById(productId).then(productData => {
            setProduct(productData);
        }).catch(error => {
            toast.error("Error getting product " + error.message, {
                autoClose: false,
            });
        });
    }, [productId]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    }

    function formIsValid() {
        const { name, description, productCode, cost, price } = product;
        const errors = {};
        if (!name) errors.name = "Name is required";
        if (!description) errors.name = "Description is required";
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

        editProduct(product.id, product).then(response => {
            toast.success("Product updated");
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

    return (
        <div className="product-edit-form">
            {!product ? (
                <LoadingMessage message={"Loading Product"} />
            ) : (
                <ProductManageForm product={product} errors={errors} onChange={handleChange} onSave={handleSave} saving={saving} />
            )}
        </div>
    );
};


ProductEditPage.propTypes = {
    productId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        productId: ownProps.match.params.productId,
    };
};


export default connect(mapStateToProps)(ProductEditPage);

