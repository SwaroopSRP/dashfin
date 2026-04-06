# User Module

## Overview

The User module manages **user lifecycle operations**, including:

* User creation
* Fetching users (with pagination & filters)
* Updating user details
* Soft deletion of users
* Permanent cleanup of deleted users

This module enforces **strict role-based access control (RBAC)** and includes safeguards such as:

* Preventing deletion of the last admin
* Preventing demotion of the last admin
* Soft delete instead of hard delete

---

## Base Route

```id="userbase"
/api/v1/users
```

Mounted via router: 

---

## Access Control (RBAC)

| Endpoint         | ADMIN | ANALYST | VIEWER |
| ---------------- | ----- | ------- | ------ |
| Create User      | ✅     | ❌       | ❌      |
| Get Users (list) | ✅     | ✅       | ❌      |
| Get User by ID   | ✅     | ✅       | ❌      |
| Update User      | ✅     | ❌       | ❌      |
| Delete User      | ✅     | ❌       | ❌      |
| Cleanup Users    | ✅     | ❌       | ❌      |

Enforced using:

* `authenticate` (JWT validation)
* `authorize` (role-based access) 

---

## Endpoints

---

### 1. Create User

**POST** `/users/`

---

#### Description

Creates a new user.

* Password is hashed using bcrypt
* Default role: `VIEWER` (if not provided) 

---

#### Request Body

```json id="cu1"
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "ADMIN | ANALYST | VIEWER" // optional
}
```

---

#### Response

```json id="cu2"
{
  "success": true,
  "message": "User created",
  "data": {
    "id": "user_id",
    "email": "john@example.com",
    "role": "VIEWER"
  }
}
```

---

#### Status Codes

| Code | Description          |
| ---- | -------------------- |
| 201  | User created         |
| 409  | Email already exists |

---

---

### 2. Get Users (Paginated + Filtered)

**GET** `/users`

---

#### Query Parameters

| Param          | Type    | Description                |
| -------------- | ------- | -------------------------- |
| page           | number  | Page number (default: 1)   |
| limit          | number  | Items per page (1–50)      |
| includeDeleted | boolean | Include soft-deleted users |
| search         | string  | Search by name/email       |
| role           | enum    | Filter by role             |
| status         | enum    | Filter by status           |



---

#### Response

```json id="gu1"
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "name": "John",
        "email": "john@example.com",
        "role": "ADMIN",
        "status": "ACTIVE",
        "createdAt": "timestamp",
        "deleted": false
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

---

---

### 3. Get User by ID

**GET** `/users/:id`

---

#### Description

Fetch a single user by ID.

---

#### Validation

* `id` must be a valid UUID 

---

#### Errors

| Code | Description    |
| ---- | -------------- |
| 404  | User not found |

---

---

### 4. Update User

**PATCH** `/users/:id`

---

#### Description

Updates user details.

---

#### Request Body (Partial)

```json id="uu1"
{
  "name": "Updated Name",
  "email": "new@example.com",
  "role": "ADMIN | ANALYST | VIEWER",
  "status": "ACTIVE | INACTIVE"
}
```

---

#### Constraints

* At least one field must be provided
* Cannot demote the **last ADMIN** 
* Email must be unique

---

#### Errors

| Code | Description                             |
| ---- | --------------------------------------- |
| 400  | Invalid update / last admin restriction |
| 404  | User not found                          |
| 409  | Email already exists                    |

---

---

### 5. Delete User (Soft Delete)

**DELETE** `/users/:id`

---

#### Description

Soft deletes a user:

* Sets `deleted = true`
* Sets `deletedAt`
* Sets `status = INACTIVE`

---

#### Constraints

* Cannot delete last ADMIN 
* Cannot delete already deleted user

---

---

### 6. Cleanup Deleted Users

**DELETE** `/users/cleanup`

---

#### Description

Permanently deletes all soft-deleted users.

---

#### Response

```json id="cl1"
{
  "success": true,
  "message": "Cleanup completed. X users permanently deleted",
  "data": {
    "count": X
  }
}
```

---

## Key Features

* Pagination & filtering support
* Soft delete mechanism
* Role-based access control
* Input validation via Zod
* Protection against critical admin operations

---

## Notes

* All endpoints require authentication
* Only ADMIN can modify user data
* ANALYST can only read user data
* VIEWER has no access to user endpoints

---
