# FinanceFlow

FinanceFlow is a frontend-based finance and admin dashboard application built using React, TypeScript, Vite, Tailwind CSS, and React Query.

The project is designed as a mini enterprise finance management system with backend integration using JSON Server.

## Features

- Dashboard analytics
- Expense management
- Employee management
- Invoice management
- Add and delete operations
- Real-time dashboard updates
- Search and filter functionality
- Responsive admin dashboard UI

## Technology Stack

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router DOM
- Recharts

Backend:
- JSON Server

## Project Structure

```txt
FinanceFlow
│
├── Frontend
│   ├── src
│   ├── components
│   ├── features
│   ├── services
│   └── routes
│
├── Backend
│   ├── db.json
│   └── server.js
```

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/FinanceFlow.git
```

## Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Backend Setup

Open another terminal:

```bash
cd Backend
npm install
npm start
```

Backend runs on:

```txt
http://localhost:5000
```

## API Endpoints

```txt
GET /expenses
GET /employees
GET /invoices

POST /expenses
POST /employees
POST /invoices

DELETE /expenses/:id
DELETE /employees/:id
DELETE /invoices/:id
```

## Dashboard Functionalities

- Total Revenue Calculation
- Total Expenses Calculation
- Employee Count
- Pending Approvals Count
- Revenue Analytics Chart
- Recent Transactions

## Author

Suman S
