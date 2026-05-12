# Food Inventory Alert System 🍎🥦

A clean and simple food inventory management system that automatically detects low stock and expiring items, sending notifications via Email and Telegram.

## 🚀 Features
- **Excel Upload**: Bulk import inventory using `.xlsx` files.
- **Smart Detection**: Automatically flags items that are low in stock or nearing expiry.
- **Color-Coded Dashboard**: Visual status badges for easy monitoring.
- **Notifications**: Automated alerts via Telegram Bot and Nodemailer (Email).
- **Daily Cron Job**: Automated daily checks for inventory health.

## 🛠 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: SQLite (better-sqlite3)
- **Excel Parsing**: SheetJS (xlsx)
- **Notifications**: Nodemailer, Node Telegram Bot API
- **Cron Jobs**: Node-cron

## 📦 Project Structure
- `/client`: Frontend Next.js application
- `/server`: Backend Express API
- `sample_inventory.xlsx`: A sample file to test the upload feature.

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd stocktracker
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory using the `.env.example` as a template:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### 3. Install Dependencies
```bash
# Root (for sample generator)
npm install

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run the Application
```bash
# Start Backend (from /server)
node index.js

# Start Frontend (from /client)
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## 🧪 Testing with Sample Data
1. Use the `sample_inventory.xlsx` file provided in the root directory.
2. Click the "Upload Inventory" button in the dashboard and select this file.
3. Observe the inventory items appearing with status badges (Red for critical, Yellow for low stock, etc.).

## 🚢 Deployment
- **Frontend**: Deploy the `client` folder to **Vercel**.
- **Backend**: Deploy the `server` folder to **Render** or **Railway**.
- **Database**: The SQLite database (`inventory.db`) is local. For production, consider using a hosted PostgreSQL database (like Supabase) and updating the `database.js` file.

---
Built with ❤️ by Siddhant.
