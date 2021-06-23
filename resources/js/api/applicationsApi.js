import axiosClient from "../tools/axiosClient";

export function getApplicationById(id) {
    return axiosClient
        .get(`/api/applications/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
