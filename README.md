# Foodela 🍔

A full-stack food delivery application built with React and Spring Boot.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, STOMP/WebSocket  
**Backend:** Spring Boot 3.3.6, Spring Security, Spring Data JPA, Spring WebSocket  
**Database:** PostgreSQL (production) / H2 (development)  
**Auth:** JWT with HTTP-only cookies

## Project Structure

```
Foodela/
├── src/              # React frontend (Vite)
│   ├── components/   # Reusable UI components
│   ├── context/      # React context providers
│   ├── pages/        # Route pages
│   └── services/     # API client & WebSocket
├── app/              # Spring Boot backend
│   └── src/main/
│       ├── java/     # Controllers, services, models, DTOs
│       └── resources/ # Configuration
├── .env              # Environment variables (not committed)
└── .env.example      # Environment template
```

## Setup

### Prerequisites
- Node.js 18+
- Java 17+
- Maven (via `./mvnw`)

### Frontend

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Backend

```bash
cd app
./mvnw spring-boot:run
```

The backend starts on `http://localhost:8080`.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key variables:
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL |
| `VITE_WS_URL` | WebSocket endpoint |
| `DB_HOST` / `DB_PORT` / `DB_NAME` | Database connection |
| `DB_USERNAME` / `DB_PASSWORD` | Database credentials |
| `JWT_SECRET` | JWT signing key |
| `JWT_EXPIRATION` | Token expiry in ms |

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/logout` | No | Logout |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/restaurants` | No | All restaurants |
| GET | `/api/restaurants/{id}` | No | Restaurant details |
| GET | `/api/restaurants/{id}/menu` | No | Restaurant menu |
| POST | `/api/orders` | Yes | Place order |
| GET | `/api/orders/{id}` | Yes | Order details |
| GET | `/api/orders/my` | Yes | User's orders |
