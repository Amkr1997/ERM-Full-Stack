This is the backend API for the ERM (Employee Role Management) system. It provides secure user authentication and basic role-based access management for two types of users: **engineer** and **manager**.

---

## 🔧 Tech Stack

### Frontend

- Built with React and Typescript
- Uses Vite as the build tool and development server
- Uses React Router for navigation
- Styled with Tailwind CSS
- Utilizes shadcn/ui for UI components

### Backend

- Built with Express.js for REST APIs
- For Database used MongoDB with Mongoose
- For Authentication and Authorization used JWT based token
- Bcrypt for password hashing

---

## Setup and Running the Project

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- MongoDB (v4.4 or later)

### Database Setup

1. Install MongoDB on your system if not already installed
2. Start the MongoDB service
3. Create a new database for the project (e.g., '')

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/
   ```
4. Add nodemon package beside the index.js file in package.json.

5. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the Vite development server:
   ```
   npm run dev
   ```

The application should now be running on `http://localhost:5173`.

## Tailwind CSS and shadcn/ui Setup

This project uses Tailwind CSS for styling and shadcn/ui for UI components. They are already configured in the project, but if you need to set them up in a new project:

Refer to the shadcn/ui documentation for more details on using and customizing components.

## Assumptions

1. The backend is built with Express.js and uses JWT for authentication.
2. MongoDB is used to store user information and.
3. The login/signup page is located at the root route ('/login') and ('/register) routes.
4. The dashboard is protected and requires authentication to access.
5. The project uses environment variables for sensitive information.
6. The frontend and backend are in separate directories within the same repository.
7. Vite is used as the build tool and development server for the frontend.
8. Tailwind CSS is used for styling, and shadcn/ui is used for UI components.
   <!-- 9. The chart data (sales by time of day) is preprocessed on the backend. -->
   <!-- 10. Error handling includes redirecting to the login page for authentication errors. -->
   <!-- 11. The dashboard auto-refreshes every 5 minutes. -->
9. Mongoose is used as an ODM (Object Document Mapper) for MongoDB interactions.

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

## Database Schema

The MongoDB database includes the following main collections:

<!-- 1. `users`: Stores user authentication information
   - Fields: username, email, password (hashed), createdAt, updatedAt -->

## Additional Notes

- Ensure all required environment variables are set before running the application.
- This README assumes a basic familiarity with React, Typescript, Vite, Node.js, npm, and MongoDB. Additional setup steps may be necessary depending on your development environment.
- Regularly backup your MongoDB database to prevent data loss.
- When adding new shadcn/ui components, make sure to follow their documentation for proper integration with Tailwind CSS.
