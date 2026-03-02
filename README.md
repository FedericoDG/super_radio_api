# Super Radio API

API REST desarrollada con Node.js, TypeScript, Express y Prisma con PostgreSQL.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Framework web
- **Prisma 6** - ORM para PostgreSQL (versión estable)
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación con tokens
- **Bcrypt** - Hash de contraseñas

> **Nota sobre Prisma**: Este proyecto usa Prisma 6 en lugar de Prisma 7 por estabilidad. Prisma 7 requiere configuración adicional con adapters para conectarse a PostgreSQL, mientras que Prisma 6 funciona out-of-the-box con la configuración estándar de `env("DATABASE_URL")`.

## 📁 Estructura del Proyecto

```
super_radio_api/
├── prisma/
│   └── schema.prisma         # Esquema de la base de datos
├── src/
│   ├── config/               # Configuraciones
│   │   ├── database.ts       # Cliente de Prisma
│   │   └── env.ts            # Variables de entorno
│   ├── features/             # Características por dominio
│   │   └── user/
│   │       ├── user.routes.ts    # Rutas de usuario
│   │       ├── user.controller.ts # Controlador
│   │       └── user.service.ts    # Lógica de negocio
│   ├── middleware/           # Middlewares
│   │   ├── auth.ts           # Autenticación JWT
│   │   └── errorHandler.ts  # Manejo de errores
│   └── index.ts              # Punto de entrada
├── .env.example              # Variables de entorno de ejemplo
└── package.json
```

## 🛠️ Instalación

1. **Clonar/copiar el archivo de variables de entorno:**

   ```bash
   cp .env.example .env
   ```

2. **Configurar las variables de entorno en `.env`:**

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/super_radio_db?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=3000
   NODE_ENV=development
   ```

3. **Instalar dependencias:**

   ```bash
   npm install
   ```

4. **Generar el cliente de Prisma:**

   ```bash
   npm run prisma:generate
   ```

5. **Ejecutar migraciones de la base de datos:**
   ```bash
   npm run prisma:migrate
   ```

## 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con hot-reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia el servidor en modo producción
- `npm run prisma:generate` - Genera el cliente de Prisma
- `npm run prisma:migrate` - Ejecuta migraciones de la base de datos
- `npm run prisma:studio` - Abre Prisma Studio (GUI para la DB)

## 🔐 API Endpoints

### Health Check

- `GET /health` - Verifica el estado de la API

### Usuarios

- `POST /api/users/register` - Registro de nuevo usuario
- `POST /api/users/login` - Inicio de sesión
- `GET /api/users/profile` - Obtener perfil (requiere autenticación)

### Ejemplos de uso:

**Registro:**

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Perfil (requiere token):**

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🗄️ Base de Datos

El proyecto usa PostgreSQL con Prisma ORM. El modelo inicial incluye:

- **User**: id, email, password, createdAt, updatedAt

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt (factor de costo: 12)
- Autenticación mediante JWT con tokens que expiran en 7 días
- Validación de entrada en controladores
- Manejo centralizado de errores

## 📝 Mejores Prácticas Implementadas

- ✅ Arquitectura por features (separación de responsabilidades)
- ✅ TypeScript para type-safety
- ✅ Manejo centralizado de errores
- ✅ Variables de entorno para configuración
- ✅ Hash seguro de contraseñas
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Logging de queries en desarrollo

## 🚦 Ejecución

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

## 🧪 Testing de la API

El proyecto incluye archivos `.http` para probar todos los endpoints usando la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VS Code.

### Archivos de prueba disponibles:

- **`api-tests.http`** - Flujo completo de pruebas (RECOMENDADO para empezar)
- **`src/features/user/user.http`** - Tests de autenticación y usuarios
- **`src/features/program/program.http`** - Tests CRUD de programas
- **`src/features/schedule/schedule.http`** - Tests CRUD de horarios

### Cómo usar:

1. **Instala la extensión REST Client en VS Code:**

   ```
   Extensión: humao.rest-client
   ```

2. **Abre cualquier archivo `.http`**

3. **Haz clic en "Send Request"** sobre cualquier petición o usa:
   - `Ctrl+Alt+R` (Windows/Linux)
   - `Cmd+Alt+R` (Mac)

4. **Sigue el flujo en `api-tests.http`** que incluye:
   - Login y obtención de token
   - Crear programa
   - Crear horario
   - Actualizar datos
   - Eliminar recursos

### Credenciales de prueba:

```
Email: admin@superradio.com
Password: password123
```

### Ejemplo rápido:

```http
### Login
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "admin@superradio.com",
  "password": "password123"
}

### Usar el token obtenido
GET http://localhost:3000/api/programs
Authorization: Bearer YOUR_TOKEN_HERE
```
