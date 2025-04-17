## 🚀 Backend Setup Instructions

### 1️⃣ Initial Setup

- Make sure you have the following installed:
  - Node.js
  - MySQL
  - npm

- Navigate to the backend folder.

### 2️⃣ Configuration

- Check and update the following files:
  - `db.js` – Contains database connection details.
  - `.env` – Set your environment variables like DB credentials, JWT secret, etc.
  - `index.js` – Main entry point for the server.

### 3️⃣ Database Setup

- Open MySQL and create a database (name should match the one used in `db.js`).
- Run the provided SQL file to:
  - Create tables
  - Add initial data

### 4️⃣ Running the Backend

Install dependencies and start the server:

```bash
npm install
node index.js
