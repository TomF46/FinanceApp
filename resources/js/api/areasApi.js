import axiosClient from '../tools/axiosClient';

export function getAreaById(id) {
  return axiosClient
    .get(`/api/areas/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getAreaDataById(id) {
  return axiosClient
    .get(`/api/areas/${id}/data`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getAreas() {
  return axiosClient
    .get('/api/areas')
    .then((response) => {
      let areas = response.data.map((area) => {
        return { value: area.id, text: area.name };
      });
      return areas;
    })
    .catch((error) => {
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
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function searchAreas(searchBody) {
  return axiosClient
    .post(`/api/areas/search`, searchBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function searchAreasWithPage(url, searchBody) {
  return axiosClient
    .post(url, searchBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function createArea(area) {
  return axiosClient
    .post('/api/areas', area)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editArea(areaId, area) {
  return axiosClient
    .put(`/api/areas/${areaId}`, area)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function deactivateAreaById(id) {
  return axiosClient
    .post(`/api/areas/${id}/deactivate`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function addAreaManager(area, manager) {
  return axiosClient
    .post(`/api/areas/${area.id}/managers`, manager)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeAreaManager(area, id) {
  return axiosClient
    .post(`/api/areas/${area.id}/managers/${id}/remove`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getYearByYearProfitBarChart(id) {
  return axiosClient
    .get(`/api/areas/${id}/graphs/yearByYearProfitBarChart`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getRetailerProfitContributionBarChart(id) {
  return axiosClient
    .get(`/api/areas/${id}/graphs/retailerProfitContributionBarChart`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getAreaApplicationsCSV(id) {
  return axiosClient
    .get(`/api/areas/${id}/downloads/applications`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
