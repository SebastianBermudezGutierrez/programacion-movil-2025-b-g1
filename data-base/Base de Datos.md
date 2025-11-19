# Manual de Configuración - Docker, Prisma y Base de Datos

## 📋 Tabla de Contenido
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
3. [Configuración de Docker](#configuración-de-docker)
4. [Configuración de Base de Datos PostgreSQL](#configuración-de-base-de-datos-postgresql)
5. [Configuración de Prisma](#configuración-de-prisma)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Comandos Útiles](#comandos-útiles)

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Docker](https://docs.docker.com/get-docker/) (versión 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (versión 2.0+)
- [Node.js](https://nodejs.org/) (versión 18+)
- [npm](https://www.npmjs.com/) (versión 8+)

---

## 🔧 Configuración de Variables de Entorno

### 1. Crear archivo .env
En la raíz del proyecto backend (`/backend/Proyecto-movil-Backend/`), crea un archivo `.env`:

```bash
cd /Users/juank11085/Downloads/programacion-movil-2025-b-g1-main/backend/Proyecto-movil-Backend
touch .env
```

### 2. Configurar variables necesarias ( Ejemplo )
Añade las siguientes variables al archivo `.env`:

```env
# Base de Datos PostgreSQL
POSTGRES_PASSWORD=sebas2406
POSTGRES_USER=sbermudez
POSTGRES_DB=lionfit
DATABASE_URL="postgresql://sbermudez:sebas2406@localhost:5432/lionfit?schema=public"

# JWT
JWT_SECRET=Sebas123456

---

## 🐳 Configuración de Docker

### 1. Docker Compose para Base de Datos
El proyecto incluye un archivo `docker-compose.yml`:

Desde la carpeta `Proyecto-movil-Backend/`
```yaml
# data-base/docker-compose.yml
services:

  db:
    image: postgres:12.16-alpine3.18
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - ./data:/var/lib/postgresql/data
    container_name: postgres_container
    restart: unless-stopped
    command: >
      sh -c "
      if [ -z \"$(ls -A /var/lib/postgresql/data)\" ]; then
        initdb -D /var/lib/postgresql/data/pgdata
      fi &&
      exec docker-entrypoint.sh postgres
      "

```

### 2. Dockerfile para el Backend
El proyecto incluye un `Dockerfile` optimizado:

```dockerfile
FROM node:18-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar solo lo necesario
COPY prisma ./prisma
COPY src ./src
COPY nest-cli.json tsconfig*.json ./

# Generar Prisma Client
RUN npx prisma generate

# Instalar dependencias de desarrollo para el build
RUN npm install -g @nestjs/cli
RUN npm install --save-dev @types/node

# Construir
RUN npm run build

# Puerto expuesto
EXPOSE 3000

# Comando de inicio que ejecuta migraciones y luego inicia la app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
```

---

## 🗄️ Configuración de Base de Datos PostgreSQL

### 1. Iniciar la Base de Datos
```bash
# Desde la carpeta data-base/
cd /Users/juank11085/Downloads/programacion-movil-2025-b-g1-main/data-base
docker-compose up -d

# O desde la carpeta backend/
cd /Users/juank11085/Downloads/programacion-movil-2025-b-g1-main/backend/Proyecto-movil-Backend
docker-compose up -d
```

### 2. Verificar que la base de datos está corriendo
```bash
docker ps
# Deberías ver postgres_container en ejecución
```

---

## 🔮 Configuración de Prisma

### 1. Estructura del Schema
El schema de Prisma está configurado en `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Modelos de Datos
El proyecto incluye los siguientes modelos:
- **User**: Usuarios del sistema
- **Routine**: Rutinas de ejercicio
- **Exercise**: Ejercicios disponibles
- **RoutineExercise**: Relación entre rutinas y ejercicios
- **Workout**: Sesiones de entrenamiento
- **ExerciseRecord**: Registros de ejercicios realizados

### 3. Generar Prisma Client
```bash
# En la carpeta del backend
cd /Users/juank11085/Downloads/programacion-movil-2025-b-g1-main/backend/Proyecto-movil-Backend
npx prisma generate
```

### 4. Crear Migraciones Iniciales
```bash
npx prisma migrate dev --name init
```

### 5. Aplicar Migraciones
```bash
npx prisma migrate dev
```

---

## 🏃‍♂️ Ejecución del Proyecto

### Opción 1: Desarrollo Local

1. **Instalar dependencias**:
```bash
cd /Users/juank11085/Downloads/programacion-movil-2025-b-g1-main/backend/Proyecto-movil-Backend
npm install
```

2. **Iniciar base de datos**:
```bash
docker-compose up -d
```

3. **Generar Prisma Client**:
```bash
npx prisma generate
```

4. **Aplicar migraciones**:
```bash
npx prisma migrate dev
```

5. **Iniciar servidor en desarrollo**:
```bash
npm run start:dev
```


## 🛠️ Comandos Útiles

### Docker
```bash
# Ver contenedores en ejecución
docker ps

# Ver logs de un contenedor
docker logs postgres_container

docker logs backend_container

# Detener contenedores
docker-compose down

# Eliminar volúmenes (cuidado: borra datos)
docker-compose down -v

# Reiniciar contenedores
docker-compose restart
```

### Prisma
```bash
# Ver estado de la base de datos
npx prisma migrate status

# Resetear base de datos (peligroso)
npx prisma migrate reset --force

# Crear nueva migración
npx prisma migrate dev --name nombre_migration

# Generar cliente Prisma
npx prisma generate
```

### NestJS
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod

# Ejecutar tests
npm run test

# Ejecutar tests con cobertura
npm run test:cov

# Formatear código
npm run format

# Linting
npm run lint
```

## 📝 Resumen del Flujo Completo

1. **Configurar variables de entorno** en `.env`
2. **Iniciar PostgreSQL** con `docker-compose up -d`
3. **Instalar dependencias** con `npm install`
4. **Generar Prisma Client** con `npx prisma generate`
5. **Aplicar migraciones** con `npx prisma migrate dev`
6. **Iniciar aplicación** con `npm run start:dev`

---