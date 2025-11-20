# SmartWaste — Final Project

A full-stack waste management application: React (Vite) frontend and Node/Express + MongoDB backend. This README describes the code in this workspace, how to run it, environment variables, API endpoints, and the project structure.

## Quick summary
- Backend: Express + Mongoose — auth (JWT), waste requests, payments (mock M-Pesa), reports, dashboard.
- Frontend: React + Vite + Tailwind — user and admin UI, protected routes.
- DB: MongoDB (Mongoose models).

## Key features
- User registration, login, profile
- Create/view/delete waste collection requests
- Mock M-Pesa payment flow and webhook handling
- Admin reports and dashboards
- Rewards system and bin management

## Project structure
- backend/
  - server.js
  - package.json
  - .env (local, not committed)
  - config/
    - db.js
  - controllers/
    - authController.js
    - wasteController.js
    - paymentsController.js
    - reportsController.js
  - routes/
    - auth.js
    - waste.js
    - payments.js
    - reports.js
    - dashboard.js
  - middleware/
    - auth.js
    - authMiddleware.js
  - models/
    - User.js
    - WasteRequest.js
    - Payment.js
    - Report.js
    - Reward.js
    - Bin.js

- frontend/
  - package.json
  - vite.config.js
  - .env (VITE_API_URL)
  - src/
    - main.jsx
    - App.jsx
    - services/
      - api.js
    - pages/
      - Login.jsx
      - register.jsx
      - Dashboard.jsx
      - WasteRequests.jsx
      - Payments.jsx
      - Rewards.jsx
      - Reports.jsx
    - components/
      - ProtectedRoute.jsx
      - AdminRoute.jsx
      - Navbar.jsx
      - Footer.jsx
    - admin/
      - AdminLayout.jsx
      - pages/
        - ManageRequests.jsx
        - ManageUsers.jsx

- README.md (this file)
- .gitignore

## Install & run (Windows / PowerShell)
1. Open PowerShell in the workspace:
   Set-Location "Final-project"

2. Backend
   cd backend
   npm install
   # create backend/.env 
   npm run dev

3. Frontend 
   cd .\frontend
   npm install
   npm run dev

Default dev servers:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Example .env
- backend/.env
  - MONGO_URI=mongodb://127.0.0.1:27017/smartwaste
  - JWT_SECRET=change_this_secret
  - PORT=5000
- frontend/.env
  - VITE_API_URL=http://localhost:5000/api

## Important API endpoints (prefix: /api)
- Auth
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me
- Waste
  - POST /api/waste/request
  - GET /api/waste/my-requests
  - DELETE /api/waste/:id
- Payments
  - POST /api/payments/mpesa/initiate
  - POST /api/payments/mpesa/callback
  - GET /api/payments/user/:id
- Reports
  - POST /api/reports/generate
  - GET /api/reports
- Dashboard
  - GET /api/dashboard

Refer to backend/routes/*.js and controllers/* for request/response shapes.

## Notes & troubleshooting
- 401/403: ensure frontend stores token in localStorage and backend JWT_SECRET matches.
- DB errors: verify MONGO_URI and MongoDB service.
- Ports: change VITE_API_URL if backend runs on a different port.

## Scripts
- Backend: npm run dev (nodemon), npm start
- Frontend: npm run dev, npm run build, npm run preview

