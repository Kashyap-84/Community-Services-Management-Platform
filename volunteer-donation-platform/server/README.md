# Volunteer & Donation Platform (Server)

## Setup
```bash
cd server
cp .env.example .env
npm i
npm run dev
```

## Create an admin user
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"password123","role":"admin"}'
```
