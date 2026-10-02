# NestJS + Google OAuth2

API de registro y login con Google, usando NestJS, TypeORM, MySQL y JWT.

## Requisitos

- Node.js 18 o superior
- MySQL
- Credenciales de Google (Client ID y Client Secret) creadas en Google Cloud Console

## Instalación

1. Clonar el repositorio e instalar dependencias:
```bash
   git clone https://github.com/saso-0/TpRossiNestjs.git
   cd nestjs-google-oauth
   npm install
```

2. Crear la base de datos en MySQL:
```sql
   CREATE DATABASE nestjs_oauth;
```

3. Copiar `.env.example` a `.env` y completar los valores:
```bash
   cp .env.example .env
```

   En Google Cloud Console, la URI de redirección autorizada debe ser:
   `http://localhost:3000/auth/google/redirect`

## Ejecutar

```bash
npm run start:dev
```

El servidor queda en `http://localhost:3000`.

## Endpoints

- `GET /auth/google`: inicia el login con Google
- `GET /auth/google/redirect`: callback de Google, devuelve el token JWT y los datos del usuario
- `GET /users/me`: devuelve el perfil del usuario (requiere el header `Authorization: Bearer <token>`)

## Cómo probar

1. Abrir `http://localhost:3000/auth/google` en el navegador e iniciar sesión con Google.
2. Copiar el `token` que devuelve la respuesta.
3. Hacer `GET /users/me` con el header `Authorization: Bearer <token>`.