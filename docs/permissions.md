# Permission Matrix

## Roles

* **ADMIN** → Full access
* **ANALYST** → Read + limited write (records)
* **VIEWER** → Minimal / no access

---

## Endpoint Access Matrix

| Module  | Endpoint                | ADMIN | ANALYST | VIEWER |
| ------- | ----------------------- | ----- | ------- | ------ |
| Auth    | POST /auth/register     | ✅     | ✅       | ✅      |
| Auth    | POST /auth/login        | ✅     | ✅       | ✅      |
| Users   | POST /users             | ✅     | ❌       | ❌      |
| Users   | GET /users              | ✅     | ✅       | ❌      |
| Users   | GET /users/:id          | ✅     | ✅       | ❌      |
| Users   | PATCH /users/:id        | ✅     | ❌       | ❌      |
| Users   | DELETE /users/:id       | ✅     | ❌       | ❌      |
| Users   | DELETE /users/cleanup   | ✅     | ❌       | ❌      |
| Records | POST /records           | ✅     | ✅       | ❌      |
| Records | GET /records            | ✅     | ✅       | ❌      |
| Records | GET /records/:id        | ✅     | ✅       | ❌      |
| Records | PATCH /records/:id      | ✅     | ✅       | ❌      |
| Records | DELETE /records/:id     | ✅     | ✅       | ❌      |
| Records | DELETE /records/cleanup | ✅     | ❌       | ❌      |
| Summary | GET /summary/overview   | ✅     | ✅       | ✅      |
| Summary | GET /summary/category   | ✅     | ✅       | ✅      |
| Summary | GET /summary/recent     | ✅     | ✅       | ❌      |
| Summary | GET /summary/trends     | ✅     | ✅       | ✅      |
| Health  | GET /health             | ✅     | ✅       | ✅      |

---

## Enforcement

Access control is implemented using:

* `authenticate` → verifies JWT
* `authorize(...)` → checks role permissions

Example:

```ts
authorize(Role.ADMIN, Role.ANALYST)
```

---

## Special Constraints

* Last ADMIN cannot be:

  * Deleted
  * Demoted
* VIEWER cannot access protected resources
* ANALYST cannot manage users

---

## Summary

* ADMIN → Full system control
* ANALYST → Data-level access
* VIEWER → Restricted access

---
