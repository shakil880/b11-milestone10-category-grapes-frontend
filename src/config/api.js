// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Tasks
  TASKS: `${API_BASE_URL}/tasks`,
  FEATURED_TASKS: `${API_BASE_URL}/tasks/featured`,
  TASK_BY_ID: (id) => `${API_BASE_URL}/tasks/${id}`,
  MY_TASKS: (email) => `${API_BASE_URL}/my-tasks/${email}`,
  
  // Bids
  BIDS: `${API_BASE_URL}/bids`,
  BIDS_BY_TASK: (taskId) => `${API_BASE_URL}/bids/${taskId}`,
  MY_BIDS: (email) => `${API_BASE_URL}/my-bids/${email}`,
  BID_STATUS: (bidId) => `${API_BASE_URL}/bids/${bidId}/status`,
  
  // Utility
  STATS: `${API_BASE_URL}/stats`,
  SEARCH_TASKS: `${API_BASE_URL}/search/tasks`,
  SEED_DATA: `${API_BASE_URL}/seed-data`,
};

// Default fetch options
export const DEFAULT_FETCH_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// API Helper functions
export const apiRequest = {
  get: async (url) => {
    const response = await fetch(url, DEFAULT_FETCH_OPTIONS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  post: async (url, data) => {
    const response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  put: async (url, data) => {
    const response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  delete: async (url) => {
    const response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  patch: async (url, data) => {
    const response = await fetch(url, {
      ...DEFAULT_FETCH_OPTIONS,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};

export default API_BASE_URL;