# Issue Tracker

A full-stack issue tracking application with CRUD operations, user authentication, and advanced filtering capabilities.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Toastify** - Notifications

### Backend
- **Express.js** - API framework
- **MongoDB** with Mongoose - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Features

### Core Functionality
- ✅ **CRUD Operations** - Create, read, update, and delete issues
- ✅ **User Authentication** - Register/login with JWT tokens
- ✅ **Status Management** - Open, In Progress, Resolved, Closed
- ✅ **Priority Levels** - Low, Medium, High with visual indicators
- ✅ **Search** - Debounced search by title
- ✅ **Filtering** - Filter by status and priority
- ✅ **Pagination** - Navigate through large issue lists
- ✅ **Status Dashboard** - Visual counts of issues by status
- ✅ **Quick Actions** - Mark issues as Resolved/Closed with confirmation
- ✅ **Export** - Download issues as CSV or JSON

### UI/UX
- Visual badges and icons for status/priority
- Responsive design
- Loading states and error handling
- Confirmation dialogs for destructive actions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas connection string)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd issue-tracker
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/issue-tracker
   JWT_SECRET=your-secret-key-here
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

   Create a `.env` file in the `client` directory (if needed):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Issues (Protected Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | Get all issues (with filters, search, pagination) |
| POST | `/api/issues` | Create a new issue |
| PATCH | `/api/issues/:id` | Update an existing issue |
| DELETE | `/api/issues/:id` | Delete an issue |

#### Query Parameters for GET /api/issues
- `search` - Search issues by title
- `status` - Filter by status (Open, In Progress, Resolved, Closed)
- `priority` - Filter by priority (Low, Medium, High)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable UI components
│   │   │   ├── layout/    # Layout components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── features/      # Feature modules
│   │   │   ├── auth/      # Authentication (Login, Register, Store)
│   │   │   └── issues/    # Issue management (CRUD, Filters, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── types/         # TypeScript type definitions
│   └── package.json
│
├── server/                 # Backend Express application
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Authentication middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   └── package.json
│
└── README.md
```

## Usage Guide

### Creating an Issue
1. Click the "New Issue" button
2. Fill in the title, description, priority, and severity
3. Click "Create Issue"

### Managing Issues
- **View**: Click the eye icon to see issue details
- **Edit**: Click the pencil icon to modify the issue
- **Resolve**: Click the green checkmark to mark as resolved
- **Close**: Click the X icon to close the issue
- **Delete**: Click the trash icon to delete (with confirmation)

### Filtering & Search
- Use the search bar to find issues by title
- Use the Status dropdown to filter by status
- Use the Priority dropdown to filter by priority
- Click "Clear filters" to reset all filters

### Exporting Data
- Click the "Export" button in the header
- Choose JSON or CSV format
- The file will download automatically

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

