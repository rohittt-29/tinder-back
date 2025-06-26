# 🛠 Togetha Backend

This is the **backend server** for the Togetha app — a real-time, swipe-based connection and chat platform.

> 🔗 Frontend Live Link: [https://togetha-web.vercel.app](https://togetha-web.vercel.app)

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Socket.io** (Real-time chat)
- **JWT** (Authentication)

---

git clone https://github.com/rohittt-29/togetha-backend.git
cd togetha-backend

npm install

 ---
 
Create a `.env` file in the root directory with the following:

DB_CONNECTION_SECRET=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000


npm start
---

| Method | Endpoint                 | Description                      |
| ------ | ------------------------ | -------------------------------- |
| POST   | `/signup`                | Register new user                |
| POST   | `/login`                 | User login                       |
| GET    | `/profile/view`          | Get current logged-in user       |
| GET    | `/profile/view/:id`      | Get another user's profile       |
| PUT    | `/profile/edit`          | Edit user profile                |
| GET    | `/connections`           | List user's connections          |
| GET    | `/requests`              | Get received connection requests |
| POST   | `/connect/:targetUserId` | Send connection request          |
| POST   | `/accept/:targetUserId`  | Accept connection request        |
| GET    | `/chat/:targetUserId`    | Get messages with a user         |

---

This project is licensed under the MIT License — feel free to use and remix it.
--

Made with ❤️ in Mumbai by Rohit Mali
