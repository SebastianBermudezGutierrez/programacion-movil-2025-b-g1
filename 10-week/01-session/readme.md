# 📌 API de Usuarios

Esta es una API construida con **Node.js + Express** que permite gestionar usuarios con autenticación mediante **JWT**.  

---

## 🚀 Endpoints disponibles

### 🔑 Autenticación

#### 1. Login
- **Método:** POST
- **URL:** http://localhost:3000/api/auth/login
- **Descripción:** Permite que un usuario inicie sesión con su correo y contraseña.  
- **Request (JSON):**
```json
{
  "email": "sebastian@gmail.com",
  "password": "240624"
}
```
- **Response (200 OK):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
              eyJ1c2VyIjoibjMiyWZdNzhlS1hNDMyLTQ1OWUtODFjMi1mMGYxNjRkZDRkN2UiLCJlbWFpbCI6InNlYmFzdGlhbkBnYWlsLmNvbSIsImlhdCI6MTcwMjcwNjYwOX0.
              UMN-GyFPm-dRU3mOcOt4HWgoMDCekRRChNh-NsczHpQ"
}

```
- **Errores:**
```json
{ "msg": "Credenciales inválidas" }
```

---

### 👤 Usuarios

#### 2. Crear usuario
- **Método:** POST
- **URL:** http://localhost:3000/api/usuarios
- **Descripción:** Registra un nuevo usuario en el sistema. **No requiere token.**  
- **Request (JSON):**
```json
{
  "nombre": "Sebastian bermudez",
  "email": "sebastian@gmail.com",
  "password": "240624"
}
```
- **Response (201 Created):**
```json
{
  "id": "2236d8b1-a432-81b2-f0f164dd4d7e",
  "nombre": "Sebastian bermudez",
  "email": "sebastian@gmail.com",
  "fecha_creacion": "2025-10-06T01:10:22.637Z"
}
```

---

#### 3. Listar usuarios
- **Método:** GET
- **URL:** http://localhost:3000/api/usuarios
- **Descripción:** Devuelve todos los usuarios registrados. **Requiere token.**  
- **Headers:**
```
Authorization: Bearer <token>
```
- **Response (200 OK):**
```json
[
  {
    "id": "2236d8b1-a432-81b2-f0f164dd4d7e",
    "nombre": "Sebastian bermudez",
    "email": "sebastian@gmail.com",
    "fecha_creacion": "2025-10-06T01:10:22.637Z"
  }
]
```

---

#### 4. Obtener usuario por ID
- **Método:** GET
- **URL:** http://localhost:3000/api/usuarios/{id}
- **Descripción:** Devuelve un usuario específico por su id. **Requiere token.**  
- **Response (200 OK):**
```json
{
  "id": "2236d8b1-a432-81b2-f0f164dd4d7e",
  "nombre": "Sebastian bermudez",
  "email": "sebastian@gmail.com",
  "fecha_creacion": "2025-10-06T01:10:22.637Z"
}
```
- **Error (404 Not Found):**
```json
{ "msg": "Usuario no encontrado" }
```

---

#### 5. Actualizar usuario
- **Método:** PUT
- **URL:** http://localhost:3000/api/usuarios/{id}
- **Descripción:** Actualiza los datos de un usuario existente. **Requiere token.**  
- **Request (JSON):**
```json
{
  "nombre": "Sebas2406"
}
```
- **Response (200 OK):**
```json
{
  "id": "2236d8b1-a432-81b2-f0f164dd4d7e",
  "nombre": "Sebas2406",
  "email": "sebastian@gmail.com",
  "fecha_creacion": "2025-10-06T01:10:22.637Z"
}
```
- **Error (404 Not Found):**
```json
{ "msg": "Usuario no encontrado" }
```

---

#### 6. Eliminar usuario
- **Método:** DELETE
- **URL:** http://localhost:3000/api/usuarios/{id}
- **Descripción:** Elimina un usuario por id. **Requiere token.**  
- **Response (204 No Content):**  
(sin body)  
- **Error (404 Not Found):**
```json
{ "msg": "Usuario no encontrado" }
```

---

## 📌 Métodos HTTP usados
- **POST** → Crear recursos o iniciar sesión.  
- **GET** → Consultar información.  
- **PUT** → Actualizar recursos existentes.  
- **DELETE** → Eliminar recursos.  

---
 