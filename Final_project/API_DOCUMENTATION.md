# FOP Helper API Documentation

## Overview

The FOP Helper API is a RESTful API for managing freelance/self-employed (FOP - Фізична особа-підприємець) financial records, including income, expenses, tax calculations, and reporting for Ukrainian tax system.

**Base URL:** `https://your-domain.com/api`

**API Versions:**
- **v1** - Legacy endpoints at `/api/{controller}`
- **v2** - Current version at `/api/v2/{controller}` (recommended)

**Authentication:** JWT Bearer tokens via HTTP-only cookies

---

## Table of Contents

1. [Authentication](#authentication)
2. [API v2 Endpoints](#api-v2-endpoints)
    - [Expenses](#expenses-v2)
    - [Incomes](#incomes-v2)
    - [Reports](#reports-v2)
    - [Taxes](#taxes-v2)
    - [Government Sums (Admin)](#government-sums-v2)
3. [API v1 Endpoints](#api-v1-endpoints)
4. [Request/Response Models](#requestresponse-models)
5. [Error Handling](#error-handling)

---

## Authentication

### Overview

The API uses JWT (JSON Web Token) authentication with cookies. Tokens are stored in HTTP-only cookies for security.

**Cookie Names:**
- `X-Access-Token` - JWT access token (expires in 3 hours)
- `X-Username` - Username
- `X-Refresh-Token` - Refresh token (expires in 6 hours)
- `Session-User` - Session username

### Endpoints

#### POST `/api/react/authenticate/login`

Login and receive authentication tokens.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiration": "2025-12-16T15:30:00Z",
  "refreshToken": "refresh_token_string"
}
```

**Cookies Set:**
- `X-Access-Token` (HttpOnly, SameSite=Strict)
- `X-Username` (HttpOnly, SameSite=Strict)
- `X-Refresh-Token` (HttpOnly, SameSite=Strict)

---

#### POST `/api/react/authenticate/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fopVat": true,
  "fopGeneral": false,
  "fopGroup": 3
}
```

**Fields:**
- `email` (required) - Valid email address
- `password` (required) - Password
- `fopVat` - Whether user is VAT registered
- `fopGeneral` - Whether user uses general taxation
- `fopGroup` (required) - FOP group number (1-4)

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "User created successfully!",
  "userId": "user-guid-here",
  "hash": "confirmation-hash"
}
```

---

#### GET `/api/react/authenticate/confirm?userId={userId}&code={code}`

Confirm email address after registration.

**Query Parameters:**
- `userId` - User ID from registration response
- `code` - Confirmation code from email

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Email confirmed successfully"
}
```

---

#### GET `/api/react/authenticate/refresh`

Refresh JWT token using refresh token from cookies.

**Authorization:** Requires valid `X-Refresh-Token` cookie

**Response:** Sets new authentication cookies with extended expiration

---

#### GET `/api/react/authenticate/logout`

Logout and clear authentication cookies.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

#### GET `/api/react/authenticate/show`

Get current authenticated user information.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "username": "user@example.com",
  "token": "current_jwt_token"
}
```

---

#### GET `/api/react/authenticate/checkadmin`

Check if current user has admin role.

**Authorization:** Required

**Response (200 OK):**
```json
true
```

---

#### DELETE `/api/react/authenticate/remove`

Delete current user account and all associated data.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "User and all data deleted"
}
```

**Warning:** This action is irreversible and deletes all user data including incomes, expenses, taxes, and reports.

---

## API v2 Endpoints

API version 2 provides improved validation, service-based architecture, and better error handling compared to v1.

### Expenses (v2)

Base path: `/api/v2/expenses`

All endpoints require authentication.

---

#### GET `/api/v2/expenses`

Get all expenses for the authenticated user, grouped by year and month.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "2025-12": [
    {
      "id": "expense-guid",
      "dt": "2025-12-15T10:30:00",
      "expense": 1500.00,
      "currency": "UAH",
      "comment": "Office supplies",
      "cash": false,
      "userID": "user-guid"
    }
  ],
  "2025-11": [...]
}
```

---

#### POST `/api/v2/expenses/add`

Create a new expense record.

**Authorization:** Required

**Request Body:**
```json
{
  "date": "2025-12-15",
  "expense": "1500.00",
  "currency": "UAH",
  "comment": "Office supplies",
  "cash": false
}
```

**Validation:**
- Date cannot be in a period where taxes are already paid
- User can only add expenses to their own account

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Expense added with ID: expense-guid"
}
```

---

#### POST `/api/v2/expenses/update`

Update an existing expense record.

**Authorization:** Required

**Request Body:**
```json
{
  "id": "expense-guid",
  "date": "2025-12-15",
  "expense": "1600.00",
  "currency": "UAH",
  "comment": "Updated office supplies",
  "cash": false
}
```

**Validation:**
- User must own the expense
- Cannot edit expenses in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Expense updated"
}
```

---

#### POST `/api/v2/expenses/delete`

Delete an expense record.

**Authorization:** Required

**Request Body:**
```json
{
  "id": "expense-guid"
}
```

**Validation:**
- User must own the expense
- Cannot delete expenses in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Expense deleted"
}
```

---

### Incomes (v2)

Base path: `/api/v2/incomes`

All endpoints require authentication.

---

#### GET `/api/v2/incomes`

Get all incomes for the authenticated user, grouped by year and month.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "2025-12": [
    {
      "id": "income-guid",
      "dt": "2025-12-15T10:30:00",
      "income": 15000.00,
      "currency": "UAH",
      "comment": "Consulting services",
      "cash": false,
      "userID": "user-guid"
    }
  ],
  "2025-11": [...]
}
```

---

#### POST `/api/v2/incomes/add`

Create a new income record.

**Authorization:** Required

**Request Body:**
```json
{
  "date": "2025-12-15",
  "income": "15000.00",
  "currency": "USD",
  "comment": "Consulting services",
  "cash": false
}
```

**Features:**
- Automatically converts foreign currency to UAH using NBU exchange rates
- Validates edit eligibility based on tax payment status
- Triggers tax calculation

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Income added with ID: income-guid"
}
```

---

#### POST `/api/v2/incomes/update`

Update an existing income record.

**Authorization:** Required

**Request Body:**
```json
{
  "id": "income-guid",
  "date": "2025-12-15",
  "income": "16000.00",
  "currency": "USD",
  "comment": "Updated consulting services",
  "cash": false
}
```

**Validation:**
- User must own the income
- Cannot edit incomes in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Income updated"
}
```

---

#### POST `/api/v2/incomes/delete`

Delete an income record.

**Authorization:** Required

**Request Body:**
```json
{
  "id": "income-guid"
}
```

**Validation:**
- User must own the income
- Cannot delete incomes in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**
```json
{
  "status": "Success",
  "message": "Income deleted"
}
```

---

### Reports (v2)

Base path: `/api/v2/reports`

All endpoints require authentication.

---

#### GET `/api/v2/reports?pending={true|false}`

Generate reports for current period(s).

**Authorization:** Required

**Query Parameters:**
- `pending` (optional, boolean) - Filter by pending status
    - `true` - Only unsent/pending reports
    - `false` - All reports

**Response (200 OK):**
```json
{
  "2025-Q4": {
    "id": "report-guid",
    "date": "2025-12-31T00:00:00",
    "quarter": 4,
    "incomes": 45000.00,
    "expenses": 12000.00,
    "flatTax": 2970.00,
    "flatTaxQ": 742.50,
    "ssp": 1760.00,
    "vat": 6750.00
  }
}
```

---

#### POST `/api/v2/reports/details`

Generate detailed report calculations.

**Authorization:** Required

**Request Body:**
```json
{
  "id": "report-guid",
  "date": "2025-12-31",
  "incomes": 45000.00,
  "expenses": 12000.00,
  "ssp": 1760.00,
  "flatTax": 2970.00,
  "flatTaxQ": 742.50,
  "vat": 6750.00,
  "militaryTax": 135.00
}
```

**Response (200 OK):**
```json
{
  "date": "2025-12-31",
  "quarter": 4,
  "data": [
    45000.00,   // Index 0: Total incomes
    12000.00,   // Index 1: Total expenses
    2970.00,    // Index 2: Flat tax
    742.50,     // Index 3: Quarterly flat tax
    1760.00,    // Index 4: Social security (SSP/ESV)
    6750.00,    // Index 5: VAT (PDV)
    135.00,     // Index 6: Military tax
    // ... additional calculated fields
  ]
}
```

---

#### GET `/api/v2/reports/saved`

Get all saved/submitted reports.

**Authorization:** Required

**Response (200 OK):**
```json
{
  "2025-Q4": {
    "id": "report-guid",
    "date": "2025-12-31T00:00:00",
    "incomes": 45000.00,
    "expenses": 12000.00,
    "flatTax": 2970.00,
    "ssp": 1760.00,
    "vat": 6750.00,
    "submitted": true
  }
}
```

---

#### POST `/api/v2/reports/save`

Save/submit a report to database.

**Authorization:** Required

**Request Body:**
```json
{
  "id": "report-guid",
  "date": "2025-12-31T00:00:00",
  "incomes": 45000.00,
  "expenses": 12000.00,
  "flatTax": 2970.00,
  "flatTaxQ": 742.50,
  "ssp": 1760.00,
...