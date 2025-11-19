# Manual de usuario - Aplicación Móvil de Entrenamiento

Esta aplicación es una herramienta móvil diseñada para ayudarte a registrar, seguimentar y organizar tus entrenamientos personales de manera eficiente.

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Funcionalidades Principales](#funcionalidades-principales)
3. [Guía de Usuario](#guía-de-usuario)
4. [Estructura de Datos](#estructura-de-datos)
5. [Requisitos del Sistema](#requisitos-del-sistema)

## Descripción General

La aplicación móvil de entrenamiento es una plataforma completa que permite a los usuarios:

- Registrarse y autenticarse de forma segura
- Crear y personalizar rutinas de entrenamiento
- Registrar entrenamientos diarios con detalle
- Visualizar historial y progreso
- Organizar ejercicios por grupos musculares

## Funcionalidades Principales

### 🔐 Gestión de Usuarios

#### Registro de Usuario
- **Funcionalidad**: Crear una nueva cuenta de usuario
- **Datos requeridos**: Nombre, identificación, correo electrónico y contraseña
- **Validaciones**: Correo e identificación únicos
- **Acceso**: Desde la pantalla de registro inicial

#### Inicio de Sesión
- **Funcionalidad**: Autenticación de usuarios existentes
- **Credenciales**: Correo electrónico y contraseña
- **Seguridad**: Token JWT para sesiones seguras

### 💪 Gestión de Entrenamientos

#### Registro de Entrenamiento Diario
- **Funcionalidad**: Registrar un nuevo entrenamiento del día
- **Datos**: Fecha, descripción opcional
- **Asociación**: Automáticamente vinculado al usuario actual

#### Tipos de Entrenamiento
- **Pecho**: Ejercicios focused en pectorales
- **Espalda**: Ejercicios para dorsal y trapecios
- **Pierna**: Ejercicios para cuádriceps, femorales y glúteos
- **Brazo**: Ejercicios para bíceps y tríceps
- **Personalizado**: Crear rutinas específicas

#### Creación de Entrenamientos Personalizados
- **Nombre**: Asignar un nombre específico a la rutina
- **Descripción**: Detalles adicionales opcionales
- **Ejercicios**: Agregar múltiples ejercicios
- **Series y Repeticiones**: Configurar para cada ejercicio

### 📋 Gestión de Ejercicios

#### Agregar Ejercicios
- **Selección**: Elegir de ejercicios existentes o crear nuevos
- **Configuración**: Especificar series y repeticiones
- **Organización**: Agrupar por tipo de entrenamiento

#### Registro Detallado
- **Series**: Número de series por ejercicio
- **Repeticiones**: Repeticiones por serie
- **Validación**: Campos obligatorios requeridos

### 📊 Seguimiento y Progreso

#### Historial Semanal
- **Visualización**: Resumen de entrenamientos de los últimos 7 días
- **Detalles**: Acceso a información completa de cada sesión
- **Estadísticas**: Progreso

#### Detalles de Entrenamiento
- **Fecha**: Fecha específica del entrenamiento
- **Ejercicios**: Lista completa de ejercicios realizados
- **Series/Repeticiones**: Configuración utilizada

### 🎨 Interfaz de Usuario

#### Navegación Intuitiva
- **Menú Principal**: Acceso rápido a todas las secciones
- **Navegación entre Secciones**: Movimiento fluido entre pantallas
- **Volver Atrás**: Regreso a pantallas anteriores

#### Elementos Visuales
- **Fecha Actual**: Siempre visible en registros diarios
- **Menú Contextual**: Opciones adicionales según contexto
- **Retroalimentación Visual**: Confirmación de acciones

#### Validaciones y Notificaciones
- **Campos Obligatorios**: Alertas para datos faltantes
- **Confirmación de Acciones**: Mensajes de éxito
- **Errores**: Mensajes claros y descriptivos

## Guía de Usuario

### Flujo de Uso Típico

1. **Inicio de Sesión**: Acceder con credenciales
2. **Selección de Tipo**: Elegir tipo de entrenamiento
3. **Configuración**: Agregar ejercicios con series/repeticiones
4. **Registro**: Guardar el entrenamiento del día
5. **Revisión**: Consultar historial y progreso

### Pasos Detallados

#### Para Registrar un Entrenamiento:

1. Iniciar sesión en la aplicación
2. Seleccionar "Registro Diario" desde el menú principal
3. Elegir tipo de entrenamiento (Pecho, Espalda, Pierna, Brazo o Personalizado)
4. Agregar ejercicios deseados:
   - Seleccionar ejercicio existente o crear nuevo
   - Especificar número de series
   - Especificar número de repeticiones
5. Confirmar y guardar el entrenamiento

#### Para Ver Historial:

1. Acceder a "Historial Semanal" desde el menú
2. Visualizar resumen de los últimos 7 días
3. Seleccionar un entrenamiento específico para ver detalles
4. Revisar ejercicios, series y repeticiones.

#### Para Crear Rutinas Personalizadas:

1. Elegir opción "Personalizado" en tipo de entrenamiento
2. Asignar nombre a la rutina
3. Agregar descripción si se desea
4. Configurar ejercicios con sus parámetros
5. Guardar para uso futuro

## Estructura de Datos

### Entidades Principales

#### Usuario
- **ID**: Identificador único
- **Nombre**: Nombre completo del usuario
- **Identificación**: Número de identificación único
- **Correo**: Correo electrónico único
- **Contraseña**: Hash seguro de la contraseña

#### Rutina
- **ID**: Identificador único
- **Nombre**: Nombre de la rutina
- **Descripción**: Detalles adicionales
- **Usuario**: Relación con el usuario creador
- **Ejercicios**: Lista de ejercicios asociados

#### Ejercicio
- **ID**: Identificador único
- **Nombre**: Nombre del ejercicio
- **Descripción**: Detalles del ejercicio
- **Músculo**: Grupo muscular principal

#### Entrenamiento (Workout)
- **ID**: Identificador único
- **Fecha**: Fecha del entrenamiento
- **Descripción**: Notas del entrenamiento
- **Usuario**: Relación con el usuario
- **Registros**: Detalles de ejercicios realizados

#### Registro de Ejercicio
- **ID**: Identificador único
- **Entrenamiento**: Relación con el workout
- **Ejercicio**: Ejercicio específico
- **Series**: Número de series realizadas
- **Repeticiones**: Repeticiones por serie

## Requisitos del Sistema

### Características Técnicas
- **Frontend**: Vue.js con Ionic Framework
- **Backend**: NestJS con TypeScript
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT tokens
- **Arquitectura**: RESTful API
