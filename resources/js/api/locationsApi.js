import axiosClient from "../tools/axiosClient";

export function getAreaById(id) {
    return axiosClient
        .get(`/api/areas/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

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

export function CreateArea(area) {
    return axiosClient
        .post("/api/areas", area)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function CreateRetailLocation(retailLocation) {
    return axiosClient
        .post("/api/retailLocations", retailLocation)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getAreas() {
    return axiosClient
        .get('/api/areas')
        .then(response => {
            let areas = response.data.map(area => {
                return { value: area.id, text: area.name }
            });
            return areas;
        })
        .catch(error => {
            throw error;
        });
}

export function getAreasPaginated() {
    return getAreasWithUrl(`/api/areas?`);
}

export function getAreasWithPaginator(url) {
    return getAreasWithUrl(url);
}

export function getAreasWithUrl(url) {
    return axiosClient
        .get(`${url}&paginated=true`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
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

export function AddAreaManager(area, manager) {
    return axiosClient
        .post(`/api/areas/${area.id}/managers`, manager)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function RemoveAreaManager(area, id) {
    return axiosClient
        .post(`/api/areas/${area.id}/managers/${id}/remove`)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function AddRetailManager(retailLocation, manager) {
    return axiosClient
        .post(`/api/retailLocations/${retailLocation.id}/managers`, manager)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw error.response;
        });
}

export function RemoveRetailManager(retailLocation, id) {
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

export function deactivateAreaById(id) {
    return axiosClient
        .post(`/api/areas/${id}/deactivate`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function editArea(areaId, area) {
    return axiosClient
        .put(`/api/areas/${areaId}`, area)
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

export function searchAreas(searchBody) {
    return axiosClient
        .post(`/api/areas/search`, searchBody)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        });
}

export function searchAreasWithPage(url, searchBody) {
    return axiosClient
        .post(url, searchBody)
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
