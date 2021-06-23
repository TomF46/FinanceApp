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
