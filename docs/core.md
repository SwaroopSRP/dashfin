# API Conventions

## Response Format

All API responses follow a consistent structure.

---

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Handled via utility: 

---

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "details": {}
}
```

---

## Error Handling

The application uses a centralized error handling mechanism.

---

### ApiError Class

Custom error class used across services:

```ts
throw new ApiError("Message", statusCode);
```

Structure: 

---

### Standard Error Codes

| Code | Meaning                                  |
| ---- | ---------------------------------------- |
| 400  | Bad Request (validation / business rule) |
| 401  | Unauthorized (missing/invalid token)     |
| 403  | Forbidden (insufficient permissions)     |
| 404  | Resource not found                       |
| 409  | Conflict (duplicate data)                |
| 500  | Internal server error                    |

---

### Error Flow

```text
Service → throws ApiError → Middleware catches → formatted response
```

---

## Validation

* Implemented using **Zod schemas**
* Applied via `validate` middleware
* Ensures:

  * Correct data types
  * Required fields
  * Business constraints

---

## Authentication Convention

* Uses JWT-based authentication
* Token must be sent in header:

```
Authorization: Bearer <token>
```

* Missing/invalid token → 401

---

## Rate Limiting

* Applied to sensitive endpoints:

  * Auth routes
  * API base routes

Prevents:

* Brute force attacks
* Abuse

---

## Logging

* Request logging middleware logs all incoming requests
* Useful for debugging and monitoring

---
