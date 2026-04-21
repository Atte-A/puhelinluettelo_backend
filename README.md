# ☎️ PhoneBook App

A full-stack phonebook application built as part of backend and full-stack learning.
The app provides a simple interface for managing contacts with a REST API and MongoDB persistence.

## 🚀 Overview

This project demonstrates a complete CRUD workflow using a React frontend and a Node.js/Express backend. It focuses on core backend concepts such as API design, validation, and database integration rather than complex architecture.

## 🛠️ Tech Stack

| Layer      | Technology         |
| ---------- | ------------------ |
| Frontend   | React (Vite)       |
| Backend    | Node.js, Express   |
| Database   | MongoDB (Mongoose) |
| Deployment | Render             |

## ✨ Features
- Full CRUD operations for contacts
- RESTful API
- MongoDB via Mongoose
- Schema-level validation
- Manual duplicate prevention
- Request logging with Morgan
- Centralized error handling middleware
- Real-time search/filter

## 📡 API

### Base URL
```
/api/persons
```

### Endpoints

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| GET    | `/`      | Get all contacts  |
| GET    | `/:id`   | Get contact by ID |
| POST   | `/`      | Create contact    |
| PUT    | `/:id`   | Update contact    |
| DELETE | `/:id`   | Delete contact    |

### Additional
```
/info
```
Returns total number of contacts and current server time.

## 🧾 Data Model
```
{
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    match: /^\d{2,3}-\d{5,}$/
  }
}
```
### Notes
- Name uniqueness is enforced at application level
- Custom toJSON transform removes `_id` and `__v`

## 🏗️ Architecture Notes
This project uses a single-file Express backend with:
- Inline route definitions
- Mongoose model abstraction
- Middleware for logging, error handling, and unknown endpoints

This keeps the structure simple and focused on learning core concepts rather than abstraction layers.

## 🪛 CLI Utility
Includes a small Node.js script for direct database interaction:
- Add a contact via CLI argumenets
- List all contacts from the database🪛

## 🌍 Deployment
- Backend deployed on Render
- Frontend built with Vite and served as static assests via Express

## What I learned
- Designing and implementing a RESTful API with Express
- Structuring backend logic to handle CRUD operations and asynchronous database interactions
- Using Mongoose for schema design, validation, and data modeling
- Applying input validation (length constraints, regex) and handling validation errors
- Implementint custom data transformations for API responses (removing `_id` and `__v`)
- Managing error handling in Express using middleware
- Connecting a React frontend to a backend API and handling data flow between them
- Working with environment variables for configuration
- Deploying a backend service and serving a frontend build from Express

## Author
Atte Ampuja
[GitHub](https://github.com/Atte-A)

## License
This project is for educational purposes only.





