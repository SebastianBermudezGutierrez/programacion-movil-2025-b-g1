<template>
  <ion-app>
    <AppMenu />
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppMenu from '@/components/AppMenu.vue';
</script>

<style>
#main-content {
  width: 100%;
  height: 100%;
}
</style>