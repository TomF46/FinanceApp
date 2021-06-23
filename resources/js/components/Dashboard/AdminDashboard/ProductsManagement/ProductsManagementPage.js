import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../../api/productsApi";
import ProductsList from "../../../DisplayComponents/ProductList";


const ProductsManagementPage = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (!products) {
            getProducts();
        }
    }, [products])

    function getProducts() {
        getAllProducts().then(productsData => {
            setProducts(productsData);
        }).catch(error => {
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="products-management">
            <p className="text-center">Products Management</p>
            <div className="my-4">
                <Link to={`/admin/products/add`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">Add Product</Link>
            </div>
            {products && (
                <div className="mb-4">
                    <ProductsList products={products} />
                </div>
            )}
        </div>
    );
};

export default ProductsManagementPage;
