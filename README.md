# Assignment Work

A full-stack REST API and dashboard built for the Software Developer Intern assignment.

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite
**Frontend:** React, Vite, TypeScript, TanStack Query, React Router, Vanilla CSS

## Features

* User authentication with JWT stored in HttpOnly cookies
* Password hashing using bcrypt
* Role-based access for USER and ADMIN
* Admin-only product create, update, and delete operations
* Product listing with basic caching
* Input validation using Zod
* Global error handling
* Swagger API documentation available at `/api/v1/api-docs`
* Responsive dashboard UI

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```bash
http://localhost:5000
```

### Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually run on:

```bash
http://localhost:5173
```

If port `5173` is already in use, Vite may start it on another port like `5174`.

## Demo Login

**Admin**

```text
admin@example.com
password123
```

**User**

```text
user@example.com
password123
```

You can also register a new account from the frontend and select the ADMIN role to test admin features.

## Testing

After logging in, you will be redirected to the dashboard.

Admin users can add, update, and delete products. Normal users can only view products.

JWT tokens are stored in HttpOnly cookies, so they are not accessible through `document.cookie`.

The products endpoint also uses simple in-memory caching, so repeated product fetches are faster during local testing.

## Notes

The project currently uses SQLite to keep local setup simple. Since Prisma is used as the ORM, the database can be changed to PostgreSQL or MySQL later with minimal changes.

The backend and frontend are kept separate, which also makes it easier to deploy or containerize them independently.
