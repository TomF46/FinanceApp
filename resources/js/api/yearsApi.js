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