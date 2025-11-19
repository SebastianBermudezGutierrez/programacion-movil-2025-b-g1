<template>
  <ion-page>
    <AppHeader title="Lion Fit Pro" />
    <ion-tabs>
      <ion-router-outlet />
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage,
  IonTabs,
  IonRouterOutlet
} from '@ionic/vue';
import AppHeader from '@/components/AppHeader.vue';
</script>