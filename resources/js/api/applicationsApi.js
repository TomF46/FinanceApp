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

export function acceptApplication(application) {
    return axiosClient
        .post(`/api/applications/${application.id}/accept`)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function rejectApplication(application, message) {
    return axiosClient
        .post(`/api/applications/${application.id}/reject`, message)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getRejectionMessage(application) {
    return axiosClient
        .get(`/api/applications/${application.id}/showRejectMessage`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getInvestment(application) {
    return axiosClient
        .get(`/api/applications/${application.id}/investment`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getPaginationPage(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function setApplicationPriority(applicationId, priority){
    return axiosClient
        .post(`/api/applications/${applicationId}/priority`, {priority: priority})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
