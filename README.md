# EtharaAI — Full-Stack Team Task Manager

EtharaAI is a modern, high-performance SaaS platform built to help teams manage projects, assign tasks, and track progress with a premium user experience. It features a real-time Kanban board, advanced dashboard analytics, and secure role-based access control.

![EtharaAI Dashboard](https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=2000)

## 🚀 Features

- **Real-time Dashboard**: Live stats for total tasks, completions, and overdue items pulled directly from MongoDB.
- **Kanban Board**: Interactive drag-and-drop task management system with status persistence.
- **Project Browser**: High-fidelity grid and list views for managing multiple team projects.
- **Team Management**: Interactive interface for managing members and assigning roles.
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing and RBAC (Admin/Member).
- **Premium UI/UX**: Built with Tailwind CSS, Framer Motion, and shadcn/ui. Includes dark mode, skeleton loaders, and spring-based animations.
- **Mobile First**: Fully responsive design with a native-style bottom tab bar for mobile users.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State/UI**: React Hooks, shadcn/ui, Lucide Icons

### Backend
- **Server**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT (JSON Web Tokens), Bcrypt.js
- **Environment**: Dotenv

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (Local instance or Atlas URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gunabh25/EtharaAI.git
   cd EtharaAI
   ```

2. **Setup Frontend**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/ethara_ai
   JWT_SECRET=your_super_secret_key
   ```

### Running the App

1. **Start MongoDB**
   ```bash
   brew services start mongodb-community@7.0
   ```

2. **Seed the Database** (Optional but recommended for demo)
   ```bash
   cd backend
   node seed.js
   ```

3. **Start Backend Server**
   ```bash
   cd backend
   node server.js
   ```

4. **Start Frontend Dev Server**
   ```bash
   # From the root directory
   npm run dev
   ```

Visit `http://localhost:3000` to see the app!

## 🛡 Security & Roles
The app implements Role-Based Access Control (RBAC):
- **Admins**: Full access to create/delete projects and manage team roles.
- **Members**: Can create tasks, update status, and participate in projects.

## 📄 License
This project is licensed under the MIT License.
