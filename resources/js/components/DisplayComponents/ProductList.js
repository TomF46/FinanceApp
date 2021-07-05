import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductsList = ({ products, onProductDeactivate }) => {
    return (
        <div>
            {products.length > 0 ? (
                products.map((product) => {
                    return (
                        <div key={product.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                            <div className="col-span-6 lg:col-span-2">
                                <p className="text-sm text-gray-600">Name:</p>
                                <p className="font-medium text-lg items-center">{product.name}</p>
                            </div>
                            <div className="lg:block col-span-2">
                                <p className="text-sm text-gray-600">Code:</p>
                                <p>{product.productCode}</p>
                            </div>
                            <div className="lg:block col-span-2">
                                <p className="text-sm text-gray-600">Unit cost:</p>
                                <p>{product.cost}</p>
                            </div>
                            <div className="lg:block col-span-2">
                                <p className="text-sm text-gray-600">Sale price:</p>
                                <p>{product.price}</p>
                            </div>
                            <div className="lg:block col-span-2">
                                <div className="table vertical-centered">
                                    <Link
                                        to={`/admin/products/${product.id}/edit`}
                                        className="bg-primary text-center text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center ml-2"
                                    >
                                        <p className="m-auto">Edit</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:block col-span-2">
                                <div className="table vertical-centered">
                                    <button
                                        onClick={() => (onProductDeactivate(product.id))}
                                        className="bg-red-800 text-center text-white rounded py-2 px-4 hover:bg-red-600 shadow inline-flex items-center ml-2"
                                    >
                                        <p className="m-auto">Remove</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p className="p-1 text-center">No products have been added</p>
            )}
        </div >
    );
};

ProductsList.propTypes = {
    products: PropTypes.array.isRequired,
    onProductDeactivate: PropTypes.func.isRequired
};

export default ProductsList;
