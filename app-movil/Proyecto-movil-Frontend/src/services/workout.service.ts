// src/services/workout.service.ts
import api from './api.service';

export interface Workout {
  id: string;
  userId: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const getWorkoutsByDateRange = async (startDate: string, endDate: string): Promise<Workout[]> => {
  try {
    // Get user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }

    const response = await api.get('/workout/by-date-range', {
      params: {
        userId: user.id,
        startDate,
        endDate
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching workouts by date range:', error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  try {
    await api.delete(`/workout/${workoutId}`);
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};

export default {
  getWorkoutsByDateRange,
  deleteWorkout
};