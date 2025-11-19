<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/training"></ion-back-button>
        </ion-buttons>
        <ion-title>Historial Semanal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="week-navigation">
        <ion-button fill="clear" @click="previousWeek">
          <ion-icon :icon="chevronBackOutline"></ion-icon>
        </ion-button>
        <h2 class="week-title">{{ currentWeekRange }}</h2>
        <ion-button fill="clear" @click="nextWeek">
          <ion-icon :icon="chevronForwardOutline"></ion-icon>
        </ion-button>
      </div>

      <div v-if="isLoading" class="loading-container">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <div v-else>
        <div v-for="day in weeklyWorkouts" :key="day.date" class="day-card">
          <div class="day-header">
            <h3>{{ formatDate(day.date) }}</h3>
            <ion-badge color="warning">{{ day.workouts.length }} entrenamiento{{ day.workouts.length !== 1 ? 's' : '' }}</ion-badge>
          </div>
          
          <ion-list>
            <ion-item 
              v-for="workout in day.workouts" 
              :key="workout.id"
              class="workout-item"
              @click="navigateToExercise(workout.id)"
            >
              <ion-label>
                <h3>{{ workout.description }}</h3>
                <p class="time">{{ formatTime(workout.createdAt) }}</p>
              </ion-label>
              <div class="item-actions">
                <ion-icon :icon="chevronForwardOutline"></ion-icon>
              </div>
            </ion-item>
          </ion-list>
        </div>

        <ion-item v-if="weeklyWorkouts.length === 0" class="no-workouts">
          <ion-label class="ion-text-center">
            <ion-icon :icon="calendarOutline" size="large"></ion-icon>
            <p>No hay entrenamientos registrados</p>
          </ion-label>
        </ion-item>
      </div>
    </ion-content>

    <!-- Bottom Navigation -->
    <footer class="bottom-nav">
      <div class="nav-item" @click="navigate('/tabs/training')">
        <ion-icon :icon="personCircleOutline" class="nav-icon"></ion-icon>
        <span>INICIO</span>
      </div>
      <div class="nav-item active">
        <ion-icon :icon="calendarOutline" class="nav-icon"></ion-icon>
        <span>HISTORIALES</span>
      </div>
    </footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonBadge,
  IonSpinner,
  toastController,
  alertController
} from '@ionic/vue';
import { 
  chevronBackOutline, 
  chevronForwardOutline,
  calendarOutline,
  personCircleOutline,
  trashOutline,
  barbellOutline
} from 'ionicons/icons';
import { getWorkoutsByDateRange, deleteWorkout } from '@/services/workout.service';

const router = useRouter();

// Navigate to exercise page
const navigateToExercise = (workoutId: string) => {
  router.push(`/tabs/exercise/${workoutId}`);
};

// Navigation function
const navigate = (route: string): void => {
  router.push(route);
};

interface Workout {
  id: string;
  userId: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkoutDay {
  date: string;
  workouts: Workout[];
}

const weeklyWorkouts = ref<WorkoutDay[]>([]);
const error = ref<string | null>(null);
const currentDate = ref(new Date());
const isLoading = ref(false);

// Computed property to get the current week's date range
const currentWeekRange = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  return `${formatDateRange(startOfWeek)} - ${formatDateRange(endOfWeek)}`;
});

// Format date as "15 Nov"
const formatDateRange = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  }).format(date);
};

// Format date as "Viernes, 15 de Noviembre"
const formatDate = (dateString: string) => {
  // Create date in local timezone by appending T00:00:00
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }).format(date);
};

// Format time as "18:30"
const formatTime = (dateTimeString: string) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};


const confirmDelete = async (workout: Workout) => {
  const alert = await alertController.create({
    header: 'Confirmar eliminación',
    message: '¿Estás seguro de que deseas eliminar este entrenamiento?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        handler: async () => {
          try {
            // Delete the workout from the backend
            await deleteWorkout(workout.id);
            
            // Update the local state
            for (const day of weeklyWorkouts.value) {
              const initialLength = day.workouts.length;
              day.workouts = day.workouts.filter(w => w.id !== workout.id);
              
              // If this was the last workout in the day, remove the day
              if (day.workouts.length === 0 && initialLength > 0) {
                const dayIndex = weeklyWorkouts.value.findIndex(d => d.date === day.date);
                if (dayIndex !== -1) {
                  weeklyWorkouts.value.splice(dayIndex, 1);
                }
              }
            }
            
            const toast = await toastController.create({
              message: 'Entrenamiento eliminado',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
          } catch (err) {
            console.error('Error al eliminar el entrenamiento:', err);
            const toast = await toastController.create({
              message: 'Error al eliminar el entrenamiento',
              duration: 2000,
              color: 'danger'
            });
            await toast.present();
          }
        }
      }
    ]
  });

  await alert.present();
};

const fetchWeeklyWorkouts = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Get start and end of current week in local timezone
    const startOfWeek = new Date(currentDate.value);
    startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    // Format dates as YYYY-MM-DD for the API
    const formatDateForApi = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    const startDate = formatDateForApi(startOfWeek);
    const endDate = formatDateForApi(endOfWeek);
    
    // Fetch workouts from API
    const workouts = await getWorkoutsByDateRange(startDate, endDate);
    
    // Sort workouts by date (newest first)
    const sortedWorkouts = [...workouts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Group the limited workouts by day
    const groupedWorkouts = sortedWorkouts.reduce((acc: WorkoutDay[], workout) => {
      const workoutDate = new Date(workout.date).toISOString().split('T')[0];
      
      // Find if we already have this date in our accumulator
      const existingDay = acc.find(day => day.date === workoutDate);
      
      if (existingDay) {
        existingDay.workouts.push(workout);
      } else {
        acc.push({
          date: workoutDate,
          workouts: [workout]
        });
      }
      
      return acc;
    }, []);

    weeklyWorkouts.value = groupedWorkouts;
      
  } catch (err) {
    console.error('Error fetching workouts:', err);
    error.value = 'Error al cargar el historial de entrenamientos';
    const toast = await toastController.create({
      message: 'Error al cargar el historial de entrenamientos',
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  } finally {
    isLoading.value = false;
  }
};

// Fetch weekly workouts when component is mounted
onMounted(() => {
  fetchWeeklyWorkouts();
});

// Navigate to previous week
const previousWeek = () => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() - 7);
  currentDate.value = newDate;
  fetchWeeklyWorkouts();
};

// Navigate to next week
const nextWeek = () => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + 7);
  currentDate.value = newDate;
  fetchWeeklyWorkouts();
};
</script>

<style scoped>
ion-content {
  --background: #000;
  --color: #fff;
  --padding-bottom: 70px;
}

.week-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 2rem;
  padding: 0 1rem;
}

.week-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
}

.day-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.day-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.workout-item {
  --padding-start: 1rem;
  --padding-end: 1rem;
  --inner-padding-end: 0;
  --min-height: 72px;
  --border-color: #f0f0f0;
}

.workout-item h3 {
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

.workout-item p {
  margin: 2px 0;
  font-size: 0.85rem;
  color: #666;
}

.workout-item .time {
  font-size: 0.8rem;
  color: #888;
}

.no-workout-item {
  --padding-start: 0;
  --inner-padding-end: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #1e1e1e;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-actions ion-button {
  --padding-start: 8px;
  --padding-end: 8px;
  margin: 0;
  --ripple-color: var(--ion-color-danger);
}

.no-workouts {
  --padding-start: 1rem;
  --inner-padding-end: 1rem;
  --min-height: 120px;
  text-align: center;
  margin-bottom: 70px; /* Add space for bottom nav */
}

.no-workouts ion-icon {
  color: #ccc;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.no-workouts p {
  margin: 0.5rem 0 0;
  color: #888;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
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
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  margin: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
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
  text-decoration: none;
}

.nav-item.active {
  opacity: 1;
  font-weight: 500;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}
</style>