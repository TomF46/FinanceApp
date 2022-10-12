import axiosClient from "../tools/axiosClient";

export function getYears() {
    return axiosClient
        .get('/api/years')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getYearById(id) {
    return axiosClient
        .get(`/api/years/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function AddYear(year) {
    return axiosClient
        .post(`/api/years`, year)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getYearRetailBarChart(id) {
    return axiosClient
        .get(`/api/years/${id}/graphs/retailProfitBarChart`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getProfitPieChart(id) {
    return axiosClient
        .get(`/api/years/${id}/graphs/retailProfitPieChart`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getYearAreasBarChart(id) {
    return axiosClient
        .get(`/api/years/${id}/graphs/areasProfitBarChart`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function publishYear(yearId){
    return axiosClient
        .post(`/api/years/${yearId}/publish`, {})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
