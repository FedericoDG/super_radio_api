# API Endpoints - Super Radio

## Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

---

## Programs (Todas las rutas protegidas)

### 1. Crear un programa

**POST** `/api/programs`

**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Body:**

```json
{
  "name": "Rock en Español",
  "description": "El mejor rock en tu idioma"
}
```

**Respuesta (201):**

```json
{
  "status": "success",
  "data": {
    "program": {
      "id": "clx...",
      "name": "Rock en Español",
      "description": "El mejor rock en tu idioma",
      "createdAt": "2026-02-14T...",
      "updatedAt": "2026-02-14T..."
    }
  }
}
```

---

### 2. Obtener todos los programas

**GET** `/api/programs`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "results": 6,
  "data": {
    "programs": [
      {
        "id": "clx...",
        "name": "Trasnoche Libre",
        "description": "Música variada para las madrugadas",
        "schedules": [...],
        "createdAt": "2026-02-14T...",
        "updatedAt": "2026-02-14T..."
      }
    ]
  }
}
```

---

### 3. Obtener un programa por ID

**GET** `/api/programs/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "program": {
      "id": "clx...",
      "name": "Trasnoche Libre",
      "description": "Música variada para las madrugadas",
      "schedules": [
        {
          "id": "clx...",
          "dayOfWeek": 1,
          "startTime": "1970-01-01T00:00:00.000Z",
          "endTime": "1970-01-01T07:00:00.000Z",
          "programId": "clx..."
        }
      ],
      "createdAt": "2026-02-14T...",
      "updatedAt": "2026-02-14T..."
    }
  }
}
```

---

### 4. Actualizar un programa

**PUT** `/api/programs/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Body:**

```json
{
  "name": "Trasnoche Musical",
  "description": "Nueva descripción"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "program": {
      "id": "clx...",
      "name": "Trasnoche Musical",
      "description": "Nueva descripción",
      "schedules": [...],
      "createdAt": "2026-02-14T...",
      "updatedAt": "2026-02-14T..."
    }
  }
}
```

---

### 5. Eliminar un programa

**DELETE** `/api/programs/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "message": "Program deleted successfully"
  }
}
```

**Error si tiene schedules (400):**

```json
{
  "status": "error",
  "message": "Cannot delete program with associated schedules. Delete schedules first."
}
```

---

## Schedules

### Ruta Pública

#### Obtener programación semanal

**GET** `/api/schedule/weekly`

**Sin autenticación requerida**

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "schedule": {
      "domingo": [
        {
          "programName": "Trasnoche Libre",
          "programDescription": "Música variada para las madrugadas",
          "start": "00:00",
          "end": "12:00"
        }
      ],
      "lunes": [],
      "martes": [],
      "miercoles": [],
      "jueves": [],
      "viernes": [],
      "sabado": []
    }
  }
}
```

---

### Rutas Protegidas (Requieren autenticación)

#### 1. Crear un horario

**POST** `/api/schedule`

**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Body:**

```json
{
  "programId": "clx...",
  "dayOfWeek": 1,
  "startTime": "14:00",
  "endTime": "18:00"
}
```

**Nota:** `dayOfWeek` es de 0 (Domingo) a 6 (Sábado)

**Respuesta (201):**

```json
{
  "status": "success",
  "data": {
    "schedule": {
      "id": "clx...",
      "programId": "clx...",
      "dayOfWeek": 1,
      "startTime": "1970-01-01T14:00:00.000Z",
      "endTime": "1970-01-01T18:00:00.000Z",
      "program": {
        "id": "clx...",
        "name": "Rock en Español",
        "description": "El mejor rock en tu idioma"
      }
    }
  }
}
```

---

#### 2. Obtener todos los horarios

**GET** `/api/schedule`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "results": 31,
  "data": {
    "schedules": [
      {
        "id": "clx...",
        "programId": "clx...",
        "programName": "Trasnoche Libre",
        "dayOfWeek": 0,
        "startTime": "00:00",
        "endTime": "12:00"
      }
    ]
  }
}
```

---

#### 3. Obtener un horario por ID

**GET** `/api/schedule/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "schedule": {
      "id": "clx...",
      "programId": "clx...",
      "programName": "Trasnoche Libre",
      "dayOfWeek": 0,
      "startTime": "00:00",
      "endTime": "12:00"
    }
  }
}
```

---

#### 4. Actualizar un horario

**PUT** `/api/schedule/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Body (todos los campos son opcionales):**

```json
{
  "programId": "clx...",
  "dayOfWeek": 2,
  "startTime": "15:00",
  "endTime": "19:00"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "schedule": {
      "id": "clx...",
      "programId": "clx...",
      "dayOfWeek": 2,
      "startTime": "1970-01-01T15:00:00.000Z",
      "endTime": "1970-01-01T19:00:00.000Z",
      "program": {...}
    }
  }
}
```

---

#### 5. Eliminar un horario

**DELETE** `/api/schedule/:id`

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Respuesta (200):**

```json
{
  "status": "success",
  "data": {
    "message": "Schedule deleted successfully"
  }
}
```

---

## Validaciones

### Programs

- `name`: Requerido, no puede estar vacío
- `description`: Opcional

### Schedules

- `programId`: Requerido, debe existir en la base de datos
- `dayOfWeek`: Requerido, debe ser 0-6 (0=Domingo, 6=Sábado)
- `startTime`: Requerido, formato HH:MM (ej: "14:30")
- `endTime`: Requerido, formato HH:MM (ej: "18:45")

---

## Códigos de Error

- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (token inválido o faltante)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error
