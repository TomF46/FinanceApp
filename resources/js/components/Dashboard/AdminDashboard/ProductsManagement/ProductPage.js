import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { deactivateProductById, getProductById } from "../../../../api/productsApi";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import MoneyFormat from "../../../DisplayComponents/MoneyFormat";

const ProductPage = ({ productId, history }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(productId).then(productData => {
            setProduct(productData);
        }).catch(error => {
            toast.error("Error getting product " + error.message, {
                autoClose: false,
            });
        });
    }, [productId]);

    function deactivate(id) {
        deactivateProductById(id).then(response => {
            toast.success("Product deactivated");
            history.push('/admin/products');
        }).catch(error => {
            toast.error("Error deactivating product" + error.message, {
                autoClose: false,
            });
        });
    }

    function edit() {
        history.push(`/admin/products/${product.id}/edit`);
    }

    return (
        <div className="product-edit-form">
            {!product ? (
                <LoadingMessage message={"Loading Product"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {product.name}
                    </h1>
                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">{product.name} Info</p>
                            </div>
                            <div className="px-2 py-1">
                                <p><span className="font-bold">Name:</span> {product.name}</p>
                                <p><span className="font-bold">Description:</span> {product.description}</p>
                                <p><span className="font-bold">Product code:</span> {product.productCode}</p>
                                <p><span className="font-bold">Unit cost:</span> <MoneyFormat value={product.cost} /></p>
                                <p><span className="font-bold">Sale price:</span> <MoneyFormat value={product.price} /></p>
                            </div>
                        </div>
                    </div>

                    <div className="my-4 card shadow-md rounded-md">
                        <div className="bg-secondary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                        </div>
                        <div className="px-2 py-4">
                            <button
                                onClick={() => edit()}
                                className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => (deactivate(product.id))}
                                className="bg-danger hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


ProductPage.propTypes = {
    productId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        productId: ownProps.match.params.productId,
    };
};


export default connect(mapStateToProps)(ProductPage);

