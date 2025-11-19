<template>
  <ion-page class="login-page">
    <!-- Header -->
    <header class="header">
      <ion-icon :icon="arrowBackOutline" class="back-icon" @click="$router.push('/welcome')"></ion-icon>
      <h1 class="title">LION FIT PRO</h1>
      <div class="menu-icon-placeholder"></div> <!-- This maintains the flex spacing -->
    </header>

    <!-- Formulario de Login -->
    <div class="form-container">
      <div class="input-group">
        <label class="input-label">Correo</label>
        <ion-input
          v-model="username"
          class="custom-input"
          placeholder="Ingrese correo"
          :clear-on-edit="false"
        ></ion-input>
      </div>

      <div class="input-group">
        <label class="input-label">Contraseña</label>
        <ion-input
          v-model="password"
          class="custom-input"
          type="password"
          placeholder="Ingrese contraseña"
          :clear-on-edit="false"
          @keyup.enter="login"
        ></ion-input>
      </div>

      <ion-button expand="block" class="login-button" @click="login" :disabled="!isFormValid">
        ENTRAR
      </ion-button>
    </div>

  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonInput, IonButton, IonIcon, toastController } from '@ionic/vue';
import { menuOutline, arrowBackOutline } from 'ionicons/icons';
import { userService } from '@/services/user.service';

const router = useRouter();
const username = ref('');
const password = ref('');
const isLoading = ref(false);

const isFormValid = computed(() => {
  return username.value.trim() !== '' && password.value.trim() !== '';
});


const login = async () => {
  // Validación de campos vacíos
  if (!username.value.trim() || !password.value.trim()) {
    const toast = await toastController.create({
      message: 'Por favor ingresa tu correo y contraseña',
      duration: 3000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }
  
  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(username.value)) {
    const toast = await toastController.create({
      message: 'Por favor ingresa un correo electrónico válido',
      duration: 3000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }
  
  isLoading.value = true;
  
  try {
    console.log('Intentando iniciar sesión con:', { email: username.value });
    
    const credentials = {
      email: username.value.trim(),
      password: password.value
    };
    
    console.log('Enviando credenciales al servidor...');
    const response = await userService.login(credentials);
    console.log('Respuesta del servidor:', response);
    
    const toast = await toastController.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
    
    // Redirigir a la página de entrenamiento después de mostrar el mensaje de éxito
    router.push('/tabs/training');
    
  } catch (error) {
    console.error('Error en el login:', {
      error: error,
      response: error.response?.data,
      status: error.response?.status
    });
    
    let errorMessage = 'Error al conectar con el servidor. Intenta de nuevo.';
    
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Correo o contraseña incorrectos. Intenta de nuevo.';
      } else if (error.response.status === 400) {
        errorMessage = 'Datos de inicio de sesión inválidos.';
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    }
    
    const toast = await toastController.create({
      message: errorMessage,
      duration: 4000,
      color: 'danger',
      position: 'top',
      buttons: ['OK']
    });
    await toast.present();
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
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
  padding: 2rem 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  padding-top: 3rem;
}

.input-group {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.input-label {
  display: block;
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.custom-input {
  --background: #fff;
  --color: #000;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --placeholder-color: #666;
  --placeholder-opacity: 1;
  border-radius: 1rem;
  height: 3rem;
}

.login-button {
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
}

.nav-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}
</style>