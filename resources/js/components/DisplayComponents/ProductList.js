import React from "react";
import PropTypes from "prop-types";

const ProductsList = ({ products }) => {
    return (
        <div>
            {products.map((product) => {
                return (
                    <div key={product.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <p className="font-medium text-lg items-center">{product.name}</p>
                        </div>
                        <div className="lg:block col-span-4">
                            <p className="text-sm text-gray-600">Code:</p>
                            <p>{product.productCode}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">Price:</p>
                            <p>{product.price}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">TBC:</p>
                            <p>TBC</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductsList;
