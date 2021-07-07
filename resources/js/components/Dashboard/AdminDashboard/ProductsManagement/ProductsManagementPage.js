import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deactivateProductById, searchProducts, searchProductsWithPage } from "../../../../api/productsApi";
import ProductsListWithPagination from "../../../DisplayComponents/ProductsListWithPagination";
import _, { debounce } from 'lodash';
import ProductsSearchForm from "../../../DisplayComponents/ProductsSearchForm";


const ProductsManagementPage = () => {
    const [productsPaginator, setProductsPaginator] = useState(null);
    const [searchTerms, setSearchTerms] = useState({ name: "", productCode: "" });

    useEffect(() => {
        if (!productsPaginator) {
            search();
        }
    }, [productsPaginator]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerms]);

    function search() {
        searchProducts(searchTerms).then(productsData => {
            setProductsPaginator(productsData);
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

    function getProductsPage(url) {
        searchProductsWithPage(url, searchTerms).then(productsData => {
            setProductsPaginator(productsData);
        }).catch(error => {
            toast.error("Error getting products " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleSearchTermsChange(event) {
        const { name, value } = event.target;

        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [name]: value
        }));
    }

    return (
        <div className="products-management">
            <h1 className="text-center font-bold text-4xl">Products Management</h1>
            <div className="my-4 card shadow-md rounded-md">
                <div className="bg-secondary rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                </div>
                <div className="px-2 py-4">
                    <Link to={`/admin/products/add`} className="bg-secondary hover:opacity-75 text-white font-bold py-2 px-4 rounded pointer mr-2">Add Product</Link>
                </div>
            </div>
            <ProductsSearchForm searchTerms={searchTerms} onSearchTermsChange={handleSearchTermsChange} />
            {productsPaginator && (
                <div className="mb-4">
                    <div className="my-8">
                        <div className="my-2 card shadow-md rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Products</p>
                            </div>
                            <div>
                                <ProductsListWithPagination paginationData={productsPaginator} onProductDeactivate={handleDeactivate} onPageChange={getProductsPage} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsManagementPage;
