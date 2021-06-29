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

export function submitApplication(application) {
    return axiosClient
        .post(`/api/applications/${application.applicationId}`, application)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}
