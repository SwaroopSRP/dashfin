# Dashfin 💹

Dashfin is a backend system for a finance dashboard application that handles data management, analytics, and RBAC with scalability and modular architecture.

**Live API:** <https://zorfin-production.up.railway.app/>

**Repository:** <https://github.com/SwaroopSRP/zorfin>

**Documentations:** <https://github.com/SwaroopSRP/zorfin/blob/main/docs/intro.md>

---

## 📌 Overview

**Dashfin** is a modular backend system developed for **Finance dashboard application**, designed to handle:

* Data management
* Analytics & insights
* Role-based access control (RBAC)

It is built as a **RESTful API** with a strong focus on **scalability, modular architecture, and clean backend design**.

---

## ⚙️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Validation:** Zod
* **Authentication:** JWT
* **Deployment:** Railway

---

## ✨ Key Features

* 🔐 **JWT Authentication**

  * Secure, stateless authentication
  * Token-based access control

* 🛡️ **Role-Based Access Control (RBAC)**

  * Roles: `ADMIN`, `ANALYST`, `VIEWER`
  * Fine-grained route protection

* 📦 **Modular Architecture**

  * Feature-based modules (`auth`, `user`, `records`, `summary`)
  * Clean separation of concerns

* 📊 **Analytics Module (Summary)**

  * Income vs Expense overview
  * Category breakdown
  * Weekly trends
  * Recent activity

* 📁 **Records Management**

  * Full CRUD support
  * Filtering & pagination
  * Soft delete support
  * Audit fields (`createdBy`, `updatedBy`)

* ⚡ **Rate Limiting**

  * Prevents abuse and brute-force attacks

* ✅ **Validation Layer**

  * Zod-based request validation
  * Strong input constraints

* 🧯 **Centralized Error Handling**

  * Standardized API responses
  * Custom error abstraction

* 📝 **Structured Logging**

  * Request-level logging for debugging and monitoring

---

## 🏗️ Architecture

```text
Request → Route → Controller → Service → Database
                    ↓
               Validation Layer
                    ↓
           Middleware (Auth, Logging, Rate Limit)
```

---

## 📂 Project Structure (Simplified)

```text
src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── records/
│   ├── summary/
│   └── healthcheck/

├── middleware/
├── utils/
├── config/
└── types/

prisma/
└── schema.prisma
```

---

## 🔑 Core Modules

* **Auth Module**

  * User registration & login
  * JWT token generation

* **User Module**

  * User management
  * Role enforcement (RBAC)

* **Records Module**

  * Core data handling
  * Filtering, pagination, soft delete

* **Summary Module**

  * Aggregated insights & analytics
  * Dashboard-ready endpoints

* **Healthcheck Module**

  * API availability monitoring

---

## 🔄 API Highlights

* RESTful design principles
* Pagination support across endpoints
* Filtering & search capabilities
* Consistent response format
* Secure protected routes

---

## ⚠️ Assumptions

This system is designed with the following assumptions:

* 🏢 **Internal System Usage**

  * Intended for use within an organization (e.g., finance dashboard)
  * Not exposed as a public multi-tenant SaaS (yet)

* 👥 **Predefined Roles**

  * Roles are fixed (`ADMIN`, `ANALYST`, `VIEWER`)
  * No dynamic role creation

* 🔐 **JWT-only Authentication**

  * No refresh token mechanism (stateless design)

* 🗑️ **Soft Delete Strategy**

  * Data is not immediately removed
  * Cleanup endpoints handle permanent deletion

* 📊 **On-demand Analytics**

  * Summary data is computed dynamically (not cached)

* ⚙️ **Single Service Architecture**

  * No microservices or distributed components

---

## 🚀 Getting Started (Local Setup)

```bash
git clone https://github.com/SwaroopSRP/zorfin.git
cd zorfin

npm install

# Setup environment variables
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Start server
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Project Info
_AUTHOR="SRP"

# Environment
NODE_ENV=development        # or production
PORT=5001

# CORS Configuration
CORS_ORIGIN=*

# Database (PostgreSQL via Prisma)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Authentication (JWT)
JWT_SECRET="your_jwt_secret_here"

# Rate Limiting - Auth Routes
RATE_LIMIT_AUTH_WINDOW_MS=900000     # 15 minutes
RATE_LIMIT_AUTH_MAX=50               # max requests per window

# Rate Limiting - General API
RATE_LIMIT_GENERAL_WINDOW_MS=60000   # 1 minute
RATE_LIMIT_GENERAL_MAX=100           # max requests per window
```

---

### 📝 Notes

* **DATABASE_URL**

  * Format:

    ```
    postgresql://username:password@localhost:5432/db_name
    ```

  * Required for Prisma to connect to PostgreSQL

* **JWT_SECRET**

  * Use a strong, random string in production
  * Example:

    ```
    openssl rand -base64 32
    ```

* **CORS_ORIGIN**

  * Use `"*"` for development
  * In production, restrict to your frontend domain

* **NODE_ENV**

  * `development` → verbose logs, relaxed configs
  * `production` → optimized behavior

* **Rate Limiting**

  * Auth routes have stricter limits (prevent brute force)
  * General API allows higher throughput

---

---

## 📖 Documentation

All API documentation is organized under the `/docs` directory for better structure and maintainability.

```
docs/
├── intro.md           # Overview & architecture
├── auth.md            # Authentication module
├── user.md            # User module
├── records.md         # Records module
├── summary.md         # Summary/analytics module
├── core.md            # API conventions & error handling
└── permissions.md     # RBAC permission matrix
```

---

### 🔗 Docs Links

* [Introduction](./docs/intro.md)
* [Authentication Module](./docs/auth.md)
* [User Module](./docs/user.md)
* [Records Module](./docs/records.md)
* [Summary Module](./docs/summary.md)
* [API Conventions](./docs/core.md)
* [Permission Matrix](./docs/permissions.md)


---

## 💡 Notes

* Designed with **real-world backend practices**
* Focuses on **clean architecture + scalability**
* Suitable as a **foundation for dashboard-driven applications**

---
