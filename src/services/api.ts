const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  get: async (endpoint: string) => {
    // Placeholder GET
    return fetch(`${API_BASE_URL}${endpoint}`);
  },
  post: async (endpoint: string, data: any) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  patch: async (endpoint: string, data: any) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  put: async (endpoint: string, data: any) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  delete: async (endpoint: string) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
  },
};
