# Especificación de Requisitos de Software (SRS) - IEEE 830

## Lionfit - Aplicación Móvil de Entrenamiento

**Versión:** 3.0
**Fecha:** 18 de Noviembre de 2025
**Autores:** Sebastian Bermudez Gutierrez

---

## 1. Introducción

### 1.1 Propósito del Documento
Este documento especifica los requisitos funcionales y no funcionales del sistema Lionfit, una aplicación móvil diseñada para el registro y seguimiento de entrenamientos personales.

### 1.2 Alcance del Producto
Lionfit es una aplicación móvil que permite a los usuarios:
- Registrarse y autenticarse en el sistema
- Crear y gestionar rutinas de entrenamiento personalizadas
- Registrar sesiones diarias de ejercicio
- Visualizar historial y progreso semanal
- Gestionar ejercicios con series y repeticiones

### 1.3 Definiciones, Acrónimos y Abreviaciones
- **SRS:** Software Requirements Specification
- **HU:** Historia de Usuario
- **UC:** Caso de Uso
- **API:** Application Programming Interface
- **JWT:** JSON Web Token

### 1.4 Referencias
- IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications
- NestJS Documentation: https://docs.nestjs.com/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Prisma Documentation: https://www.prisma.io/docs/
- Vue.js Documentation: https://vuejs.org/guide/
- Ionic Documentation: https://ionicframework.com/docs/

### 1.5 Visión General del Documento
Este documento está organizado en:
- Sección 2: Descripción general del sistema
- Sección 3: Requisitos funcionales detallados
- Sección 4: Requisitos no funcionales
- Sección 5: Interfaces externas
- Sección 6: Logica de datos

---

## 2. Descripción General

### 2.1 Perspectiva del Producto
Lionfit es un sistema cliente-servidor compuesto por:
- **Aplicación Móvil (Frontend):** Desarrollada con Vue.js + Ionic + Capacitor
- **API REST (Backend):** Desarrollada con NestJS + TypeScript
- **Base de Datos:** PostgreSQL con Prisma ORM

### 2.2 Funciones del Producto
#### 2.2.1 Funciones Principales
1. **Gestión de Usuarios:** Registro, autenticación y gestión de perfiles
2. **Gestión de Rutinas:** Creación y personalización de rutinas de entrenamiento
3. **Registro de Entrenamientos:** Captura de sesiones diarias con ejercicios específicos
4. **Seguimiento y Progreso:** Visualización de historial y estadísticas
5. **Navegación:** Movilidad intuitiva entre secciones de la aplicación

#### 2.2.2 Funciones Secundarias
1. **Validación de Datos:** Verificación de campos obligatorios
2. **Retroalimentación Visual:** Confirmación de acciones del usuario
3. **Gestión de Sesiones:** Mantenimiento de estado de autenticación

### 2.3 Características de los Usuarios
#### 2.3.1 Perfil de Usuario Principal
- **Demografía:** Personas interesadas en fitness y entrenamiento personal
- **Experiencia Técnica:** Nivel básico a intermedio con aplicaciones móviles
- **Objetivos:** Seguimiento de progreso físico, organización de rutinas

### 2.4 Restricciones
#### 2.4.1 Restricciones Técnicas
- **Plataforma Móvil:** Android (iOS futuro)
- **Conectividad:** Requiere conexión a Internet para sincronización
- **Base de Datos:** PostgreSQL 12+
- **Autenticación:** JWT tokens

#### 2.4.2 Restricciones de Negocio
- **Privacidad:** Datos de entrenamiento personales y sensibles
- **Seguridad:** Contraseñas encriptadas con bcrypt
- **Rendimiento:** Tiempo de respuesta < 2 segundos

### 2.5 Suposiciones y Dependencias
#### 2.5.1 Suposiciones
- Los usuarios tienen dispositivos móviles compatibles
- Conectividad a Internet disponible para uso completo
- Los usuarios proporcionan información veraz

#### 2.5.2 Dependencias
- **Backend API:** Disponibilidad del servidor NestJS
- **Base de Datos:** Conexión a PostgreSQL
- **Servicios Externos:** Ninguno requerido actualmente

---

### 3. Requisitos Funcionales detallados

| Código | Requisito | Descripción | Prioridad | Criterios de Aceptación |
|--------|-----------|------------|-----------|---------------------|
| RF-001 | Registro de Usuarios | Crear nuevas cuentas con validación de datos | Alta | Usuario puede registrarse con email válido y contraseña segura |
| RF-002 | Inicio de Sesión | Autenticar usuarios con credenciales correctas | Alta | Usuario accede con email/contraseña válidos |
| RF-003 | Cierre de Sesión | Finalizar sesión activa y limpiar datos | Alta | Sesión cerrada y redirección a login |
| RF-004 | Crear Rutina Personalizada | Diseñar rutinas con ejercicios específicos | Media | Rutina guardada con ejercicios configurados |
| RF-005 | Seleccionar Tipo de Entrenamiento | Filtrar ejercicios por grupo muscular | Media | Lista filtrada por categoría seleccionada |
| RF-006 | Registrar Entrenamiento Diario | Capturar sesión de ejercicio del día | Alta | Entrenamiento guardado con fecha y ejercicios |
| RF-007 | Agregar Ejercicios a Entrenamiento | Incorporar ejercicios con series/reps | Alta | Ejercicio agregado con configuración válida |
| RF-008 | Especificar Series y Repeticiones | Configurar series y repeticiones por ejercicio | Media | Valores guardados dentro de rangos válidos |
| RF-009 | Ver Historial Semanal | Mostrar resumen de últimos 7 días | Media | Visualización correcta de estadísticas semanales |
| RF-010 | Ver Detalles de Entrenamiento | Visualizar información completa de sesión | Media | Todos los datos del entrenamiento visibles |
| RF-011 | Navegación entre Secciones | Movilidad intuitiva entre áreas de la app | Alta | Transiciones suaves y navegación funcional |
| RF-012 | Volver a Pantalla Anterior | Navegación hacia atrás en el stack | Alta | Botón retroceso funciona correctamente |
| RF-013 | Visualización de Fecha Actual | Mostrar fecha contextual en registros | Baja | Fecha actual mostrada por defecto |
| RF-014 | Menú Contextual | Opciones adicionales según contexto | Baja | Menú aparece con opciones relevantes |
| RF-015 | Validación de Campos Obligatorios | Verificación de datos requeridos | Alta | Campos vacíos muestran errores específicos |
| RF-016 | Retroalimentación Visual | Confirmación de acciones del usuario | Media | Indicadores visuales claros y consistentes |

---

## 4. Requisitos No Funcionales

### 4.1 Requisitos de Rendimiento

#### RNF-001: Tiempo de Respuesta
- **Operaciones CRUD:** < 500ms
- **Consultas complejas:** < 2s
- **Inicio de aplicación:** < 3s

#### RNF-002: Concurrencia
- **Usuarios simultáneos:** 100+
- **Transacciones concurrentes:** 50+

### 4.2 Requisitos de Seguridad

#### RNF-003: Autenticación
- **Encriptación de contraseñas:** bcrypt (salt rounds: 10)
- **Tokens JWT:** Expiración 24h
- **HTTPS obligatorio:** En producción

#### RNF-004: Autorización
- **Acceso por usuario:** Solo datos propios
- **Validación de permisos:** En cada endpoint
- **Sanitización de inputs:** Prevenir inyecciones

### 4.3 Requisitos de Disponibilidad

#### RNF-005: Uptime
- **Disponibilidad objetivo:** 99.5%
- **Mantenimiento programado:** < 4h mensuales
- **Backups automáticos:** Diarios

### 4.4 Requisitos de Usabilidad

#### RNF-006: Experiencia de Usuario
- **Curva de aprendizaje:** < 30min
- **Tareas principales:** < 3 taps
- **Accesibilidad:** WCAG 2.1 AA

### 4.5 Requisitos de Escalabilidad

#### RNF-007: Crecimiento
- **Usuarios:** 10,000+ en primer año
- **Datos por usuario:** Ilimitado
- **Storage:** Escalable horizontalmente

### 4.6 Requisitos de Compatibilidad

#### RNF-008: Plataformas
- **Android:** API Level 24+ (Android 7.0+)
- **iOS:** iOS 12+ (futuro)
- **Backend:** Node.js 18+

---

## 5. Interfaces Externas

### 5.1 Interfaces de Usuario

#### 5.1.1 Interfaz Móvil
- **Framework:** Ionic Vue
- **Diseño:** Material Design
- **Navegación:** Stack-based
- **Componentes:** Web Components

#### 5.1.2 Pantallas Principales
1. **Login/Registro:** Autenticación de usuarios
2. **Dashboard:** Resumen y acceso rápido
3. **Registro Diario:** Captura de entrenamientos
4. **Historial:** Visualización de progreso
5. **Perfil:** Gestión de cuenta

### 5.2 Interfaces de Software

#### 5.2.1 API REST
- **Protocolo:** HTTP/HTTPS
- **Formato:** JSON
- **Autenticación:** Bearer Token (JWT)
- **Documentación:** Swagger/OpenAPI

#### 5.2.2 Endpoints Principales
```
POST /auth/register
POST /auth/login
POST /auth/logout
GET /users/profile
GET /routines
POST /routines
GET /workouts
POST /workouts
GET /exercises
```

### 5.3 Interfaces de Hardware

#### 5.3.1 Dispositivos Móviles
- **Pantalla táctil:** Requerida
- **Conectividad:** Internet requerida
- **Almacenamiento:** 100MB mínimo
- **RAM:** 2GB mínimo

### 5.4 Interfaces de Comunicación

#### 5.4.1 Protocolos
- **API:** REST sobre HTTP/HTTPS
- **Base de Datos:** PostgreSQL protocol
- **Autenticación:** JWT standard

---

## 6. Lógica de Datos

### 6.1 Modelo de Datos

#### 6.1.1 Entidades Principales
| Entidad | Descripción | Relaciones |
|---------|-------------|------------|
| User | Usuario del sistema | 1:N con Routine, 1:N con Workout |
| Routine | Plantilla de entrenamiento | N:M con Exercise, 1:N con User |
| Exercise | Catálogo de ejercicios | N:M con Routine, 1:N con ExerciseRecord |
| Workout | Sesión de entrenamiento | 1:N con ExerciseRecord, 1:N con User |
| ExerciseRecord | Registro de ejercicio en workout | N:1 con Exercise, N:1 con Workout |

#### 6.1.2 Atributos por Entidad

**User:**
- id (UUID, PK)
- name (String, Required)
- identification (String, Unique, Required)
- email (String, Unique, Required)
- password (String, Required, Encrypted)
- token (String, Optional)
- registeredAt (DateTime, Auto)
- created_at (DateTime, Auto)
- updated_at (DateTime, Auto-update)

**Routine:**
- id (UUID, PK)
- name (String, Required)
- description (String, Optional)
- userId (UUID, FK to User)
- created_at (DateTime, Auto)
- updated_at (DateTime, Auto-update)

**Exercise:**
- id (UUID, PK)
- name (String, Required)
- type (String, Required) - Pecho, Espalda, Pierna, Brazo
- description (String, Optional)
- created_at (DateTime, Auto)
- updated_at (DateTime, Auto-update)

**Workout:**
- id (UUID, PK)
- date (String, Required, Format YYYY-MM-DD)
- description (String, Optional)
- userId (UUID, FK to User)
- created_at (DateTime, Auto)
- updated_at (DateTime, Auto-update)

**ExerciseRecord:**
- id (UUID, PK)
- sets (Integer, Required, > 0)
- reps (Integer, Required, > 0)
- workoutId (UUID, FK to Workout)
- exerciseId (UUID, FK to Exercise)
- created_at (DateTime, Auto)
- updated_at (DateTime, Auto-update)

----
