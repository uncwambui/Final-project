# Final Project -- Smart Waste Management System

## Overview

This project is a **MERN (MongoDB, Express, React, Node.js) Smart Waste
Management System** designed to allow users to: - Register & log in\
- Create waste collection requests\
- Track request status\
- View assigned waste collectors\
- Manage roles (Admin & User)

Both the **frontend** and **backend** are deployed: - Backend (Render):\
- Frontend (Vercel):

------------------------------------------------------------------------

## Project Structure

    Final-project/
    │
    ├── backend/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── server.js
    │   ├── package.json
    │   └── .env
    │
    └── frontend/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── context/
        │   ├── App.jsx
        │   └── main.jsx
        ├── vite.config.js
        ├── package.json
        └── .env

------------------------------------------------------------------------

## Backend (Node.js + Express)

### Features

-   User authentication (JWT)
-   Admin & User authorization middleware
-   Waste request CRUD operations
-   MongoDB database integration
-   Environment variables via dotenv

### Backend .env structure

    PORT=5000
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_secret

### Install Dependencies

    cd backend
    npm install

### Run Development Server

    npm run dev

------------------------------------------------------------------------

## Frontend (React + Vite)

### Features

-   Login & Register UI
-   Dashboard for waste requests
-   Forms for submitting new requests
-   API context management
-   Protected routes
-   Beautiful UI with CSS

### Frontend .env file

    VITE_API_URL=http://localhost:5000/api

### Install Dependencies

    cd frontend
    npm install

### Run Frontend

    npm run dev

------------------------------------------------------------------------

## API Endpoints Summary

### Auth Routes

  Method   Endpoint               Description
  -------- ---------------------- ---------------------
  POST     `/api/auth/register`   Register a new user
  POST     `/api/auth/login`      Login and get JWT

### Waste Request Routes

  Method   Endpoint                  Description
  -------- ------------------------- -------------------------------
  POST     `/api/waste`              Create request
  GET      `/api/waste`              Get all requests (Admin Only)
  GET      `/api/waste/user`         Get user's requests
  PUT      `/api/waste/:id/status`   Update request status
  GET      `/api/waste/:id`          Get request details

------------------------------------------------------------------------

## Role-Based Access

### User

-   Can create requests\
-   View their own requests

### Admin

-   View all requests\
-   Update request statuses

------------------------------------------------------------------------

## Deployment Setup

### Render (Backend)

-   Add Environment Variables\
-   Use `npm start` in start command\
-   Add build command (none required)

### Vercel (Frontend)

-   Add `VITE_API_URL="https://yourbackend.onrender.com/api"`\
-   Deploy automatically from GitHub

------------------------------------------------------------------------

## Common Errors & Fixes

### **Error:** 500 -- Secret key missing

Fix: Add this to backend `.env`:

    JWT_SECRET=yourstrongsecretkey123

### **Error:** CORS blocking requests

Fix already implemented in backend using:

    app.use(cors());

### **Error:** 400 Bad Request

Usually caused by missing request body fields. Ensure the frontend
sends:

    { email, password }

------------------------------------------------------------------------

## Running Full Project Locally

1.  Start backend

        cd backend
        npm run dev

2.  Start frontend

        cd frontend
        npm run dev

3.  Ensure `VITE_API_URL=http://localhost:5000/api`

------------------------------------------------------------------------

## Final Notes

-   Keep `.env` files out of GitHub\
-   Always update API URLs correctly when switching between localhost
    and production\
-   Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

------------------------------------------------------------------------

## Author

**Eunice Wambui**\
Smart Waste MERN Project


https://final-project-8.vercel.app/dashboard