 Casos de Uso - Proyecto Lionfit

## UC-001: Registro de Usuario

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-001 |
| **Nombre** | Registro de nuevo usuario en la aplicación |
| **Descripción** | Permite a un usuario nuevo crear una cuenta en la aplicación Lionfit para acceder a todas las funcionalidades de seguimiento de entrenamientos |
| **Actores** | Usuario no registrado (principal) |
| **Precondiciones** | • El usuario tiene acceso a internet<br>• El usuario no tiene una cuenta registrada<br>• La aplicación está funcionando correctamente |
| **Flujo Básico** | 1. El usuario abre la aplicación<br>2. Selecciona la opción "Registrarse"<br>3. Ingresa su correo electrónico<br>4. Ingresa su contraseña<br>5. Confirma su contraseña<br>6. Acepta los términos y condiciones<br>7. Presiona el botón "Crear cuenta"<br>8. El sistema valida los datos ingresados<br>9. El sistema crea la cuenta de usuario<br>10. El sistema muestra mensaje de registro exitoso<br>11. El usuario es redirigido a la pantalla principal |
| **Flujos Alternativos** | • **5a:** Correo electrónico ya registrado<br>  - El sistema muestra mensaje de error<br>  - Sugiere iniciar sesión o usar otro correo<br>• **5b:** Contraseñas no coinciden<br>  - El sistema muestra mensaje de error<br>  - Solicita volver a ingresar las contraseñas<br>• **5c:** Formato de correo inválido<br>  - El sistema muestra mensaje de error<br>  - Solicita correo con formato válido |
| **Postcondiciones** | • El usuario tiene una cuenta creada en el sistema<br>• El usuario puede iniciar sesión con sus credenciales<br>• Se crea un perfil básico de usuario |
| **Requisitos Asociados** | RF-001 |

---

## UC-002: Inicio de Sesión

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-002 |
| **Nombre** | Autenticación de usuario registrado |
| **Descripción** | Permite a un usuario registrado acceder a su cuenta mediante credenciales válidas para utilizar las funcionalidades de la aplicación |
| **Actores** | Usuario registrado (principal) |
| **Precondiciones** | • El usuario tiene una cuenta registrada<br>• El usuario conoce sus credenciales<br>• La aplicación está funcionando correctamente |
| **Flujo Básico** | 1. El usuario abre la aplicación<br>2. Selecciona la opción "Iniciar Sesión"<br>3. Ingresa su correo electrónico<br>4. Ingresa su contraseña<br>5. Presiona el botón "Ingresar"<br>6. El sistema valida las credenciales<br>7. El sistema genera un token de sesión<br>8. El usuario es redirigido a la pantalla principal |
| **Flujos Alternativos** | • **6a:** Credenciales incorrectas<br>  - El sistema muestra mensaje de error<br>  - Ofrece opción de recuperar contraseña<br>• **6b:** Usuario no existe<br>  - El sistema muestra mensaje de error<br>  - Sugiere registrarse<br>• **6c:** Campos vacíos<br>  - El sistema muestra mensaje de error<br>  - Solicita completar todos los campos |
| **Postcondiciones** | • El usuario está autenticado en el sistema<br>• Se establece una sesión activa<br>• El usuario accede a su perfil y datos |
| **Requisitos Asociados** | RF-002 |

---

## UC-003: Visualización de Entrenamiento

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-003 |
| **Nombre** | Consulta de entrenamiento diario programado |
| **Descripción** | Permite al usuario visualizar el entrenamiento asignado para el día actual, incluyendo ejercicios, series y repeticiones |
| **Actores** | Usuario autenticado (principal) |
| **Precondiciones** | • El usuario ha iniciado sesión<br>• Existe un entrenamiento programado para el día<br>• El usuario tiene permisos para ver su entrenamiento |
| **Flujo Básico** | 1. El usuario accede a la pantalla principal<br>2. El sistema muestra la sección "Entrenamiento del Día"<br>3. El usuario visualiza la lista de ejercicios<br>4. Cada ejercicio muestra: nombre, series, repeticiones, descanso<br>5. El usuario puede ver instrucciones de cada ejercicio<br>6. El sistema muestra el progreso actual del entrenamiento |
| **Flujos Alternativos** | • **3a:** No hay entrenamiento programado<br>  - El sistema muestra mensaje "Sin entrenamiento hoy"<br>  - Ofrece opción de crear entrenamiento espontáneo<br>• **3b:** Entrenamiento ya completado<br>  - El sistema muestra estado "Completado"<br>  - Muestra estadísticas del entrenamiento |
| **Postcondiciones** | • El usuario conoce su entrenamiento del día<br>• El usuario puede comenzar a registrar su progreso<br>• El sistema registra la visualización |
| **Requisitos Asociados** | RF-003 |

---

## UC-004: Registro de Ejercicios

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-004 |
| **Nombre** | Captura de progreso de entrenamiento |
| **Descripción** | Permite al usuario registrar el progreso de cada ejercicio durante su entrenamiento, incluyendo series completadas y repeticiones realizadas |
| **Actores** | Usuario autenticado (principal) |
| **Precondiciones** | • El usuario ha iniciado sesión<br>• Existe un entrenamiento activo<br>• El usuario está en modo de registro |
| **Flujo Básico** | 1. El usuario inicia un entrenamiento<br>2. El sistema muestra el primer ejercicio<br>3. El usuario completa las series y repeticiones<br>4. El usuario marca el ejercicio como completado<br>5. El sistema registra el progreso<br>6. El sistema muestra el siguiente ejercicio<br>7. El proceso se repite hasta finalizar todos los ejercicios<br>8. El usuario confirma finalización del entrenamiento<br>9. El sistema guarda el registro completo |
| **Flujos Alternativos** | • **4a:** Usuario no puede completar todas las series<br>  - El usuario registra series parciales<br>  - El sistema guarda el progreso parcial<br>• **4b:** Usuario necesita modificar pesos/cargas<br>  - El usuario ajusta los valores antes de registrar<br>  - El sistema actualiza los datos |
| **Postcondiciones** | • El entrenamiento queda registrado en el sistema<br>• Se actualizan las estadísticas del usuario<br>• El entrenamiento se marca como completado |
| **Requisitos Asociados** | RF-004, RF-007, RF-008 |

---

## UC-005: Visualización de Historial

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-005 |
| **Nombre** | Consulta de registros de entrenamientos pasados |
| **Descripción** | Permite al usuario revisar su historial de entrenamientos, incluyendo estadísticas semanales y detalles de cada sesión |
| **Actores** | Usuario autenticado (principal) |
| **Precondiciones** | • El usuario ha iniciado sesión<br>• Existen registros de entrenamientos previos<br>• El usuario tiene permisos para ver su historial |
| **Flujo Básico** | 1. El usuario accede a la sección "Historial"<br>2. El sistema muestra el resumen de la última semana<br>3. El usuario visualiza estadísticas: total entrenamientos, ejercicios, progreso<br>4. El usuario puede seleccionar una fecha específica<br>5. El sistema muestra detalles del entrenamiento seleccionado<br>6. El usuario puede navegar entre diferentes semanas |
| **Flujos Alternativos** | • **2a:** No hay registros en la última semana<br>  - El sistema muestra mensaje "Sin registros recientes"<br>  - Ofrece opción de ver períodos anteriores<br>• **5a:** Fecha sin entrenamiento registrado<br>  - El sistema muestra mensaje "Descanso"<br>  - No muestra detalles de ejercicios |
| **Postcondiciones** | • El usuario conoce su progreso histórico<br>• El sistema registra la consulta al historial<br>• El usuario puede analizar su evolución |
| **Requisitos Asociados** | RF-005, RF-009, RF-010 |

---

## UC-006: Navegación

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-006 |
| **Nombre** | Movilidad entre secciones de la aplicación |
| **Descripción** | Permite al usuario moverse entre las diferentes secciones y pantallas de la aplicación de manera intuitiva y eficiente |
| **Actores** | Usuario autenticado (principal) |
| **Precondiciones** | • El usuario ha iniciado sesión<br>• La aplicación está funcionando correctamente<br>• Existen secciones accesibles para el usuario |
| **Flujo Básico** | 1. El usuario está en cualquier pantalla de la aplicación<br>2. El usuario accede al menú de navegación<br>3. El usuario selecciona la sección deseada<br>4. El sistema carga la sección seleccionada<br>5. El usuario puede volver a la pantalla anterior<br>6. El usuario puede acceder a la pantalla principal |
| **Flujos Alternativos** | • **3a:** Sección no disponible<br>  - El sistema muestra mensaje de error<br>  - Mantiene al usuario en la pantalla actual<br>• **3b:** Pérdida de conexión durante navegación<br>  - El sistema muestra mensaje de error<br>  - Ofrece opción de reintentar |
| **Postcondiciones** | • El usuario accede a la sección deseada<br>• Se mantiene el contexto de la sesión<br>• El sistema registra la navegación |
| **Requisitos Asociados** | RF-006, RF-011, RF-012 |

---

## UC-007: Gestión de Sesión

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-007 |
| **Nombre** | Control de sesión de usuario |
| **Descripción** | Permite al usuario cerrar su sesión de manera segura y limpiar los datos temporales de la aplicación |
| **Actores** | Usuario autenticado (principal) |
| **Precondiciones** | • El usuario tiene una sesión activa<br>• La aplicación está funcionando correctamente |
| **Flujo Básico** | 1. El usuario accede al menú de opciones<br>2. El usuario selecciona "Cerrar Sesión"<br>3. El sistema solicita confirmación<br>4. El usuario confirma el cierre de sesión<br>5. El sistema elimina el token de sesión<br>6. El sistema limpia datos temporales<br>7. El usuario es redirigido a la pantalla de login |
| **Flujos Alternativos** | • **4a:** Usuario cancela el cierre de sesión<br>  - El sistema mantiene la sesión activa<br>  - El usuario regresa a la pantalla anterior<br>• **4b:** Error al cerrar sesión<br>  - El sistema muestra mensaje de error<br>  - Ofrece opción de reintentar |
| **Postcondiciones** | • La sesión del usuario termina<br>• Se eliminan datos temporales<br>• El usuario debe volver a autenticarse para acceder |
| **Requisitos Asociados** | RF-007 |

---

## UC-008: Visualización de Ejercicio

| Campo | Descripción |
|--------|-------------|
| **Código** | UC-008 |
| **Nombre** | Consulta detallada de información de ejercicios |
| **Descripción** | Permite al usuario ver información completa de un ejercicio específico. |
| **Actores** | Usuario autenticado (principal) |
| **Precondiciones** | • El usuario ha iniciado sesión<br>• El ejercicio existe en la base de datos<br>• El usuario tiene acceso al ejercicio |
| **Flujo Básico** | 1. El usuario selecciona un ejercicio de cualquier lista<br>2. El sistema muestra la pantalla de detalles del ejercicio<br>3. El usuario visualiza: nombre, descripción, grupo muscular<br>4. El usuario puede volver a la pantalla anterior |
| **Flujos Alternativos** | • **2a:** Ejercicio no encontrado<br>  - El sistema muestra mensaje de error<br>  - Ofrece lista de ejercicios similares<br>• **5a:** No hay contenido multimedia disponible<br>  - El sistema muestra solo instrucciones textuales<br>  - Sugiere buscar recursos externos |
| **Postcondiciones** | • El usuario conoce completamente el ejercicio<br>• El sistema registra la consulta del ejercicio<br>• El usuario puede ejecutar el ejercicio correctamente |
| **Requisitos Asociados** | RF-008 |

---