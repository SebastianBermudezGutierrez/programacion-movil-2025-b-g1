<template>
  <ion-page class="page-root">
    <!-- Header -->
    <header class="header">
      <ion-icon :icon="arrowBackOutline" class="back-icon" @click="goBack"></ion-icon>
      <h1 class="title">LION FIT PRO</h1>
      <ion-icon 
  :icon="menuOutline" 
  class="menu-icon" 
  @click.stop="openMenu($event)" 
  style="font-size: 24px; cursor: pointer;"
></ion-icon>
    </header>

    <div class="content-container">
      <h2 class="page-title">REGISTRO DIARIO</h2>
      
      <div class="form-container">
        <div class="input-block">
          <label class="input-label">Fecha</label>
          <ion-input
            class="input"
            :value="currentDate"
            readonly
          ></ion-input>
        </div>

        <div class="input-block">
          <label class="input-label">Tipo de Entrenamiento</label>
          <ion-select
            v-model="selectedWorkout"
            interface="action-sheet"
            :placeholder="'Selecciona un tipo'"
            class="workout-select"
            style="
              --padding-start: 16px;
              --padding-end: 16px;
              --placeholder-opacity: 1;
            "
          >
            <ion-select-option value="pecho">Pecho</ion-select-option>
            <ion-select-option value="espalda">Espalda</ion-select-option>
            <ion-select-option value="pierna">Pierna</ion-select-option>
            <ion-select-option value="brazo">Brazo</ion-select-option>
            <ion-select-option value="personalizado">Personalizado</ion-select-option>
          </ion-select>
        </div>
        
        <div v-if="selectedWorkout === 'personalizado'" class="input-block">
          <label class="input-label">Nombre del Entrenamiento</label>
          <ion-input
            v-model="customWorkoutName"
            class="input"
            placeholder="Escribe el nombre del entrenamiento"
          ></ion-input>
        </div>

        <div class="button-container">
          <ion-button 
            expand="block" 
            class="btn-primary"
            @click="addExercises"
          >
            AGREGAR EJERCICIOS
          </ion-button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <footer class="bottom-nav">
      <div class="nav-item" @click="goToWelcome">
        <ion-icon :icon="personCircleOutline" class="nav-icon"></ion-icon>
        <span>INICIO</span>
      </div>
      <div class="nav-item" @click="goToHistory">
        <ion-icon :icon="calendarOutline" class="nav-icon"></ion-icon>
        <span>HISTORIALES</span>
      </div>
    </footer>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { userService } from '@/services/user.service';
import { 
  IonPage, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonSelect,
  IonSelectOption,
  popoverController,
  toastController
} from '@ionic/vue';
import { 
  arrowBackOutline, 
  menuOutline, 
  personCircleOutline,
  calendarOutline,
  barbellOutline,
  documentTextOutline,
  chevronDownOutline,
  timeOutline,
  statsChartOutline,
  trendingUpOutline,
  flameOutline,
  timerOutline
} from 'ionicons/icons';

const router = useRouter();
const selectedWorkout = ref('');
const customWorkoutName = ref('');

const workoutNames = {
  'pecho': 'Pecho',
  'espalda': 'Espalda',
  'pierna': 'Pierna',
  'brazo': 'Brazo',
  'personalizado': 'Personalizado'
};

const getWorkoutName = (key) => {
  return workoutNames[key] || key;
};

// Componente del menú
// Get the last 7 days including today
const getLast7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({
      date: date.toISOString().split('T')[0],
      formattedDate: date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })
    });
  }
  return days;
};

const MenuComponent = {
  setup() {
    const close = (route) => {
      popoverController.dismiss().then(() => {
        if (route) router.push(route);
      });
    };

    // Get training history for the week
    const weeklyHistory = ref({});
    
    const loadWeeklyHistory = () => {
    };

    // Initialize with empty data for the last 7 days
    weeklyHistory.value = getLast7Days();

    // Function to navigate to a specific day's log
    const goToDay = (date) => {
      // Here you would typically navigate to the specific day's log
      console.log('Navigating to:', date);
      // Close the menu
      popoverController.dismiss();
    };

    // Function to open a new tab with the weekly history
    const openWeeklyHistory = () => {
      // Close the menu first
      popoverController.dismiss().then(() => {
        // Navigate to the weekly history page in a new tab
        window.open('/tabs/exercise', '_blank');
      });
    };

    return {
      weeklyHistory,
      goToDay,
      openWeeklyHistory,
      close: () => popoverController.dismiss()
    };
  },
  template: `
    <div class="menu-container">
      <h3 class="menu-title">Historial de la Semana</h3>
      <div class="history-container">
        <div v-for="(day, date) in weeklyHistory" :key="date" class="history-day" :class="{ 'no-training': day.sinRegistro }">
          <div class="day-header" @click="goToDay(date)">
            <span class="day-name">{{ new Date(date).toLocaleDateString('es-ES', { weekday: 'long' }) }}</span>
            <span class="day-date">{{ new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) }}</span>
          </div>
          <div v-if="!day.sinRegistro" class="day-exercises">
            <div v-for="(exercise, index) in day.exercises" :key="index" class="exercise">
              {{ exercise }}
            </div>
          </div>
          <div v-else class="no-training-message">
            Sin registro
          </div>
        </div>
      </div>
      <div class="menu-footer">
        <button class="view-all-button" @click="openWeeklyHistory">
          Ver Historial Completo
        </button>
      </div>
    </div>
  `
};

const openMenu = async (event) => {
  try {
    const popover = await popoverController.create({
      component: MenuComponent,
      event: event,
      cssClass: 'menu-popover',
      showBackdrop: true,
      mode: 'ios',
      componentProps: {
        close: () => popover.dismiss()
      }
    });
    
    await popover.present();
  } catch (error) {
    console.error('Error al abrir el menú:', error);
  }
};

// Get current date in DD/MM/YYYY format
const currentDate = computed(() => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
});

const addExercises = async () => {
  if (!selectedWorkout.value) {
    showToast('Por favor selecciona un tipo de entrenamiento');
    return;
  }
  
  if (selectedWorkout.value === 'personalizado' && !customWorkoutName.value.trim()) {
    showToast('Por favor ingresa un nombre para el entrenamiento personalizado');
    return;
  }
  
  try {
    const workoutName = selectedWorkout.value === 'personalizado' 
      ? customWorkoutName.value 
      : selectedWorkout.value;
    
    // Get current date in YYYY-MM-DD format for the API
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // Create the workout
    const response = await userService.createWorkout({
      date: formattedDate,
      description: workoutName
    });
    
    // Store the workout ID for the exercise page
    if (response && response.id) {
      // Navigate to the exercise page with the workout ID
      
      router.push(`/tabs/exercise/${response.id}`);
    } else {
      throw new Error('No se pudo crear el entrenamiento');
    }
  } catch (error) {
    console.error('Error al crear el entrenamiento:', error);
    showToast('Error al crear el entrenamiento. Por favor, inténtalo de nuevo.');
  }
};

const showToast = async (message) => {
  const toast = await toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom'
  });
  await toast.present();
};

const goBack = () => {
  // Use replace instead of push to prevent adding to browser history
  router.replace('/tabs/training');
};

const goToWelcome = () => {
  router.push('/tabs/training');
};

const goToTraining = () => {
  router.push('/training');
};

const goToHistory = () => {
  router.push('/tabs/weekly-history');
};
</script>

<style scoped>
/* Menu Popover Styles */
::v-deep(.menu-popover) {
  --width: 320px;
  --height: 80%;
  --max-height: 500px;
  --border-radius: 16px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.menu-container {
  padding: 16px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.history-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 16px;
}

.history-day {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.history-day:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.day-header {
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.day-name {
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
}

.day-date {
  color: #666;
  font-size: 14px;
}

.day-exercises {
  padding: 12px 16px;
}

.exercise {
  font-size: 14px;
  color: #444;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
}

.exercise:last-child {
  border-bottom: none;
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
  margin-top: 4px;
}

.no-training-message {
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
}

.custom-popover {
  --width: 200px;
  --border-radius: 12px;
}

.menu-container {
  padding: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: rgba(var(--ion-color-primary-rgb), 0.1);
}

.menu-item ion-icon {
  margin-right: 12px;
  font-size: 1.2rem;
  color: var(--ion-color-primary);
}

.menu-item span {
  font-size: 0.9rem;
  color: var(--ion-text-color);
}

/* Ajustes para tema oscuro */
@media (prefers-color-scheme: dark) {
  .menu-item {
    color: var(--ion-text-color);
  }
  
  .menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.menu-title {
  padding: 12px 16px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--ion-color-primary);
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: rgba(var(--ion-color-primary-rgb), 0.1);
}

.menu-item ion-icon {
  margin-right: 12px;
  font-size: 20px;
  color: var(--ion-color-medium);
}

.menu-item span {
  font-size: 14px;
  color: var(--ion-color-dark);
}

:deep(ion-select::part(icon)) {
  display: none !important;
}

:deep(ion-select::part(placeholder)),
:deep(ion-select::part(text)) {
  flex: 1;
  text-align: left;
  width: 100%;
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

.nav-item span {
  font-size: 0.7rem;
  text-align: center;
}

/* Adjust content container to account for bottom nav */
.content-container {
  padding-bottom: 80px; /* Space for bottom nav */
}
.page-root {
  --ion-background-color: #000;
  --ion-text-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background-color: #9b6947;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.back-icon, .menu-icon {
  font-size: 1.5rem;
  color: #000;
  z-index: 1;
}

.title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
  pointer-events: none;
}

.content-container {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.input-block {
  margin-bottom: 1.5rem;
}

.workout-select {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px 16px;
  --placeholder-color: #888;
  --placeholder-opacity: 1;
  background: #fff;
  margin-top: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
}

.workout-select::part(text) {
  color: #000;
  font-weight: 500;
}

ion-select::part(placeholder) {
  color: #888;
}

ion-select::part(icon) {
  color: #9b6947;
}

.button-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.selected-workout {
  background: #f0f0f0;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  font-size: 0.9em;
  border: 1px solid #ddd;
}

.input-label {
  display: block;
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.input {
  --background: #fff;
  --color: #000;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --placeholder-color: #666;
  --placeholder-opacity: 1;
  border-radius: 1rem;
  height: 3rem;
}

.btn-primary {
  --background: #9b6947;
  --color: #fff;
  --border-radius: 1.5rem;
  --padding-top: 1.5rem;
  --padding-bottom: 1.5rem;
  font-weight: bold;
  margin: 2rem auto 0;
  text-transform: none;
  max-width: 400px;
  width: 100%;
  display: block;
  font-size: 1rem;
}

/* Menu Popover Styles */
::v-deep(.menu-popover) {
  --width: 320px;
  --max-height: 80vh;
  --border-radius: 16px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --backdrop-opacity: 0.5;
  --ion-safe-area-top: 20px;
  --ion-safe-area-bottom: 20px;
}

::v-deep(.menu-popover .menu-item) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin: 8px 16px;
  background-color: #333;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

::v-deep(.menu-popover .menu-item:first-child) {
  margin-top: 16px;
  background-color: #555;
  font-weight: 600;
}

::v-deep(.menu-popover .menu-item:not(:first-child)) {
  background-color: #444;
  opacity: 0.8;
}

::v-deep(.menu-popover .popover-content) {
  border-radius: 16px;
  overflow: hidden;
  padding: 8px 0;
}

::v-deep(.menu-popover .ion-page) {
  contain: none;
}

/* Bottom Navigation removed */
</style>

