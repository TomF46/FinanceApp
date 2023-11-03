import axiosClient from '../tools/axiosClient';

export function Login(userLoginDetails) {
  return axiosClient
    .post('/api/auth/login', userLoginDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function RegisterRetailer(userRegistrationDetails) {
  return axiosClient
    .post('/api/retailer/register', userRegistrationDetails)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function RegisterAreaManager(userRegistrationDetails) {
  return axiosClient
    .post('/api/area/register', userRegistrationDetails)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function RegisterHeadOffice(userRegistrationDetails) {
  return axiosClient
    .post('/api/headoffice/register', userRegistrationDetails)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCurrentUser() {
  return axiosClient
    .get('/api/auth/user')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getUserIsAdmin() {
  return axiosClient
    .get('/api/me/isAdmin')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function ChangePassword(passwordChangeDetails) {
  return axiosClient
    .post('/api/auth/changePassword', passwordChangeDetails)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}
