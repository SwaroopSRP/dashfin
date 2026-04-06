# Zorfin API Documentation

## 1. Introduction

**Zorfin** is a modular, production-ready backend system designed for managing users, records, and analytical insights through a secure and scalable RESTful API.

Built using **Node.js**, **Express**, and **TypeScript**, Zorfin follows modern backend design principles with a strong emphasis on **modularity, security, and maintainability**. It integrates **PostgreSQL** via **Prisma ORM** for efficient and type-safe database operations.

The system is structured to support real-world application needs such as **role-based access control (RBAC)**, **data analytics**, and **secure authentication**, making it suitable for scalable SaaS or dashboard-driven platforms.

---

## 2. Key Features

* **JWT-based Authentication**

  * Stateless authentication using secure token signing
  * Middleware-driven request protection

* **Role-Based Access Control (RBAC)**

  * Fine-grained access control using roles:

    * `ADMIN`
    * `ANALYST`
    * `VIEWER`
  * Centralized authorization logic

* **Modular Architecture**

  * Feature-based module separation (`auth`, `user`, `records`, `summary`)
  * Clean and maintainable code structure

* **Prisma + PostgreSQL Integration**

  * Type-safe database queries
  * Scalable relational data modeling
  * Migration-based schema evolution

* **Advanced Records Management**

  * CRUD operations with filtering and pagination
  * Soft delete support
  * Audit fields (`createdBy`, `updatedBy`)

* **Analytics & Insights (Summary Module)**

  * Aggregated financial/data summaries
  * Category breakdowns
  * Time-based trends and recent activity

* **Validation Layer**

  * Request validation using **Zod schemas**
  * Strong input constraints and sanitization

* **Rate Limiting**

  * Protects endpoints from abuse and brute-force attacks
  * Applied to sensitive routes (e.g., auth)

* **Centralized Error Handling**

  * Custom `ApiError` class
  * Consistent error response format

* **Structured Logging**

  * Request-level logging for monitoring and debugging

---

## 3. Architecture Overview

Zorfin follows a **layered architecture pattern**:

```text
Request → Route → Controller → Service → Database
                    ↓
               Validation Layer
                    ↓
           Middleware (Auth, Logging, Rate Limit)
```

### Layer Responsibilities

* **Routes**

  * Define API endpoints
  * Bind routes to controllers

* **Controllers**

  * Handle HTTP lifecycle (request → response)
  * Delegate logic to services

* **Services**

  * Contain core business logic
  * Interact with Prisma/database

* **Schemas**

  * Validate incoming requests using Zod

* **Middleware**

  * Authentication (JWT)
  * Authorization (RBAC)
  * Logging
  * Rate limiting
  * Error handling

---

## 4. Project Structure (Simplified)

```text
src/
├── app.ts
├── index.ts

├── config/
│   └── db.ts

├── middleware/
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   ├── rateLimit.middleware.ts
│   └── validate.middleware.ts

├── modules/
│   ├── auth/
│   ├── user/
│   ├── records/
│   ├── summary/
│   └── healthcheck/

├── utils/
│   ├── asyncHandler.ts
│   ├── jwt.utils.ts
│   ├── responses.ts
│   └── errors.ts

prisma/
├── schema.prisma
└── migrations/
```

---

## 5. Module Overview

* **Auth Module**

  * Handles registration, login, and JWT issuance
  * Provides authentication & authorization middleware

* **User Module**

  * Manages user lifecycle
  * Implements RBAC and admin-level controls

* **Records Module**

  * Core data layer (transactions/records)
  * Supports filtering, pagination, and audit tracking

* **Summary Module**

  * Provides analytics and aggregated insights
  * Enables dashboard-ready data

* **Healthcheck Module**

  * Monitors API availability and service health

---

## 6. Technology Stack

| Layer      | Technology    |
| ---------- | ------------- |
| Runtime    | Node.js       |
| Framework  | Express.js    |
| Language   | TypeScript    |
| Database   | PostgreSQL    |
| ORM        | Prisma        |
| Validation | Zod           |
| Auth       | JWT           |
| Security   | Rate Limiting |

---

## 7. What This Documentation Covers

* API endpoints for each module
* Request and response formats
* Authentication & authorization flow
* Permission matrix across roles
* Error handling conventions

---

## Modules

* [Authentication Module](./auth.md)
* [User Module](./user.md)
* [Records Module](./records.md)
* [Summary Module](./summary.md)

---

## System

* [API Conventions](./core.md)
* [Permission Matrix](./permissions.md)
