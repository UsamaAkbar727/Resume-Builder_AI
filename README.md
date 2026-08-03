# ResumeFlow AI

A full-stack Resume & Portfolio AI Builder project.

## Project Structure

This project is organized as a monorepo containing two independent components:

*   **`frontend/`**: The Next.js React user interface, components, and pages.
*   **`backend/`**: The Laravel PHP backend API handling authentication, resume parsing/optimization, and job applications database.

---

## Getting Started

### 1. Frontend Setup
Navigate into the `frontend/` directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```

Alternatively, from the project **root**, you can use the shortcut scripts:
```bash
# Install frontend dependencies from root
npm run install:frontend

# Run frontend development server from root
npm run dev:frontend
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

### 2. Backend Setup
Navigate into the `backend/` directory, configure environment variables, install dependencies, run migrations, and start the server:
```bash
cd backend
composer install
cp .env.example .env   # Configure database settings inside .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Alternatively, you can run the Laravel server from the **root** using:
```bash
npm run dev:backend
```

---

## Deployment

### Frontend (Vercel)
To deploy the frontend to Vercel:
1. Connect this repository to your Vercel account.
2. In the **Project Settings**, set the **Root Directory** to `frontend`.
3. Vercel will automatically detect the Next.js setup, and build/deploy it from there.
