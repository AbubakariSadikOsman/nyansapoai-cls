import { API_ENDPOINTS } from '../utils/constants';

// Use your machine's IP address instead of localhost for React Native
const API_BASE_URL = 'http://172.20.10.9:3000';

class ApiService {
  async request(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getClassProfile() {
    try {
      return this.request(API_ENDPOINTS.CLASS_PROFILE);
    } catch (error) {
      console.log('API request failed, using mock class data:', error);
      return null;
    }
  }

  async getStudents(studentId = null) {
    try {
      const endpoint = studentId 
        ? `${API_ENDPOINTS.STUDENTS}?id=${studentId}`
        : API_ENDPOINTS.STUDENTS;
      return this.request(endpoint);
    } catch (error) {
      console.log('API request failed, using mock data:', error);
      return null;
    }
  }

  async searchStudents(query) {
    return this.request(`${API_ENDPOINTS.STUDENTS}?name_like=${query}`);
  }
}

export default new ApiService();
