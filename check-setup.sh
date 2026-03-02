#!/bin/bash

echo "🔍 Verificando instalación de Super Radio API..."
echo ""

# Verificar Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js instalado: $(node --version)"
else
    echo "❌ Node.js NO instalado"
    exit 1
fi

# Verificar npm
if command -v npm &> /dev/null; then
    echo "✅ npm instalado: $(npm --version)"
else
    echo "❌ npm NO instalado"
    exit 1
fi

# Verificar PostgreSQL
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL instalado: $(psql --version)"
else
    echo "⚠️  PostgreSQL NO encontrado (necesario para la base de datos)"
fi

echo ""
echo "📦 Verificando dependencias..."

if [ -d "node_modules" ]; then
    echo "✅ node_modules existe"
else
    echo "❌ node_modules NO existe. Ejecuta: npm install"
    exit 1
fi

# Verificar archivo .env
if [ -f ".env" ]; then
    echo "✅ Archivo .env existe"
else
    echo "⚠️  Archivo .env NO existe. Copia .env.example a .env"
fi

# Verificar compilación TypeScript
if [ -d "dist" ]; then
    echo "✅ Proyecto compilado (carpeta dist existe)"
else
    echo "⚠️  Proyecto NO compilado. Ejecuta: npm run build"
fi

# Verificar cliente Prisma
if [ -d "node_modules/@prisma/client" ]; then
    echo "✅ Cliente de Prisma generado"
else
    echo "⚠️  Cliente Prisma NO generado. Ejecuta: npm run prisma:generate"
fi

echo ""
echo "📋 Checklist de instalación:"
echo ""
echo "  [ ] 1. Copiar .env.example a .env"
echo "  [ ] 2. Configurar DATABASE_URL en .env"
echo "  [ ] 3. Crear base de datos PostgreSQL"
echo "  [ ] 4. Ejecutar: npm run prisma:migrate"
echo "  [ ] 5. Ejecutar: npm run dev"
echo ""
echo "✨ Para empezar: npm run dev"
