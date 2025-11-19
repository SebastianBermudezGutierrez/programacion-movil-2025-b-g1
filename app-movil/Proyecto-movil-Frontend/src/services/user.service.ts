// src/services/user.service.ts
import api from './api.service';

interface RegisterUserData {
  name: string;
  identification: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const userService = {
  async register(userData: RegisterUserData) {
    try {
      const response = await api.post('/user', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store the token in localStorage or your preferred storage
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async createWorkout(workoutData: { date: string; exercises: any[] }) {
    try {
      // Get user from localStorage
      const userString = localStorage.getItem('user');
      if (!userString) {
        throw new Error('User not authenticated');
      }
      
      const user = JSON.parse(userString);
      const payload = {
        ...workoutData,
        userId: user.id
      };
      
      const response = await api.post('/workout', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  }
};