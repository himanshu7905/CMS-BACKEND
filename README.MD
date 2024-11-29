# Contact Management System - Backend

## 1. Overview

This is the backend for the Contact Management System, built using **Node.js** and **Express.js**. It provides RESTful APIs for authentication and contact management with role-based access control. The system includes hardcoded credentials and in-memory storage for simplicity.

---

## 2. Features

- **Authentication:**
  - Role-based login for Admin and User.
  - Hardcoded credentials.
- **Contact Management:**
  - Admin: Manage all user contacts.
  - User: Manage only their own contacts.
- **Role-based Access Control:**
  - API endpoints secured based on roles.
- **In-Memory Data Storage:**
  - Contacts are stored in an array (can be extended to databases).

---

## 3. Technologies Used

- **Backend Framework:** Node.js with Express.js
- **Middleware:** `body-parser` for JSON data handling
- **Storage:** In-memory storage (e.g., JavaScript array)

---

## 4. Installation and Setup

### Prerequisites

- **Node.js** and **npm** should be installed. Download them from [Node.js official website](https://nodejs.org/).

### Steps to Set Up

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ``
Install dependencies:

bash
npm install
Start the backend server:

bash
node server.js
The backend server will run at:

arduino
http://localhost:5000
5. API Endpoints
Authentication
POST /api/auth/login
Description: Authenticates users and returns their role and email.
Request Body Example:
json
{
  "email": "user@example.com",
  "password": "user123"
}
Response Example:
json
Copy code
{
  "role": "user",
  "email": "user@example.com"
}
Contacts
GET /api/contacts

Role: Admin
Description: Fetches all contacts.
GET /api/contacts/:userEmail

Role: Admin/User
Description: Fetches contacts for a specific user.
POST /api/contacts/:userEmail

Role: Admin/User
Description: Adds a new contact.
Request Body Example:
json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
PUT /api/contacts/:userEmail/:contactId

Role: Admin/User
Description: Updates an existing contact.
DELETE /api/contacts/:userEmail/:contactId

Role: Admin/User
Description: Deletes a contact.
6. Hardcoded Credentials
Admin:
Email: admin@example.com
Password: admin123
User:
Email: user@example.com
Password: user123
7. Folder Structure
lua
/backend
  |-- server.js            # Main server file
  |-- routes
      |-- authRoutes.js    # Authentication routes
      |-- contactRoutes.js # Contact management routes
  |-- middleware
      |-- authMiddleware.js # Role-based access control middleware
  |-- data
      |-- contacts.js      # In-memory contact data
8. Future Improvements
Integrate database (e.g., MongoDB, MySQL).
Use JWT-based authentication for enhanced security.
Add logging for changes made by Admin.
9. License
This project is open-source and available under the MIT License.

yaml

---

### Frontend `README.md` (Step-by-Step with Structure)

```markdown
# Contact Management System - Frontend

## 1. Overview

This is the frontend for the Contact Management System, built using **React.js**. It provides a user interface for authentication, contact management, and role-based access control. The frontend communicates with the backend through RESTful APIs.

---

## 2. Features

- **Authentication:**
  - Role-based login for Admin and User.
- **Contact Management:**
  - Admin: View, add, edit, and delete any contact.
  - User: View, add, edit, and delete their own contacts.
- **Responsive UI:**
  - Styled using **Bootstrap** for responsiveness.
- **Role-based Views:**
  - Admins and Users have different interfaces.

---

## 3. Technologies Used

- **Frontend Framework:** React.js
- **Routing:** React Router
- **HTTP Requests:** Axios
- **Styling:** Bootstrap

---

## 4. Installation and Setup

### Prerequisites

- **Node.js** and **npm** should be installed. Download them from [Node.js official website](https://nodejs.org/).

### Steps to Set Up

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
Install dependencies:

bash
npm install
Start the frontend development server:

bash
npm start
The frontend will run at:

arduino
http://localhost:3000
5. Folder Structure
lua
/frontend
  |-- src
      |-- components
          |-- Login.js          # Handles user authentication
          |-- ContactList.js    # Displays list of contacts
          |-- ContactForm.js    # Add/Edit contact form
      |-- App.js               # Main application file
      |-- api.js               # API requests to the backend
      |-- index.js             # React entry point
6. Usage
Login
Open the application in your browser at http://localhost:3000.
Log in using the following credentials:
Admin:
Email: admin@example.com
Password: admin123
User:
Email: user@example.com
Password: user123
Contact Management
Admins:
View all contacts.
Add, edit, and delete any contact.
Users:
View, add, edit, and delete their own contacts.
7. Future Improvements
Add search functionality for filtering contacts by name or email.
Improve UI/UX with advanced styling.
Implement pagination for large contact lists.
8. License
This project is open-source and available under the MIT License.






