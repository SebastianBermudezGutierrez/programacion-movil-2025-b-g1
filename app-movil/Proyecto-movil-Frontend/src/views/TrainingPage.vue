<template>
  <ion-page>

    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Entrenamiento del Día</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToDailyLog" color="light">
            <ion-icon slot="icon-only" :icon="calendarOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- SI HAY REGISTRO DE HOY -->
      <div v-if="registroHoy">
        <h2 class="titulo">✔ Entrenamiento registrado hoy</h2>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Rutina del día</ion-card-title>
            <ion-card-subtitle>{{ registroHoy.fecha }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <div v-for="(ejercicio, index) in registroHoy.ejercicios" :key="index" class="ejercicio">
              <strong>{{ ejercicio.nombre }}</strong><br />
              Series: {{ ejercicio.series }} - Reps: {{ ejercicio.reps }}
            </div>

            <h3 class="subtitulo">Progreso</h3>
            <ion-progress-bar :value="registroHoy.progreso"></ion-progress-bar>
            <p>{{ (registroHoy.progreso * 100).toFixed(0) }}% completado</p>
          </ion-card-content>
        </ion-card>
      </div>


      <!-- SI NO HAY REGISTRO DE HOY -->
      <div v-else class="sin-registro">
        <h2 class="titulo">No hay registro del día de hoy</h2>
        <p>¿Deseas comenzar con tu entrenamiento diario?</p>

        <ion-button expand="block" color="primary" @click="goToDailyLog" class="mb-3">
          Comenzar con el registro diario
        </ion-button>
      </div>

      <!-- Botón Volver (solo visible cuando hay registro) -->
      <div v-if="registroHoy" class="ion-padding">
        <ion-button 
          expand="block" 
          fill="outline" 
          color="medium"
          @click="goBack"
          class="back-button"
        >
          VOLVER
        </ion-button>
      </div>

      <!-- Bottom Navigation -->
      <footer class="bottom-nav">
        <div class="nav-item disabled">
          <ion-icon :icon="personCircleOutline" class="nav-icon"></ion-icon>
          <span>INICIO</span>
        </div>
        <div class="nav-item" @click="$router.push('/tabs/weekly-history')">
          <ion-icon :icon="calendarOutline" class="nav-icon"></ion-icon>
          <span>HISTORIALES</span>
        </div>
      </footer>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  personCircleOutline, 
  barbellOutline, 
  calendarOutline
} from 'ionicons/icons';

import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonProgressBar, IonButtons, IonBackButton
} from '@ionic/vue';

const router = useRouter();

// SIMULACIÓN: Aquí lees tu BD (Firebase, SQLite, API, etc.)
const registroHoy = ref(null);

const goBack = () => {
  // Reset the view to show the 'No hay registro' state
  registroHoy.value = null;
  // Clear the local storage for the daily registration
  localStorage.removeItem('registro-diario');
};

const goToWelcome = () => {
  router.push('/welcome');
};

const goToTraining = () => {
  // Already on training page, no need to navigate
};

const goToHistory = () => {
  router.push('/tabs/weekly-history');
};

const goToDailyLog = () => {
  router.push('/tabs/daily-log');
};

onMounted(() => {
  cargarRegistroHoy();
});

function cargarRegistroHoy() {
  // Fecha actual
  const hoy = new Date().toISOString().substring(0, 10);

  // Simulación de datos almacenados
  const registroGuardado = JSON.parse(localStorage.getItem('registro-diario'));

  if (registroGuardado && registroGuardado.fecha === hoy) {
    registroHoy.value = registroGuardado;
  }
}

// Función eliminada: comenzarRegistro
</script>

<style scoped>
.titulo {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitulo {
  margin-top: 20px;
  font-weight: bold;
}

.ejercicio {
  margin-bottom: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
}

.sin-registro {
  text-align: center;
  margin-top: 40px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mt-3 {
  margin-top: 1rem;
}

.back-button {
  --border-radius: 25px;
  margin: 20px 0;
  --padding-top: 20px;
  --padding-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
}

/* Bottom Navigation */
.bottom-nav {
  background-color: #9b6947;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 0.75rem;
  cursor: pointer;
  width: 33.33%;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.nav-item span {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>