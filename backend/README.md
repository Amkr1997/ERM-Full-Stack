# ERM Backend

This is the backend API for the ERM (Employee Role Management) system. It provides secure user authentication and basic role-based access management for two types of users: **engineer** and **manager**.

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **bcryptjs** for password hashing
- **jsonwebtoken** (JWT) for authentication
- **dotenv** for environment configuration
- **CORS** and **helmet** for security

---

## 📁 Project Structure

backend/
├── controllers/
│ └── assignment.controller.js
│ └── project.controller.js
│ └── user.controller.js
├── middleware/
│ └── verfiyAuth.js
├── models/
│ └── assignment.js
│ └── project.js
│ └── user.js
├── routes/
│ └── assignment.routes.js
│ └── project.routes.js
│ └── user.routes.js
├── .env
├── server.js

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

🚀 Getting Started

1. Install dependencies
   cd backend
   npm install

2. Run the server
   npm run dev

📮 API Endpoints
POST /api/auth/signup
Registers a new user.

Body:
{
"name": "John Doe",
"email": "john@example.com",
"password": "123456",
"role": "engineer"
}

Response:
{
"success": true,
"message": "User registered successfully",
"token": "JWT_TOKEN_HERE",
"user": {
"name": "John Doe",
"email": "john@example.com",
"role": "engineer"
}
}

POST /api/auth/login
Authenticates an existing user.

Body:
{
"email": "john@example.com",
"password": "123456"
}
Response:
{
"success": true,
"message": "Login successful",
"token": "JWT_TOKEN_HERE",
"user": {
"name": "John Doe",
"email": "john@example.com",
"role": "engineer"
}
}
Protected Route Example
Include the JWT token in the Authorization header as a Bearer token.

GET /api/protected
Authorization: Bearer JWT_TOKEN_HERE
