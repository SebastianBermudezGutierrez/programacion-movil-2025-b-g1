<template>
  <ion-page class="page-root">
    <!-- Top logo -->
    <div class="logo-wrap">
      <img src="../assets/Logo.jpeg" alt="Lions Fit" class="logo" />
    </div>

    <!-- Hero image (woman with dumbbells) -->
    <div class="hero-wrap">
      <img src="../assets/Portada.jpeg" alt="Hero" class="hero" />
    </div>

    <!-- Bottom panel -->
    <div class="bottom-panel">
      <h1 class="bienvenido">BIENVENIDO</h1>
      <p class="subtitle">ENTRENAMIENTOS GRATUITOS DISPONIBLES</p>

      <div class="avatar"> 
        <svg viewBox="0 0 24 24" class="avatar-icon" aria-hidden="true">
          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>

      <div class="buttons">
        <ion-button 
          expand="block" 
          shape="round" 
          class="btn login"
          @click="navigateToLogin"
        >
          INICIAR SESIÓN
        </ion-button>
        <ion-button 
          expand="block" 
          shape="round" 
          class="btn register"
          @click="navigateToRegister"
        >
          REGISTRARME
        </ion-button>
      </div>
    </div>
  </ion-page>
</template>

<script setup>
import { IonPage, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.page-root {
  position: relative;
  min-height: 100vh;
  background: #121212;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Logo on top */
.logo-wrap {
  margin-top: 20px;
  z-index: 5;
}
.logo {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Hero image fills central area */
.hero-wrap {
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.hero {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  z-index: 1;
  max-height: 50vh;
}

/* Bottom brown panel */
.bottom-panel {
  width: 100%;
  background: #9b6947;
  padding: 18px 20px 28px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
}

.bienvenido {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 1px;
}

.subtitle {
  margin: 6px 0 14px;
  font-size: 12px;
  font-weight: 600;
}

.avatar {
  width: 56px;
  height: 56px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 8px auto 16px;
}

.avatar-icon {
  width: 34px;
  height: 34px;
  color: #fff;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  --padding-start: 12px;
  --padding-end: 12px;
  --border-radius: 22px;
  --border-width: 0px;
  min-width: 140px;
  font-weight: 700;
  --color: #fff;
}

.btn.login {
  --background: #1e1e1e;
  --border-color: #ff6b00;
  --border-width: 2px;
  --border-style: solid;
  font-weight: bold;
  margin-bottom: 16px;
  height: 48px;
  --box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  --background-hover: #2a2a2a;
  --background-activated: #333;
  --background-focused: #2a2a2a;
}

.btn.register {
  --background: #1e1e1e;
  --border-color: #ff6b00;
  --border-width: 2px;
  --border-style: solid;
  font-weight: bold;
  height: 48px;
  --box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  --background-hover: #2a2a2a;
  --background-activated: #333;
  --background-focused: #2a2a2a;
}

/* Responsive tweaks */
@media (max-width: 420px) {
  .logo { width: 110px; height: 110px; }
  .hero { width: 360px; }
  .bienvenido { font-size: 26px; }
  .btn { min-width: 120px; font-size: 14px; }
}
</style>