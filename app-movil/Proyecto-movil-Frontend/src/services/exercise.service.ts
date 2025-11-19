import api from './api.service';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscle: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseRecord {
  workoutId: string;
  exerciseId: string;
  reps: number;
  sets: number;
}

export interface RoutineExercise {
  id: string;
  workoutId: string;
  exerciseId: string;
  reps: number;
  sets: number;
  createdAt: string;
  updatedAt: string;
  exercise: Exercise;
  workout: {
    id: string;
    userId: string;
    date: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Servicio para manejar las operaciones relacionadas con ejercicios
 */
const exerciseService = {
  /**
   * Obtiene la lista de ejercicios disponibles
   * @returns {Promise<Exercise[]>} Lista de ejercicios
   */
  getExercises: async (): Promise<Exercise[]> => {
    try {
      const response = await api.get('/exercise');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ejercicios:', error);
      throw error;
    }
  },

  /**
   * Obtiene los ejercicios de una rutina específica
   * @param {string} workoutId - ID del entrenamiento
   * @returns {Promise<RoutineExercise[]>} Lista de ejercicios de la rutina
   */
  getRoutineExercises: async (workoutId: string): Promise<RoutineExercise[]> => {
    try {
      const response = await api.get(`/routine-exercise/workout/${workoutId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ejercicios de la rutina:', error);
      throw error;
    }
  },

  /**
   * Crea un nuevo registro de ejercicio
   * @param {ExerciseRecord} recordData - Datos del registro de ejercicio
   * @returns {Promise<any>} Respuesta del servidor
   */
  createExerciseRecord: async (recordData: ExerciseRecord): Promise<any> => {
    try {
      const response = await api.post('/exercise-record', recordData);
      return response.data;
    } catch (error) {
      console.error('Error creating exercise record:', error);
      throw error;
    }
  },

  /**
   * Elimina un registro de ejercicio
   * @param {string} recordId - ID del registro a eliminar
   * @returns {Promise<void>}
   */
  deleteExerciseRecord: async (recordId: string): Promise<void> => {
    try {
      await api.delete(`/exercise-record/${recordId}`);
    } catch (error) {
      console.error('Error deleting exercise record:', error);
      throw error;
    }
  },

  /**
   * Elimina un registro de ejercicio
   * @param {string} workoutId - ID del registro a eliminar
   * @returns {Promise<void>}
   */
  deleteExerciseRecordByWorkoutId: async (workoutId: string): Promise<void> => {
    try {
      await api.delete(`/exercise-record/workout/${workoutId}`);
    } catch (error) {
      console.error('Error deleting exercise record:', error);
      throw error;
    }
  }
};

export default exerciseService;