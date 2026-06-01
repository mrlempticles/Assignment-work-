# Full-Stack Scalable REST API & Dashboard

A production-ready full-stack application built for the Software Developer Intern assignment.

## Tech Stack
**Backend**: Node.js, Express, TypeScript, Prisma ORM, SQLite (originally Postgres, swapped for zero-dependency local setup), node-cache.
**Frontend**: React (Vite), TypeScript, TanStack Query, React Router, Vanilla CSS (Glassmorphism).

## Features Implemented
✅ **Authentication**: Secure JWT stored in HttpOnly cookies, password hashing with bcrypt.
✅ **Role-Based Access**: `USER` and `ADMIN` roles. Only Admins can Create/Update/Delete products.
✅ **REST API Best Practices**: Zod schema validation, global error handling, modular routing.
✅ **Caching**: In-memory caching (`node-cache`) middleware for the GET Products endpoint.
✅ **Documentation**: Swagger UI accessible at `/api/v1/api-docs` (Note: Ensure server runs for access).
✅ **Premium UI**: Modern frontend with custom CSS variables, glassmorphism, responsive design.

## Setup Instructions

### Prerequisites
- Node.js v18+

### 1. Start the Backend
```bash
cd backend
npm install
# The SQLite database is already initialized via dev.db
npm run dev
```
*The backend will run on http://localhost:5000*

### 2. Start the Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on http://localhost:5173*

## Testing the Application
Demo logins:
- **Admin**: `admin@example.com` / `password123`
- **User**: `user@example.com` / `password123`

1. **Register**: Go to the frontend URL shown in the terminal, for example `http://localhost:5174/register` if `5173` is already busy. You can select `ADMIN` to test admin privileges.
2. **Dashboard**: Once logged in, you will see the dashboard.
3. **CRUD**: If you registered as an `ADMIN`, you will see the "+ Add Product" button and "Delete" buttons on products. Test adding a product.
4. **Security**: Notice that JWT tokens are stored securely in HttpOnly cookies, invisible to JavaScript (`document.cookie`), preventing XSS attacks.
5. **Caching**: If you check the network tab, subsequent GET requests to `/api/v1/products` return instantly due to the cache middleware on the backend.

---

## Scalability Note
While this project was built within a 3-day constraint and modified to use SQLite/node-cache for ease of local evaluation, the architecture is designed to scale:

1. **Database Swapping**: The Prisma ORM layer allows swapping SQLite for **PostgreSQL** or **MySQL** in production with zero business logic changes.
2. **Caching Strategy**: The `node-cache` middleware can be directly replaced with a **Redis** client to support distributed caching across multiple backend instances.
3. **Microservices Readiness**: The Controller-Service-Repository pattern (currently implemented as Controller-Prisma) decouples routing from business logic, making it easy to extract the Product or Auth modules into standalone microservices.
4. **Load Balancing**: Because JWT authentication is stateless (using HttpOnly cookies rather than server-side sessions), the backend can be horizontally scaled behind a load balancer (e.g., NGINX, AWS ALB) immediately.
5. **Containerization**: The backend and frontend are structured separately, allowing them to be easily containerized via Docker and deployed to Kubernetes or AWS ECS.
