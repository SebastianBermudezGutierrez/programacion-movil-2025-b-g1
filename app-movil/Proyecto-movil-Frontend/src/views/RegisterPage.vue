<template>
  <ion-page class="page-root">
    <!-- HEADER -->
    <header class="header">
      <ion-icon :icon="arrowBackOutline" class="back-icon" @click="router.push('/welcome')"></ion-icon>
      <h1 class="title">LION FIT PRO</h1>
      <div class="menu-icon-placeholder"></div> <!-- This maintains the flex spacing -->
    </header>

    <!-- FORMULARIO DE REGISTRO -->
    <div class="form-container">
      <h2 class="form-title">REGISTRO</h2>

      <div class="input-block">
        <label>Nombre completo</label>
        <ion-input 
          v-model="formData.name" 
          class="input" 
          placeholder="Ingrese su nombre completo"
        ></ion-input>
      </div>

      <div class="input-block">
        <label>Cédula</label>
        <ion-input 
          v-model="formData.identification" 
          class="input" 
          placeholder="Ingrese su cédula"
        ></ion-input>
      </div>

      <div class="input-block">
        <label>Correo</label>
        <ion-input 
          v-model="formData.email" 
          class="input" 
          type="email" 
          placeholder="Ingrese su correo"
        ></ion-input>
      </div>

      <div class="input-block">
        <label>Contraseña</label>
        <ion-input 
          v-model="formData.password" 
          class="input" 
          type="password" 
          placeholder="Cree una contraseña"
        ></ion-input>
      </div>

      <ion-button 
        expand="block" 
        shape="round" 
        class="btn-register" 
        @click="registrar"
        :disabled="isLoading"
      >
        {{ isLoading ? 'REGISTRANDO...' : 'REGISTRARME' }}
      </ion-button>
    </div>

  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonInput, IonButton, IonIcon, toastController } from '@ionic/vue';
import { menuOutline, arrowBackOutline } from 'ionicons/icons';
import { userService } from '@/services/user.service';

const router = useRouter();

// Datos del formulario
const formData = ref({
  name: '',
  identification: '',
  email: '',
  password: ''
});

const isLoading = ref(false);

const registrar = async () => {
  if (!formData.value.name || !formData.value.identification || 
      !formData.value.email || !formData.value.password) {
    const toast = await toastController.create({
      message: 'Por favor complete todos los campos',
      duration: 3000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }

  try {
    isLoading.value = true;
    
    // Llamada al servicio de usuario
    await userService.register({
      name: formData.value.name,
      identification: formData.value.identification,
      email: formData.value.email,
      password: formData.value.password
    });

    const toast = await toastController.create({
      message: '¡Registro exitoso! Por favor inicia sesión',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();

    // Redirigir a la página de login después de un registro exitoso
    router.push('/login');
  } catch (error) {
    console.error('Error al registrar:', error);
    
    const errorMessage = error.response?.data?.message || 'Error al registrar el usuario';
    const toast = await toastController.create({
      message: errorMessage,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  } finally {
    isLoading.value = false;
  }
};

</script>

<style scoped>
/* Estilos existentes se mantienen igual */
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
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.title {
  color: #000;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  flex-grow: 1;
  text-align: center;
}

.back-icon, .menu-icon {
  font-size: 1.8rem;
  color: #000;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon-placeholder {
  width: 2.8rem; /* Same as the back icon for balance */
}

/* Formulario */
.form-container {
  padding: 1rem 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 60px; /* Añadido para evitar que el contenido quede detrás del menú fijo */
}

.form-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.input-block {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.input-block label {
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

.btn-register {
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
}

/* Menú inferior */
.bottom-nav {
  background-color: #9b6947;
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 0.7rem;
  flex: 1;
  cursor: pointer;
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

/* Ajustes responsivos */
@media (max-width: 360px) {
  .title {
    font-size: 1.3rem;
  }
  
  .form-title {
    font-size: 1.3rem;
  }
  
  .btn-register {
    height: 44px;
    font-size: 0.9rem;
  }
}
</style>