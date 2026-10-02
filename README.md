# TP NestJS con Google OAuth2

Backend hecho con NestJS para registrarse e iniciar sesión con una cuenta de Google. Usa MySQL con TypeORM y devuelve un JWT para acceder a las rutas protegidas.

## Cómo correrlo

Necesitás tener Node.js y MySQL instalados, y un Client ID y Client Secret de Google Cloud Console.

Primero clonás el repositorio e instalás las dependencias:

```bash
git clone https://github.com/saso-0/TpRossiNestjs.git
cd TpRossiNestjs
npm install
```

Después creás la base de datos en MySQL:

```sql
CREATE DATABASE nestjs_oauth;
```

Copiás el archivo `.env.example` como `.env` y completás tus datos (credenciales de Google, clave del JWT y datos de MySQL):

```bash
cp .env.example .env
```

En Google Cloud Console, la URI de redirección autorizada tiene que ser `http://localhost:3000/auth/google/redirect`.

Por último, levantás el servidor:

```bash
npm run start:dev
```

Queda andando en `http://localhost:3000`.

## Rutas

- `GET /auth/google`: te manda al login de Google.
- `GET /auth/google/redirect`: Google vuelve acá y la respuesta trae el token y los datos del usuario.
- `GET /users/me`: devuelve tu perfil. Hay que mandar el header `Authorization: Bearer <token>`.

## Cómo probarlo

Entrá a `http://localhost:3000/auth/google` desde el navegador, iniciá sesión con Google y copiá el token que aparece en la respuesta. Después hacé un `GET /users/me` (con Postman, por ejemplo) mandando ese token en el header `Authorization`.