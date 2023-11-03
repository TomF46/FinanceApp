import axiosClient from '../tools/axiosClient';

export function AddProduct(product) {
  return axiosClient
    .post('/api/products', product)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getAllProducts() {
  return axiosClient
    .get('/api/products')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function searchProducts(searchBody) {
  return axiosClient
    .post(`/api/products/search`, searchBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function searchProductsWithPage(url, searchBody) {
  return axiosClient
    .post(url, searchBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getProductssWithPage(url) {
  return axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getProductById(id) {
  return axiosClient
    .get(`/api/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function editProduct(productId, product) {
  return axiosClient
    .put(`/api/products/${productId}`, product)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function deactivateProductById(id) {
  return axiosClient
    .post(`/api/products/${id}/deactivate`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getSalesData() {
  return axiosClient
    .get(`/api/products/salesData`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
