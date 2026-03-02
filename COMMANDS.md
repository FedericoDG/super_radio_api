# Comandos Útiles - Super Radio API

## Configuración Inicial

### 1. Instalar PostgreSQL (si no lo tienes)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
brew services start postgresql
```

### 2. Crear la base de datos

```bash
# Conectarse a PostgreSQL
sudo -u postgres psql

# Dentro de psql, ejecutar:
CREATE DATABASE super_radio_db;
CREATE USER radio_user WITH PASSWORD 'tu_password_segura';
GRANT ALL PRIVILEGES ON DATABASE super_radio_db TO radio_user;
\q
```

### 3. Configurar .env

```bash
cp .env.example .env
# Editar .env con tus credenciales reales
```

### 4. Ejecutar migraciones

```bash
npm run prisma:migrate
```

## Comandos de Desarrollo

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start

# Prisma Studio (GUI para la DB)
npm run prisma:studio
```

## Comandos de Prisma

```bash
# Generar cliente Prisma
npm run prisma:generate

# Crear y aplicar migración
npm run prisma:migrate

# Resetear la base de datos (¡CUIDADO!)
npx prisma migrate reset

# Ver el estado de las migraciones
npx prisma migrate status

# Formatear schema.prisma
npx prisma format
```

## Testing de la API

### Registro de usuario

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Obtener perfil (reemplaza TOKEN con el token recibido)

```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

### Health check

```bash
curl http://localhost:3000/health
```

## Docker (Recomendado para Desarrollo)

### Opción 1: Docker Compose (Recomendado)

Levanta PostgreSQL + pgAdmin + API todo junto:

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir después de cambios
docker-compose up --build
```

**Acceso a servicios:**

- API: http://localhost:3000
- pgAdmin: http://localhost:5050
  - Email: `admin@superradio.com`
  - Password: `admin123`

**Conectar a la DB desde pgAdmin:**

1. Abrir http://localhost:5050
2. Login con las credenciales de arriba
3. Agregar servidor:
   - Name: `Super Radio DB`
   - Host: `postgres` (nombre del contenedor)
   - Port: `5432`
   - Database: `super_radio_db`
   - Username: `radio_user`
   - Password: `radio_password`

### Opción 2: Solo PostgreSQL

Si solo quieres la base de datos en Docker:

```bash
# Levantar solo PostgreSQL
docker-compose up -d postgres

# O manualmente:
docker run --name super-radio-postgres \
  -e POSTGRES_DB=super_radio_db \
  -e POSTGRES_USER=radio_user \
  -e POSTGRES_PASSWORD=radio_password \
  -p 5432:5432 \
  -d postgres:16-alpine
```

Luego ejecuta la API localmente:

```bash
npm run dev
```

### Comandos útiles de Docker

```bash
# Ver contenedores corriendo
docker ps

# Detener un contenedor
docker stop super-radio-db

# Ver logs de un contenedor
docker logs -f super-radio-db

# Eliminar volúmenes (borra datos)
docker-compose down -v
```

## Prisma con Docker

Cuando uses Docker, ejecuta migraciones así:

```bash
# Con docker-compose corriendo
npm run prisma:migrate

# O entrando al contenedor
docker exec -it super-radio-api npm run prisma:migrate

# Seeders
npm run db:seed

# Reset completo (vacía y llena la DB)
npm run db:reset
```
