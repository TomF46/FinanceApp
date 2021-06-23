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

export function getUsersPage(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getCurrentUser() {
    return axiosClient
        .get("/api/auth/user")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUserById(id) {
    return axiosClient
        .get(`/api/users/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getUsersWithPaginator(url) {
    return axiosClient
        .get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function getAreaManagers() {
    return axiosClient
        .get("/api/areaManagers")
        .then(response => {
            let areaManagers = response.data.map(manager => {
                return { value: manager.id, text: manager.fullName }
            });
            return areaManagers;
        })
        .catch(error => {
            throw error;
        });
}

export function getRetailManagers() {
    return axiosClient
        .get("/api/retailManagers")
        .then(response => {
            let retailManagers = response.data.map(manager => {
                return { value: manager.id, text: manager.fullName }
            });
            return retailManagers;
        })
        .catch(error => {
            throw error;
        });
}

export function getRetailManagerById(id) {
    return axiosClient
        .get(`/api/retailManagers/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

