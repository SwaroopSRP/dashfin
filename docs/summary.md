# Summary Module

## Overview

The Summary module provides **aggregated insights and analytics** based on records data.

It transforms raw records into meaningful information such as:

* Total income, expenses, and balance
* Category-wise breakdown
* Recent activity
* Time-based trends

This module is **read-only** and optimized for dashboards or reporting systems.

---

## Base Route

```id="sumbase"
/api/v1/summary
```

Mounted via router: 

---

## Access Control (RBAC)

| Endpoint           | ADMIN | ANALYST | VIEWER |
| ------------------ | ----- | ------- | ------ |
| Overview           | ✅     | ✅       | ✅      |
| Category Breakdown | ✅     | ✅       | ✅      |
| Recent Activity    | ✅     | ✅       | ❌      |
| Trends             | ✅     | ✅       | ✅      |

Enforced via:

* `authenticate`
* `authorize` 

---

## Endpoints

---

### 1. Overview Summary

**GET** `/summary/overview`

---

#### Description

Returns high-level financial summary:

* Total income
* Total expense
* Net balance

---

#### Response

```json id="ov1"
{
  "success": true,
  "data": {
    "totalIncome": 50000,
    "totalExpense": 30000,
    "netBalance": 20000
  }
}
```

---

#### Implementation Details

* Uses aggregation queries
* Filters only non-deleted records 

---

---

### 2. Category Breakdown

**GET** `/summary/category`

---

#### Description

Returns total amount grouped by category.

---

#### Response

```json id="cb1"
{
  "success": true,
  "data": [
    { "category": "Food", "total": 10000 },
    { "category": "Salary", "total": 50000 }
  ]
}
```

---

#### Behavior

* Groups records by `category`
* Orders by highest total
* Excludes deleted records 

---

---

### 3. Recent Activity

**GET** `/summary/recent`

---

#### Description

Fetches most recent records.

---

#### Query Parameters

| Param | Type   | Description         |
| ----- | ------ | ------------------- |
| limit | number | Max 50 (default: 5) |



---

#### Response

```json id="ra1"
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "amount": 500,
      "type": "EXPENSE",
      "category": "Food",
      "date": "timestamp",
      "notes": "Lunch"
    }
  ]
}
```

---

#### Access Restriction

* VIEWER role cannot access this endpoint

---

---

### 4. Trends (Time-based Analytics)

**GET** `/summary/trends`

---

#### Description

Returns **weekly trends** of income and expenses over a given time range.

---

#### Query Parameters

| Param | Type   | Description           |
| ----- | ------ | --------------------- |
| days  | number | Max 365 (default: 30) |



---

#### Response

```json id="tr1"
{
  "success": true,
  "data": [
    {
      "week": "2026-W14",
      "income": 10000,
      "expense": 5000
    }
  ]
}
```

---

#### Behavior

* Groups data by ISO week
* Separates income vs expense
* Sorts chronologically 

---

## Key Features

* Aggregation using Prisma
* Efficient grouping & filtering
* Dashboard-ready endpoints
* Time-series analysis
* Role-based data visibility

---

## Notes

* All endpoints require authentication
* No data mutation (read-only module)
* Trends are computed dynamically (not pre-stored)
* Suitable for dashboards, charts, analytics UI

---
