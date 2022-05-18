import axiosClient from "../tools/axiosClient";

export function getRetailLocationById(id) {
    return axiosClient
        .get(`/api/retailLocations/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getRetailLocationDataById(id) {
    return axiosClient
        .get(`/api/retailLocations/${id}/data`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}


export function createRetailLocation(retailLocation) {
    return axiosClient
        .post("/api/retailLocations", retailLocation)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getRetailLocationsPaginated() {
    return getRetailLocationsWithUrl(`/api/retailLocations?`);
}

export function getRetailLocationsWithPaginator(url) {
    return getRetailLocationsWithUrl(url);
}

export function getRetailLocationsWithUrl(url) {
    return axiosClient
        .get(`${url}&paginated=true`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function addRetailManager(retailLocation, manager) {
    return axiosClient
        .post(`/api/retailLocations/${retailLocation.id}/managers`, manager)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function removeRetailManager(retailLocation, id) {
    return axiosClient
        .post(`/api/retailLocations/${retailLocation.id}/managers/${id}/remove`)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function deactivateRetailLocationById(id) {
    return axiosClient
        .post(`/api/retailLocations/${id}/deactivate`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}


export function editRetailLocation(locationId, location) {
    return axiosClient
        .put(`/api/retailLocations/${locationId}`, location)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchRetailLocations(searchBody) {
    return axiosClient
        .post(`/api/retailLocations/search`, searchBody)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchRetailLocationsWithPage(url, searchBody) {
    return axiosClient
        .post(url, searchBody)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}
