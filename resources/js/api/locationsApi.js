import axiosClient from "../tools/axiosClient";

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