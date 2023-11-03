import axiosClient from '../tools/axiosClient';

export function getUsers() {
  return axiosClient
    .get('/api/users')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function searchUsers(searchBody) {
  return axiosClient
    .post(`/api/users/search`, searchBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getUsersPage(url) {
  return axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function searchUsersWithPage(url, searchBody) {
  return axiosClient
    .post(url, searchBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getCurrentUser() {
  return axiosClient
    .get('/api/auth/user')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getUserById(id) {
  return axiosClient
    .get(`/api/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getUsersWithPaginator(url) {
  return axiosClient
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getAreaManagers() {
  return axiosClient
    .get('/api/areaManagers')
    .then((response) => {
      let areaManagers = response.data.map((manager) => {
        return { value: manager.id, text: manager.fullName };
      });
      return areaManagers;
    })
    .catch((error) => {
      throw error;
    });
}

export function getAreaManagerById(id) {
  return axiosClient
    .get(`/api/areaManagers/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getRetailManagers() {
  return axiosClient
    .get('/api/retailManagers')
    .then((response) => {
      let retailManagers = response.data.map((manager) => {
        return { value: manager.id, text: manager.fullName };
      });
      return retailManagers;
    })
    .catch((error) => {
      throw error;
    });
}

export function getRetailManagerById(id) {
  return axiosClient
    .get(`/api/retailManagers/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function deactivateUserById(id) {
  return axiosClient
    .post(`/api/users/${id}/deactivate`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function editUser(userId, user) {
  return axiosClient
    .put(`/api/users/${userId}`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function changeUserPassword(id, passwordData) {
  return axiosClient
    .post(`/api/users/${id}/changePassword`, passwordData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
