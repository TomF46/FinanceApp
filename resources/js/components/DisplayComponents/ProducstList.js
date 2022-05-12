import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MoneyFormat from "./MoneyFormat";

const ProductsList = ({ products, onProductDeactivate }) => {
    return (
        <div>
            {products.length > 0 ? (
                products.map((product) => {
                    return (
                        <div key={product.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                            <div className="col-span-2 lg:col-span-4">
                                <p className="text-sm text-gray-600">Name:</p>
                                <Link to={`/admin/products/${product.id}`} className="font-bold text-primary hover:text-secondary text-lg items-center pointer">{product.name}</Link>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-600">Code:</p>
                                <p>{product.productCode}</p>
                            </div>
                            <div className="col-span-3">
                                <p className="text-sm text-gray-600">Unit cost:</p>
                                <p><MoneyFormat value={product.cost} /></p>
                            </div>
                            <div className="col-span-3">
                                <p className="text-sm text-gray-600">Sale price:</p>
                                <p><MoneyFormat value={product.price} /></p>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p className="p-4 text-center">No products have been added</p>
            )}
        </div >
    );
};

ProductsList.propTypes = {
    products: PropTypes.array.isRequired,
    onProductDeactivate: PropTypes.func.isRequired
};

export default ProductsList;
