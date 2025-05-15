# 🏠 Rental Services API

> Live API: [ https://rentalservice-55v9.onrender.com ]

A RESTful backend service for managing a rental business — including customers, movies, genres, and rental transactions. Built with **Node.js**, **Express**, and **MongoDB**, hosted on **Render** with MongoDB hosted on **MongoDB Atlas**.

---

## 🚀 Features

- User authentication and authorization with JWT
- Role-based access (e.g., admin vs. regular user)
- CRUD operations for:
  - Customers
  - Movies
  - Genres
  - Rentals
- Input validation with Joi
- Environment-based configuration
- Production-ready deployment

---

## 📦 Tech Stack

- **Node.js** / **Express** – Backend framework
- **MongoDB Atlas** – Cloud-hosted NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – Secure authentication
- **Zod** – Data validation
- **Render** – Deployment platform

---

## 📁 Project Structure
/rental-service-api
├── index.js # Entry point
├── startup/ # Config and startup logic
│ ├── db.js # MongoDB connection
│ ├── routes.js # Route registration
│ └── config.js # App configuration
├── routes/ # Express routes
├── models/ # Mongoose schemas
├── middleware/ # Custom middleware
├── utils/ # Helper functions
└── .env # Environment variables


---

## ⚙️ Setup Instructions

### 1. Clone the repo


git clone https://github.com/your-username/rental-service-api.git
cd rental-service-api

**2. Install dependencies**
npm install

**3. Configure Environment Variables**
db=<your-mongodb-atlas-uri>
jwtPrivateKey=<your-secret-jwt-key>

**4. Run the app locally**
node index.js


## 🌐 API Endpoints
Here are some example endpoints:
| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/customers` | List all customers  |
| POST   | `/api/customers` | Add a new customer  |
| GET    | `/api/movies`    | List all movies     |
| POST   | `/api/rentals`   | Rent a movie        |
| POST   | `/api/auth`      | Login a user        |
| POST   | `/api/users`     | Register a new user |


## 🧪 Testing
Use Postman or Insomnia to test the routes. Authentication is required for protected routes (pass the JWT token in the x-auth-token header).


## 🚀 Deployment
This app is hosted on: https://rentalservice-55v9.onrender.com

Backend: Render

Database: MongoDB Atlas

Ensure you’ve set db and jwtPrivateKey in your Render environment variables.

## 🛡️ Security
Passwords are hashed using bcrypt

JWT tokens for authentication

Input validation to prevent malformed data

### 🙏 Acknowledgements
Inspired by the Mosh Hamedami

📜 License
This project is open source and available under the MIT License.

👤 Author
Jeffrey Irukeh @Jeffreyai7
