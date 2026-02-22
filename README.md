# 📚 BookStore Management System (BookBliss)

A full-stack **MERN** (MongoDB, Express.js, React, Node.js) application designed for a seamless book browsing and shopping experience. Users can explore books by categories, manage their cart, and place orders with Cash on Delivery.



## 🚀 Live Demo
* **Frontend:** [https://book-store-management-system-mu.vercel.app/](https://book-store-management-system-mu.vercel.app/)
* **Backend API:** [https://bookstore-backend-5pnb.onrender.com](https://bookstore-backend-5pnb.onrender.com)

---

## ✨ Features
* **User Authentication:** Secure Login and Signup using JWT (JSON Web Tokens).
* **Book Inventory:** Browse books with details like Title, Author, Price, and Genre.
* **Category Filtering:** Dynamic filtering based on genres like Fiction, Psychology, Self-Development, etc.
* **Shopping Cart:** Real-time Add/Remove items and total price calculation.
* **Order Management:** Easy checkout process with shipping details for Cash on Delivery.
* **Admin Dashboard:** Exclusive rights for Admins to **Add**, **Update**, or **Delete** books directly from the UI.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Axios, React Router, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Deployment** | Vercel (Frontend), Render (Backend) |



---

## 📁 Project Structure
```plaintext
BookStore-Management-System/
├── Backend/           # Node.js & Express server
│   ├── models/        # Mongoose Schemas (User, Book, Order)
│   ├── routes/        # API Endpoints
│   └── server.js      # Main entry point
├── Frontend/          # React.js application
│   ├── src/
│   │   ├── components/# Reusable UI components (Home, Login, Checkout)
│   │   └── App.jsx    # Main routing and global state logic
│   └── public/        # Static assets
