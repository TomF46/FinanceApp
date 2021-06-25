import axiosClient from "../tools/axiosClient";

export function AddProduct(product) {
    return axiosClient
        .post("/api/products", product)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getAllProducts() {
    return axiosClient
        .get('/api/products')
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getProductById(id) {
    return axiosClient
        .get(`/api/products/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function editProduct(productId, product) {
    return axiosClient
        .put(`/api/products/${productId}`, product)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}


export function deactivateProductById(id) {
    return axiosClient
        .post(`/api/products/${id}/deactivate`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
