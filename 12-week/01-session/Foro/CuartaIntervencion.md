### ¿Cómo aplicarían principios de accesibilidad en un proyecto móvil que estén desarrollando?

La accesibilidad digital no debe entenderse como una característica opcional, sino como un principio fundamental del diseño inclusivo. Una app accesible garantiza que todas las personas, incluidas aquellas con discapacidades visuales, auditivas, motrices o cognitivas, puedan interactuar sin barreras.  

Incorporar accesibilidad también mejora la usabilidad general, ya que las interfaces claras, los contrastes adecuados y las etiquetas descriptivas benefician a todos los usuarios, no solo a quienes presentan alguna discapacidad.

En un proyecto móvil, estos principios pueden aplicarse mediante:

- **Contraste adecuado** entre texto y fondo.  
- **Etiquetas ARIA** para lectores de pantalla.  
- **Botones grandes y bien espaciados** para usuarios con dificultades motrices.  
- **Texto adaptable** a configuraciones del sistema.  
- **Alternativas visuales y auditivas** para notificaciones o alertas.  

### Referencias

**Nielsen, J. (2020). Usability Engineering. Morgan Kaufmann.**
**W3C (2023). Web Content Accessibility Guidelines (WCAG) 2.1.**
**Ionic Framework. (2024). Performance Optimization in Ionic Apps. Ionic Docs.**

### 💻 Ejemplo (Ionic + Vue)
```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Accesibilidad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-button
        expand="block"
        color="primary"
        aria-label="Agregar nueva tarea"
        style="background-color: #0057ff; color: white; font-size: 18px;"
      >
        <ion-icon name="add-circle-outline" slot="start" aria-hidden="true"></ion-icon>
        Agregar Tarea
      </ion-button>

      <p class="texto">
        Bienvenido a tu gestor de tareas accesible. Este diseño incluye alto contraste, 
        etiquetas ARIA y controles táctiles amplios.
      </p>

      <ion-item>
        <ion-label position="floating">Nombre de la tarea</ion-label>
        <ion-input
          aria-label="Campo para ingresar el nombre de la tarea"
          placeholder="Ej: Reunión de equipo"
        ></ion-input>
      </ion-item>

      <ion-button expand="block" color="success" class="mt-3">Guardar</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonIcon } from '@ionic/vue';
</script>

<style scoped>
.texto {
  font-size: var(--ion-font-size, 16px);
  line-height: 1.5;
}
.mt-3 {
  margin-top: 20px;
}
</style>
