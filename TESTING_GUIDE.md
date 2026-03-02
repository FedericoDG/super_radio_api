# 🧪 Guía de Testing con REST Client

## 📁 Archivos .http Disponibles

```
super_radio_api/
├── api-tests.http                          # ⭐ FLUJO COMPLETO (EMPEZAR AQUÍ)
└── src/features/
    ├── user/user.http                      # Tests de autenticación
    ├── program/program.http                # Tests CRUD de programas
    └── schedule/schedule.http              # Tests CRUD de horarios
```

## 🎯 Orden de Prueba Recomendado

### 1. **api-tests.http** - Workflow Completo ⭐

Este archivo contiene un flujo completo de principio a fin:

- Health check
- Login y obtención de token
- Crear programa
- Crear horario
- Listar datos
- Actualizar recursos
- Eliminar recursos

**Perfecto para**: Entender el flujo completo de la API

---

### 2. **user.http** - Autenticación

- Registro de usuarios
- Login
- Obtener perfil

**Perfecto para**: Obtener tokens de autenticación para otras pruebas

---

### 3. **program.http** - CRUD de Programas

- Crear programas
- Listar programas
- Obtener programa por ID
- Actualizar programas
- Eliminar programas
- Casos de error

**Perfecto para**: Probar la gestión de programas de radio

---

### 4. **schedule.http** - CRUD de Horarios

- Crear horarios (con programas)
- Listar todos los horarios
- Obtener horario por ID
- Actualizar horarios
- Eliminar horarios
- Vista semanal pública
- Casos de error

**Perfecto para**: Probar la programación semanal

---

## 🔧 Instalación de REST Client

### En VS Code:

1. Abre la paleta de extensiones (`Ctrl+Shift+X`)
2. Busca "REST Client"
3. Instala la extensión de **Huachao Mao** (humao.rest-client)

### O desde la terminal:

```bash
code --install-extension humao.rest-client
```

---

## 🚀 Cómo Usar

### Método 1: Click

1. Abre cualquier archivo `.http`
2. Haz clic en **"Send Request"** sobre cualquier petición

### Método 2: Atajo de teclado

1. Coloca el cursor en cualquier request
2. Presiona:
   - `Ctrl+Alt+R` (Windows/Linux)
   - `Cmd+Alt+R` (Mac)

### Método 3: Menú contextual

1. Click derecho sobre una request
2. Selecciona "Send Request"

---

## 📝 Sintaxis Básica

### Variables

```http
@baseUrl = http://localhost:3000
@token = tu_token_aqui
```

### Request Simple

```http
GET {{baseUrl}}/health
```

### Request con Headers

```http
GET {{baseUrl}}/api/programs
Authorization: Bearer {{token}}
```

### Request con Body

```http
POST {{baseUrl}}/api/programs
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Mi Programa",
  "description": "Descripción"
}
```

### Capturar Response

```http
# @name login
POST {{baseUrl}}/api/users/login
Content-Type: application/json

{
  "email": "admin@superradio.com",
  "password": "password123"
}

### Usar dato del response anterior
@token = {{login.response.body.data.token}}
```

---

## 🔑 Credenciales de Prueba

### Usuario Administrador

```
Email: admin@superradio.com
Password: password123
```

### Otros Usuarios Disponibles

```
user1@superradio.com - password123
user2@superradio.com - password123
test@superradio.com - password123
```

---

## 💡 Tips

### 1. Usar variables para IDs dinámicos

```http
# Capturar el ID del response
# @name createProgram
POST {{baseUrl}}/api/programs
...

@programId = {{createProgram.response.body.data.program.id}}

# Usar el ID capturado
GET {{baseUrl}}/api/programs/{{programId}}
```

### 2. Comentarios

```http
### Este es un comentario de sección
# Este es un comentario de línea
```

### 3. Separación de requests

Usa `###` para separar diferentes requests:

```http
### Request 1
GET {{baseUrl}}/endpoint1

### Request 2
GET {{baseUrl}}/endpoint2
```

### 4. Variables aleatorias

REST Client incluye variables útiles:

```http
{
  "email": "user{{$randomInt}}@test.com",
  "timestamp": "{{$timestamp}}"
}
```

---

## 🎯 Flujo de Trabajo Recomendado

### Para desarrollo diario:

1. **Inicia el servidor**: `npm run dev`
2. **Abre `api-tests.http`**
3. **Ejecuta el login** para obtener un token fresco
4. **Copia el token** a la variable `@token`
5. **Prueba los endpoints** que necesites

### Para testing completo:

1. **Ejecuta todas las requests de `api-tests.http`** en orden
2. **Revisa `user.http`** para casos específicos de autenticación
3. **Revisa `program.http`** para casos específicos de programas
4. **Revisa `schedule.http`** para casos específicos de horarios

---

## 🐛 Troubleshooting

### "Connection refused"

- Verifica que el servidor esté corriendo: `npm run dev`
- Verifica el puerto en `.env` y en los archivos `.http`

### "401 Unauthorized"

- Obtén un token fresco ejecutando el login
- Verifica que el token esté correctamente copiado en `@token`
- Los tokens expiran después de 7 días

### "404 Not Found"

- Verifica que la URL sea correcta
- Asegúrate de que el servidor esté corriendo
- Revisa que los IDs de recursos existan

### "400 Bad Request"

- Revisa que el JSON esté bien formado
- Verifica que todos los campos requeridos estén presentes
- Revisa las validaciones en la documentación

---

## 📚 Documentación Adicional

- **API Endpoints**: Ver `API_ENDPOINTS.md`
- **Implementación CRUD**: Ver `CRUD_IMPLEMENTATION.md`
- **README Principal**: Ver `README.md`

---

## 🎓 Ejemplos Específicos

### Crear programa y horario completo:

```http
### 1. Login
# @name login
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "admin@superradio.com",
  "password": "password123"
}

### 2. Guardar token
@token = {{login.response.body.data.token}}

### 3. Crear programa
# @name newProgram
POST http://localhost:3000/api/programs
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Rock Clásico",
  "description": "Los éxitos del rock"
}

### 4. Guardar ID del programa
@programId = {{newProgram.response.body.data.program.id}}

### 5. Crear horario para el programa
POST http://localhost:3000/api/schedule
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "programId": "{{programId}}",
  "dayOfWeek": 1,
  "startTime": "14:00",
  "endTime": "16:00"
}
```

---

¡Happy Testing! 🚀
