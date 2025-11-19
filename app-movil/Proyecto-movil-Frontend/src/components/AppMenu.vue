<template>
  <ion-menu 
    menu-id="main-menu" 
    content-id="main-content" 
    type="overlay" 
    side="start"
    :swipe-gesture="true"
  >
    <ion-header>
      <ion-toolbar color="warning">
        <ion-title>Menú</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-menu-toggle :auto-hide="false">
          <ion-item button @click="navigateTo('/tabs/training')">
            <ion-label>Entrenamientos</ion-label>
          </ion-item>
          <ion-item button @click="navigateTo('/tabs/daily-log')">
            <ion-label>Registro Diario</ion-label>
          </ion-item>
          <ion-item button @click="navigateTo('/tabs/weekly-history')">
            <ion-label>Historial Semanal</ion-label>
          </ion-item>
          
          <!-- Logout Button -->
          <ion-item 
            button 
            class="logout-button"
            @click="logout"
            lines="none"
          >
            <ion-icon :icon="logOutOutline" slot="start"></ion-icon>
            <ion-label>Cerrar Sesión</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel,
  IonIcon,
  IonMenuToggle,
  menuController
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';

const router = useRouter();

const navigateTo = async (path: string) => {
  await menuController.close();
  router.push(path);
};

const logout = async () => {
  try {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Close the menu
    await menuController.close();
    
    // Navigate to welcome page
    router.push('/welcome');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<style scoped>
ion-menu {
  --width: 80%;
  --max-width: 300px;
  --min-width: 200px;
}

ion-item {
  --padding-start: 20px;
  --min-height: 50px;
}

ion-label {
  font-size: 16px;
  font-weight: 500;
}

.logout-button {
  margin-top: 20px;
  --background: rgba(var(--ion-color-danger-rgb), 0.1);
  --color: var(--ion-color-danger);
  --border-radius: 8px;
  margin: 20px 16px;
}

.logout-button ion-icon {
  margin-right: 10px;
}
</style>