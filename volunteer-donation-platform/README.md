# Volunteer & Donation Management Platform

A full-stack demo app you can showcase on GitHub + resume:
- React client (Vite)
- Node/Express API
- MongoDB + JWT auth
- Admin-only donation management
- Volunteer self-profile

## Run locally

### 1) Server
```bash
cd server
cp .env.example .env
npm i
npm run dev
```

### 2) Client
```bash
cd ../client
npm i
npm run dev
```

### Create an admin user
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"password123","role":"admin"}'
```
