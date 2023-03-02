import axiosClient from "../tools/axiosClient";

export function getOverview() {
    return axiosClient
        .get(`/api/overview`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getYearByYearProfitBarChart() {
    return axiosClient
        .get(`/api/overview/yearByYearProfitBarChart`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getYearByYearCSV() {
    return axiosClient
        .get(`/api/overview/downloads/yearByYear`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getAllApplicationsCSV() {
    return axiosClient
        .get(`/api/overview/downloads/applications`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}