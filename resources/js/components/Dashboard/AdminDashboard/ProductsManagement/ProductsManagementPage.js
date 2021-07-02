import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deactivateProductById, getAllProducts } from "../../../../api/productsApi";
import history from "../../../../history";
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

    function handleDeactivate(id) {
        confirmAlert({
            title: "Confirm deactivation",
            message: `Are you sure you want to deactivate this product?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        deactivate(id)
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function deactivate(id) {
        deactivateProductById(id).then(response => {
            toast.success("Product deactivated");
            getProducts();
        }).catch(error => {
            toast.error("Error deactivating product" + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="products-management">
            <p className="text-center">Products Management</p>
            <div className="my-4">
                <Link to={`/admin/products/add`} className="bg-primary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Add Product</Link>
            </div>
            {products && (
                <div className="mb-4">
                    <div className="my-8">
                        <div className="my-2 card shadow-sm rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Products</p>
                            </div>
                            <div>
                                <ProductsList products={products} onProductDeactivate={handleDeactivate} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsManagementPage;
