<template>
  <ion-header :translucent="true">
    <ion-toolbar color="warning">
      <ion-buttons slot="start">
        <ion-menu-button menu="main-menu" :auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonMenuButton 
} from '@ionic/vue';

defineProps({ 
  title: { 
    type: String, 
    default: 'App Title' 
  } 
});
</script>