# EtharaAI — Enterprise Team Management Platform

EtharaAI is a high-performance, full-stack SaaS platform designed for modern teams to manage complex projects, track real-time analytics, and streamline collaboration with a premium user experience.

---

## ✨ Features

### 📊 Intelligent Dashboard
* **Live Analytics**: Real-time tracking of task completion, overdue items, and team efficiency.
* **Dynamic Charting**: Visualized task activity over the last 7 days pulled directly from MongoDB.
* **Recent Activity Feed**: Transparent logging of team actions across the workspace.

### 📋 Advanced Project Management
* **Dual View Mode**: Switch seamlessly between high-fidelity Grid and List views.
* **Project Persistence**: Full CRUD (Create, Read, Update, Delete) operations for projects with real-time database sync.
* **Progress Tracking**: Interactive progress bars and status indicators for every initiative.

### 🏗️ Kanban & Task Systems
* **Interactive Kanban**: Drag-and-drop task management (Todo, In Progress, Completed).
* **Task Modals**: Detailed task viewing and editing with assignee and priority management.

### 🛡️ Security & Authentication
* **JWT Sessions**: Secure, token-based session management stored in encrypted cookies.
* **Bcrypt Hashing**: Industry-standard password encryption for all user accounts.
* **RBAC (Role-Based Access Control)**: Permission-based access for Admins and Members.
* **Protected Middleware**: Global Next.js middleware to enforce route protection and prevent unauthorized access.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Animations** | Framer Motion (Spring-based) |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js, js-cookie |

---

## 🏁 Local Development Setup

### 1. Prerequisites
* Node.js 18.0 or higher
* MongoDB installed and running locally (`mongodb://127.0.0.1:27017`)

### 2. Backend Configuration
Navigate to the `backend` folder and create a `.env` file:
```env
PORT=5005
MONGO_URI=mongodb://127.0.0.1:27017/ethara_ai
JWT_SECRET=your_secure_random_key_here
```

### 3. Installation & Seeding
```bash
# Install root dependencies
npm install

# Install and seed backend
cd backend
npm install
node seed.js
```

### 4. Running the Application
```bash
# Start backend (Port 5005)
node server.js

# Start frontend (New terminal, root directory)
npm run dev
```
Visit: `http://localhost:3000`

---

## 🚀 Production Deployment (Railway)

EtharaAI is optimized for deployment on Railway.

### 1. Environment Variables (Railway Dashboard)
Add these variables to your **EtharaAI Service**:
* `MONGO_URI`: `${{MongoDB.MONGO_URL}}` (Connects to your Railway MongoDB service)
* `JWT_SECRET`: Use the same secret key from your local `.env`.
* `NEXT_PUBLIC_API_URL`: `https://your-app-url.up.railway.app`

### 2. Seeding the Production Database
To populate your live site with initial data, run this command from your local terminal (replacing the URL with your **Public Connection String** from Railway):
```bash
cd backend
MONGO_URI="mongodb://mongo:password@your-railway-proxy.rlwy.net:12345" node seed.js
```

### 3. Smart API Routing
The application uses **Smart Routing** logic to automatically detect the environment:
* **Local**: Connects to `http://localhost:5005`
* **Production**: Connects to the Railway deployment URL automatically.

---

## 🎨 Design System
* **Aesthetics**: Sleek dark mode with glassmorphism effects and soft shadows.
* **Interactions**: Subtle hover micro-animations and smooth transitions using Framer Motion.
* **Typography**: Modern, clean sans-serif stack (Inter/system-font).

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
