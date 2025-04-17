# 🏠 Hostel Issues Management System

## 📁 Project Structure

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js + MySQL
- **Authentication**: Google Sign-In (for students) & JWT (for caretakers)

---

## 🔧 Backend Setup

### ✅ Requirements
- Node.js
- MySQL
- npm

### ⚙️ Configuration
- Check and update:
  - `db.js`: for DB connection
  - `.env`: for environment variables
  - `index.js`: main server file

### 🗃️ Database Setup
1. Create a MySQL database (name should match `db.js`).
2. Run the provided `.sql` file to create tables and insert initial data.

### 👥 Users Setup
- Insert users manually into the `users` table.
- **Students**:
  - Use a Google email.
  - Set `role` as `'user'`.
- **Caretakers**:
  - Set `role` as `'admin'`.
  - Password must be **hashed** using bcrypt with salt rounds = 10:
    ```js
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('your_password', 10);
    ```

### 🛡️ Authentication
- JWT tokens are used.
- Tokens are issued on login and required for protected routes.

### ▶️ Run Backend

```bash
npm install
node index.js
