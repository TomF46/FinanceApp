import axiosClient from "../tools/axiosClient";

export function getUsers() {
    return axiosClient
        .get("/api/users")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUserIsAdmin() {
    return axiosClient
        .get('/api/me/isAdmin')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
