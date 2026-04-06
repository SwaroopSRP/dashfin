# Records Module

## Overview

The Records module manages **financial/data records**, supporting:

* Record creation
* Retrieval with filtering & pagination
* Update operations with audit tracking
* Soft deletion of records
* Permanent cleanup of deleted records

Each record is associated with a user and maintains **audit fields** such as:

* `createdBy`
* `updatedBy`
* timestamps
* soft delete metadata

---

## Base Route

```id="recbase"
/api/v1/records
```

Mounted via router:

---

## Access Control (RBAC)

| Endpoint         | ADMIN | ANALYST | VIEWER |
| ---------------- | ----- | ------- | ------ |
| Create Record    | ✅     | ✅       | ❌      |
| Get Records      | ✅     | ✅       | ❌      |
| Get Record by ID | ✅     | ✅       | ❌      |
| Update Record    | ✅     | ✅       | ❌      |
| Delete Record    | ✅     | ✅       | ❌      |
| Cleanup Records  | ✅     | ❌       | ❌      |

Enforced via:

* `authenticate`
* `authorize`

---

## Endpoints

---

### 1. Create Record

**POST** `/records/`

---

#### Description

Creates a new record associated with the authenticated user.

* Automatically sets:

  * `userId`
  * `createdBy`

---

#### Request Body

```json id="cr1"
{
  "amount": 1000,
  "type": "INCOME | EXPENSE",
  "category": "Salary",
  "date": "2026-04-06T10:00:00Z",
  "notes": "Optional note"
}
```

---

#### Validation Rules

* `amount` → positive number
* `type` → enum (`RecordType`)
* `category` → required
* `date` → valid ISO datetime

---

#### Response

```json id="cr2"
{
  "success": true,
  "message": "Record created",
  "data": {
    "id": "uuid",
    "amount": 1000,
    "type": "INCOME",
    "category": "Salary",
    "date": "timestamp",
    "userId": "uuid"
  }
}
```

---

---

### 2. Get Records (Filtered + Paginated)

**GET** `/records`

---

#### Query Parameters

| Param          | Type    | Description                  |
| -------------- | ------- | ---------------------------- |
| page           | number  | Default: 1                   |
| limit          | number  | Max: 50                      |
| type           | enum    | Filter by type               |
| category       | string  | Case-insensitive match       |
| startDate      | string  | ISO date                     |
| endDate        | string  | ISO date                     |
| includeDeleted | boolean | Include soft-deleted records |

---

#### Response

```json id="gr1"
{
  "success": true,
  "data": {
    "records": [...],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

---

### 3. Get Record by ID

**GET** `/records/:id`

---

#### Description

Fetch a single record by ID.

---

#### Validation

* `id` must be UUID

---

#### Errors

| Code | Description      |
| ---- | ---------------- |
| 404  | Record not found |

---

---

### 4. Update Record

**PATCH** `/records/:id`

---

#### Description

Updates record fields.

---

#### Request Body (Partial)

```json id="ur1"
{
  "amount": 1200,
  "category": "Updated Category",
  "date": "2026-04-07T10:00:00Z"
}
```

---

#### Behavior

* Updates `updatedBy` automatically
* Converts date string to Date object

---

#### Constraints

* Record must exist
* Cannot update deleted record

---

---

### 5. Delete Record (Soft Delete)

**DELETE** `/records/:id`

---

#### Description

Soft deletes a record:

* Sets `deleted = true`
* Adds `deletedAt`
* Tracks `updatedBy`

---

#### Constraints

* Cannot delete already deleted record

---

---

### 6. Cleanup Records

**DELETE** `/records/cleanup`

---

#### Description

Permanently deletes all soft-deleted records.

---

#### Response

```json id="cl2"
{
  "success": true,
  "message": "Cleanup completed. X records permanently deleted",
  "data": {
    "count": X
  }
}
```

---

## Key Features

* Advanced filtering (type, category, date range)
* Pagination support
* Soft delete pattern
* Audit tracking (`createdBy`, `updatedBy`)
* Role-based access control
* Input validation via Zod

---

## Notes

* All endpoints require authentication
* VIEWER role has no access
* Dates are stored and processed as ISO timestamps
* Cleanup is irreversible (hard delete)

---
