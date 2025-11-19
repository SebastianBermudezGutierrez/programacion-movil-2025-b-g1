<template>
  <ion-page class="exercise-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/training"></ion-back-button>
        </ion-buttons>
        <ion-title>Ejercicios #{{ workoutId }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="!workoutId">
        <ion-text color="danger">
          <p>No se ha especificado un entrenamiento</p>
        </ion-text>
      </div>
      
      <!-- Date Display -->
      <div class="date-display">
        <h2>{{ formattedDate }}</h2>
      </div>

      <div>
        <div class="input-group">
          <ion-label class="input-label">Ejercicio</ion-label>
          <ion-select
            v-model="exercise.id"
            interface="action-sheet"
            placeholder="Seleccione un ejercicio"
            @ionChange="updateExerciseName($event.detail.value)"
            :disabled="isLoading"
          >
            <ion-select-option 
              v-for="ex in exercises" 
              :key="ex.id" 
              :value="ex.id"
            >
              {{ ex.name }}
            </ion-select-option>
          </ion-select>
        </div>

        <div class="input-row">
          <div class="input-group">
            <ion-label class="input-label">Series</ion-label>
            <ion-input
              v-model="exercise.sets"
              type="number"
              min="1"
              placeholder="3"
              :disabled="isLoading"
            ></ion-input>
          </div>
          <div class="input-group">
            <ion-label class="input-label">Repeticiones</ion-label>
            <ion-input
              v-model="exercise.reps"
              type="number"
              min="1"
              placeholder="12"
              :disabled="isLoading"
            ></ion-input>
          </div>
        </div>

        <ion-button 
          expand="block" 
          class="save-button" 
          @click="saveExercise" 
          :disabled="!isFormValid || isLoading"
        >
          <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
          <ion-icon v-else :icon="saveOutline" slot="start"></ion-icon>
          {{ isLoading ? 'GUARDANDO...' : 'GUARDAR EJERCICIO' }}
        </ion-button>

        <ion-button 
          expand="block" 
          fill="outline" 
          color="danger" 
          class="delete-button" 
          @click="confirmDeleteWorkout"
          :disabled="isLoading"
        >
          <ion-icon :icon="trashOutline" slot="start"></ion-icon>
          ELIMINAR ENTRENAMIENTO
        </ion-button>
      </div>

      <!-- Lista de ejercicios guardados -->
      <div class="saved-exercises" v-if="routineExercises.length > 0">
        <h2 class="section-title">Ejercicios Guardados</h2>
        <div class="exercise-list">
          <ion-card v-for="(item, index) in routineExercises" :key="item.id || index" class="exercise-card">
            <ion-card-header>
              <ion-card-title>{{ item.exercise.name }}</ion-card-title>
              <ion-card-subtitle>
                {{ item.sets }} series x {{ item.reps }} repeticiones
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-text color="medium" class="exercise-date">
                {{ formatDate(item.createdAt) }}
              </ion-text>
              <ion-button 
                fill="clear" 
                color="danger" 
                @click="deleteExercise(item.id)"
                class="delete-btn"
              >
                <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>

    <!-- Bottom Navigation -->
    <footer class="bottom-nav">
      <div class="nav-item" @click="navigate('/tabs/training')">
        <ion-icon :icon="personCircleOutline" class="nav-icon"></ion-icon>
        <span>INICIO</span>
      </div>
      <div class="nav-item" @click="navigate('/tabs/weekly-history')">
        <ion-icon :icon="calendarOutline" class="nav-icon"></ion-icon>
        <span>HISTORIALES</span>
      </div>
    </footer>
  </ion-page>
</template>

<script setup lang="ts">
import { alertController } from '@ionic/vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  IonPage, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  toastController
} from '@ionic/vue';
import { 
  personCircleOutline, 
  barbellOutline, 
  calendarOutline,
  addCircleOutline,
  saveOutline,
  trashOutline
} from 'ionicons/icons';
import exerciseService, { type Exercise, type ExerciseRecord, type RoutineExercise } from '../services/exercise.service';
import { deleteWorkout } from '../services/workout.service';

// Interfaces específicas del componente
interface ExerciseForm {
  id: string;
  name: string;
  sets: string;
  reps: string;
}

interface SavedExercise {
  id: string;
  name: string;
  sets: string | number;
  reps: string | number;
  savedAt: string;
}

// Inicialización de hooks y estado
const route = useRoute();
const router = useRouter();
const workoutId = route.params.workoutId as string;

// Estado reactivo
const currentDate = ref<Date>(new Date());
const formattedDate = ref<string>('');
const exercises = ref<Exercise[]>([]);
const exercise = ref<ExerciseForm>({
  id: '',
  name: '',
  sets: '',
  reps: ''
});
const savedExercises = ref<SavedExercise[]>([]);
const isLoading = ref<boolean>(false);

// Add this new ref for routine exercises
const routineExercises = ref<RoutineExercise[]>([]);

const fetchRoutineExercises = async () => {
  try {
    const data = await exerciseService.getRoutineExercises(workoutId);
    routineExercises.value = data;
  } catch (error) {
    console.error('Error fetching routine exercises:', error);
    presentToast('Error al cargar los ejercicios', 'danger');
  }
};

// Add this helper method to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions =  { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Computed
const isFormValid = computed<boolean>(() => 
  !!exercise.value.id && 
  !!exercise.value.sets && 
  !!exercise.value.reps
);

// Métodos
const updateDateTime = (): void => {
  currentDate.value = new Date();
  formattedDate.value = currentDate.value.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const presentToast = async (message: string, color: string = 'primary'): Promise<void> => {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
    position: 'bottom'
  });
  await toast.present();
};

const updateExerciseName = (exerciseId: string): void => {
  const selectedExercise = exercises.value.find(ex => ex.id === exerciseId);
  if (selectedExercise) {
    exercise.value.name = selectedExercise.name;
  }
};

const saveExercise = async (): Promise<void> => {
  if (!isFormValid.value) {
    await presentToast('Por favor completa todos los campos', 'warning');
    return;
  }

  isLoading.value = true;
  
  try {
    const recordData: ExerciseRecord = {
      workoutId,
      exerciseId: exercise.value.id,
      reps: parseInt(exercise.value.reps, 10),
      sets: parseInt(exercise.value.sets, 10)
    };

    await exerciseService.createExerciseRecord(recordData);
    
    // Reset form
    exercise.value = {
      id: '',
      name: '',
      sets: '',
      reps: ''
    };
    
    // Reload the list of saved exercises for this workout
    await fetchRoutineExercises();
    
    await presentToast('Ejercicio guardado correctamente', 'success');
    window.scrollTo(0, 0);
  } catch (error: unknown) {
    console.error('Error al guardar el ejercicio:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al guardar el ejercicio';
    await presentToast(errorMessage, 'danger');
  } finally {
    isLoading.value = false;
  }
};

const loadExercises = async (): Promise<void> => {
  try {
    exercises.value = await exerciseService.getExercises();
  } catch (error: unknown) {
    console.error('Error al cargar ejercicios:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar los ejercicios';
    await presentToast(errorMessage, 'danger');
  }
};

const deleteExercise = async (id: string): Promise<void> => {
  try {
    await exerciseService.deleteExerciseRecord(id);
    // Remove the exercise from the local list
    routineExercises.value = routineExercises.value.filter(ex => ex.id !== id);
    await presentToast('Ejercicio eliminado correctamente', 'success');
  } catch (error) {
    console.error('Error al eliminar el ejercicio:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el ejercicio';
    await presentToast(errorMessage, 'danger');
  }
};

const addAnotherExercise = (): void => {
  exercise.value = {
    id: '',
    name: '',
    sets: '',
    reps: ''
  };
  window.scrollTo(0, 0);
};

// Delete workout
const confirmDeleteWorkout = async (): Promise<void> => {
  const alert = await alertController.create({
    header: 'Confirmar eliminación',
    message: '¿Estás seguro de que deseas eliminar este entrenamiento? Esta acción no se puede deshacer.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        handler: async () => {
          try {
            await exerciseService.deleteExerciseRecordByWorkoutId(workoutId);
            await deleteWorkout(workoutId);
            await presentToast('Entrenamiento eliminado correctamente', 'success');
            navigate('/tabs/training');
          } catch (error) {
            console.error('Error deleting workout:', error);
            presentToast('Error al eliminar el entrenamiento', 'danger');
          }
        }
      }
    ]
  });

  await alert.present();
};

const confirmDeleteExercise = async (): Promise<void> => {
  const alert = await alertController.create({
    header: 'Confirmar eliminación',
    message: '¿Estás seguro de que deseas eliminar este ejercicio? Esta acción no se puede deshacer.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        handler: async () => {
          try {
            await deleteExercise(exercise.value.id);
            await presentToast('Ejercicio eliminado correctamente', 'success');
          } catch (error) {
            console.error('Error deleting exercise:', error);
            presentToast('Error al eliminar el ejercicio', 'danger');
          }
        }
      }
    ]
  });

  await alert.present();
};

// Navegación
const navigate = (routeName: string): void => {
  router.push(routeName);
};

// Lifecycle hooks
onMounted((): void => {
  console.log('Workout ID:', workoutId);
  updateDateTime();
  loadExercises(); // Add this line to load exercises on component mount
  if (workoutId) {
    fetchRoutineExercises();
  }
  const interval = setInterval(updateDateTime, 1000);
  
  onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
.exercise-page {
  --ion-background-color: #000;
  --ion-text-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px; /* Space for bottom nav */
}

/* Header */
.header {
  background-color: #9b6947;
  padding: 1.5rem 0;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  position: relative;
}

.back-icon {
  font-size: 1.8rem;
  color: #000;
  cursor: pointer;
  position: absolute;
  left: 1.5rem;
  z-index: 1;
}

.menu-icon {
  font-size: 1.8rem;
  color: #000;
  cursor: pointer;
  position: absolute;
  right: 1.5rem;
  z-index: 1;
}

.title {
  color: #000;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  flex-grow: 1;
  text-align: center;
  padding: 0 2rem;
}

/* Form Container */
.form-container {
  background-color: #1a1a1a;
  padding: 3rem 2rem;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  width: 100%;
  margin-bottom: 2rem;
}

.input-row {
  display: flex;
  gap: 15px;
  margin-bottom: 1rem;
}

.input-row .input-group {
  flex: 1;
  margin-bottom: 0;
}

.exercises-container {
  margin-top: 2rem;
  padding: 1rem 0;
}

.exercise-item {
  margin-bottom: 10px;
  border-radius: 8px;
  --background: #1e1e1e;
  --border-radius: 8px;
  margin: 10px 0;
}

.exercise-item h3 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.exercise-item p {
  color: #aaa;
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #666;
  font-style: italic;
}

.section-title {
  color: #9b6947;
  font-size: 1.2rem;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #9b6947;
}

ion-segment {
  --background: #000;
  --color: #fff;
}

ion-segment-button {
  --color: #aaa;
  --color-checked: #fff;
  --indicator-color: #3880ff;
}

ion-content {
  margin: 1rem 0;
}

.add-exercise-btn {
  --padding-start: 0;
  --padding-end: 0;
  --background: transparent;
  --box-shadow: none;
  --ripple-color: transparent;
  height: auto;
}

.add-icon {
  font-size: 2.5rem;
  color: #9b6947;
}

.save-button {
  margin-top: 20px;
  --background: #FFA500;
  --color: #000;
  --border-radius: 10px;
  height: 50px;
  font-weight: bold;
  margin-bottom: 10px;
}

.delete-button {
  --border-radius: 10px;
  height: 50px;
  font-weight: bold;
  margin-bottom: 20px;
  --border-width: 2px;
  --border-style: solid;
  --border-color: var(--ion-color-danger);
}

/* Bottom Navigation */
.bottom-nav {
  background-color: #9b6947;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 0.7rem;
  flex: 1;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.nav-item.active {
  opacity: 1;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

/* Estilos para la lista de ejercicios guardados */
.saved-exercises {
  margin-top: 2rem;
  padding: 0 1rem;
}

.exercise-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.exercise-card {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-left: 4px solid #9b6947;
}

.exercise-info {
  flex: 1;
}

.exercise-info h3 {
  margin: 0 0 0.5rem 0;
  color: #fff;
  font-size: 1.1rem;
}

.exercise-info p {
  margin: 0.2rem 0;
  color: #aaa;
  font-size: 0.9rem;
}

.exercise-date {
  font-size: 0.8rem !important;
  color: #666 !important;
  margin-top: 0.5rem !important;
}

.delete-btn {
  --padding-start: 8px;
  --padding-end: 8px;
  margin: 0;
  height: auto;
}

/* Menu Popover Styles */
:global(.menu-popover) {
  --width: 200px;
  --background: #333;
  --color: #fff;
  --border-radius: 8px;
  --box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item ion-icon {
  margin-right: 12px;
  font-size: 1.2rem;
}

:global(.menu-popover .popover-content) {
  border-radius: 8px;
  overflow: hidden;
}

:global(.menu-popover .ion-page) {
  contain: none;
}
</style>