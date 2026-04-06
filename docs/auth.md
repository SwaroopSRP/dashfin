# Authentication Module

## Overview

The Authentication module handles **user registration**, **login**, and **access control** using **JWT-based authentication**.

It ensures:

* Secure password storage (bcrypt hashing)
* Token-based stateless authentication
* Role-based authorization (RBAC)
* Request validation using schema layer
* Rate limiting for abuse prevention

---

## Base Route

```id="authbase"
/api/v1/auth
```

Mounted via API router: 

---

## Authentication Flow

```id="authflow"
Client → Login/Register → Server validates → JWT issued → 
Client sends token → Middleware verifies → Access granted/denied
```

* Token is sent via:

  ```
  Authorization: Bearer <token>
  ```
* Verified using `authenticate` middleware 

---

## Endpoints

---

### 1. Register User

**POST** `/auth/register`

#### Description

Creates a new user account.

* First registered user → assigned `ADMIN`
* Subsequent users → assigned `VIEWER` 

---

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Validation Rules

* `email` → valid email format
* `password` → minimum 6 characters
* `name` → minimum 2 characters 

---

#### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "ADMIN | VIEWER"
  }
}
```

---

#### Status Codes

| Code | Description               |
| ---- | ------------------------- |
| 201  | User created successfully |
| 400  | User already exists       |

---

#### Middleware Applied

* Rate Limiting (`registerLimiter`)
* Validation (`registerSchema`)
* Async Handler



---

### 2. Login User

**POST** `/auth/login`

---

#### Description

Authenticates user and returns a JWT token.

---

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

#### Validation Rules

* Same as register (email + password) 

---

#### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "ADMIN | VIEWER"
    }
  }
}
```

---

#### Status Codes

| Code | Description         |
| ---- | ------------------- |
| 200  | Login successful    |
| 401  | Invalid credentials |

---

#### Middleware Applied

* Rate Limiting (`authLimiter`)
* Validation (`loginSchema`)
* Async Handler



---

## Authentication Middleware

### 1. Authenticate

Validates JWT token and attaches user to request.

* Extracts token from `Authorization` header
* Verifies token
* Injects:

  ```ts
  req.user = { id, role }
  ```

Failure cases:

* Missing token → `401 Unauthorized`
* Invalid/expired token → `401 Unauthorized`



---

### 2. Authorize

Restricts access based on user roles.

```ts
authorize(Role.ADMIN)
```

Failure cases:

* Unauthorized → `401`
* Forbidden → `403`



---

## Security Considerations

* Passwords are hashed using **bcrypt**
* JWT tokens are signed securely
* No sensitive data exposed in responses
* Rate limiting prevents brute force attacks
* Validation prevents malformed input

---

## Notes

* No refresh token mechanism implemented (stateless JWT)
* Role assignment is automatic:

  * First user → ADMIN
  * Others → VIEWER
* Token must be included in all protected routes

---
