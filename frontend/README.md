# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Blog App - Frontend

Modern React application for the Blog platform with role-based user interfaces and admin dashboard.

## 🚀 Features

- **Responsive Design** - Works on all device sizes
- **Role-based UI** - Different interfaces for USER, AUTHOR, and ADMIN
- **Modern React** - Built with React 19 and hooks
- **State Management** - Zustand for lightweight state management
- **Form Handling** - React Hook Form for validation
- **Notifications** - Toast notifications for user feedback
- **Protected Routes** - Route protection based on user roles
- **Image Upload** - Profile image upload functionality

## 🛠️ Tech Stack

- **React 19** - Modern React with concurrent features
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form validation
- **React Hot Toast** - Notifications
- **Vite** - Build tool and dev server

## 📋 Prerequisites

- Node.js (v18+)
- npm or yarn
- Backend server running on port 4000

## 🚀 Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── AdminDashboard.jsx    # Admin interface
│   │   ├── AuthorDashboard.jsx   # Author interface
│   │   ├── UserDashboard.jsx     # User interface
│   │   ├── Login.jsx            # Authentication
│   │   ├── Register.jsx         # User registration
│   │   ├── Header.jsx           # Navigation
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   └── ...                  # Other components
│   ├── store/          # State management
│   │   └── authStore.js         # Authentication store
│   ├── styles/         # Styling
│   │   └── common.js            # Shared styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
└── README.md
```

## 🎨 UI Components

### User Interfaces
- **Login/Register** - Authentication forms
- **User Dashboard** - Article browsing and commenting
- **Author Dashboard** - Article creation and management
- **Admin Dashboard** - System administration

### Shared Components
- **Header** - Navigation with role-based links
- **Footer** - Site footer
- **ProtectedRoute** - Route access control
- **ErrorBoundary** - Error handling

## 🔐 Authentication Flow

1. **Login** - User enters credentials
2. **Role Detection** - System determines user role
3. **Redirect** - Automatic redirect based on role:
   - USER → `/user-profile`
   - AUTHOR → `/author-profile`
   - ADMIN → `/admin-dashboard`
4. **Protected Routes** - Role-based access control

## 🎯 User Roles & Features

### 👤 USER
- Browse all published articles
- Read full articles
- Leave comments on articles
- Update profile

### ✍️ AUTHOR
- All USER features
- Create new articles
- Edit own articles
- View article statistics
- Manage personal content

### 👨‍💼 ADMIN
- All AUTHOR features
- View system dashboard
- Manage all users (block/unblock)
- Moderate all articles (activate/deactivate)
- View system statistics
- Full administrative control

## 🎨 Styling

The application uses a custom design system inspired by Apple's design language:

- **Colors**: Clean whites, grays, and blue accents
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Components**: Reusable styled components
- **Responsive**: Mobile-first responsive design

## 🔗 API Integration

All API calls are handled through Axios with:
- Base URL: `http://localhost:4000`
- Credentials: `withCredentials: true` for cookies
- Error handling with user notifications
- Loading states for better UX

## 🚀 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Development Server

The development server runs on `http://localhost:5173` with:
- Hot module replacement
- Fast refresh
- Error overlay
- Network requests proxy

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Role-based redirects
- [ ] Article creation (Author)
- [ ] Article commenting (User)
- [ ] Admin user management
- [ ] Admin article moderation
- [ ] Responsive design on mobile
- [ ] Image upload functionality

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Serve the `dist` folder** with any static server

3. **Environment Variables** (if needed)
   ```env
   VITE_API_URL=http://your-api-url.com
   ```

## 📝 Notes

- The app uses React 19's new features
- State management with Zustand for simplicity
- Tailwind CSS for rapid UI development
- Form validation with React Hook Form
- Toast notifications for user feedback
- Protected routes with role-based access