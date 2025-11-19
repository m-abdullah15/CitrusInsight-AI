# CitrusInsight AI - Frontend Documentation

React-based frontend application for CitrusInsight AI. Built with Vite, React Router, and TailwindCSS to provide a beautiful, responsive user interface for citrus disease detection.

## 🏗️ Architecture

The frontend follows a component-based architecture with:
- **Pages**: Top-level route components
- **Components**: Reusable UI components organized by feature
- **Context**: Global state management (Auth, Toast)
- **Services**: API communication layer
- **Routing**: Protected and public routes

## 📁 Project Structure

```
client/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, icons, etc.
│   ├── components/           # Reusable components
│   │   ├── common/          # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   └── Toast.jsx
│   │   ├── dashboard/       # Dashboard components
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── ScanStatistics.jsx
│   │   │   └── RecentScans.jsx
│   │   ├── detection/       # Disease detection components
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── ScanResult.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── TreatmentInfo.jsx
│   │   └── history/         # Scan history components
│   │       ├── ScanCard.jsx
│   │       └── ViewScanDetail.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── ToastContext.jsx # Toast notifications
│   ├── pages/               # Page components
│   │   ├── public/          # Public pages
│   │   │   ├── Home.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── OurServices.jsx
│   │   ├── auth/            # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   └── protected/       # Protected pages
│   │       ├── Dashboard.jsx
│   │       ├── DiseaseDetection.jsx
│   │       ├── ScanHistory.jsx
│   │       ├── ViewScan.jsx
│   │       ├── Profile.jsx
│   │       ├── YearlyPlanner.jsx
│   │       └── ImportExport.jsx
│   ├── services/            # API services
│   │   ├── api.js          # Axios configuration
│   │   ├── authService.js  # Auth API calls
│   │   └── scanService.js  # Scan API calls
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── .env.example            # Environment template
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Backend server running (see [../server/README.md](../server/README.md))

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see Environment Variables section)

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will open at `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the client directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application Configuration
VITE_APP_NAME=CitrusInsight AI
```

### Environment Variable Descriptions

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | Yes | - |
| `VITE_APP_NAME` | Application name | No | CitrusInsight AI |

**Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.

## 🎨 Component Structure

### Common Components

#### Navbar
Navigation bar with responsive menu, authentication state, and route links.

**Props:** None (uses AuthContext)

**Usage:**
```jsx
import Navbar from './components/common/Navbar';

<Navbar />
```

#### Footer
Application footer with links and copyright information.

**Props:** None

#### ProtectedRoute
Wrapper component that redirects unauthenticated users to login.

**Props:** None (uses AuthContext)

**Usage:**
```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

#### LoadingSpinner
Animated loading indicator.

**Props:**
- `size` (string): 'sm', 'md', 'lg' - default: 'md'
- `color` (string): Tailwind color class - default: 'text-emerald-500'

**Usage:**
```jsx
<LoadingSpinner size="lg" />
```

#### SkeletonLoader
Placeholder loading state for content.

**Props:**
- `type` (string): 'card', 'text', 'image' - default: 'card'
- `count` (number): Number of skeleton items - default: 1

#### Toast
Notification component for success/error messages.

**Usage:** Via ToastContext
```jsx
const { showToast } = useToast();
showToast('Success message', 'success');
showToast('Error message', 'error');
```

### Dashboard Components

#### DashboardCard
Stat card displaying metrics with icons.

**Props:**
- `title` (string): Card title
- `value` (string|number): Displayed value
- `icon` (ReactNode): Icon component
- `gradient` (string): Tailwind gradient classes

#### ScanStatistics
Fetches and displays user scan statistics.

**Props:** None (uses AuthContext)

#### RecentScans
Displays list of recent scans with thumbnails.

**Props:**
- `limit` (number): Number of scans to display - default: 10

### Detection Components

#### ImageUploader
File upload component with drag-and-drop and preview.

**Props:**
- `onImageSelect` (function): Callback when image is selected
- `onUpload` (function): Callback to trigger upload
- `loading` (boolean): Upload in progress state

**Usage:**
```jsx
<ImageUploader
  onImageSelect={handleImageSelect}
  onUpload={handleUpload}
  loading={uploading}
/>
```

#### ScanResult
Displays disease prediction results.

**Props:**
- `scan` (object): Scan data with disease, confidence, treatment
- `onSave` (function): Optional save callback

#### ProgressBar
Animated progress bar for confidence display.

**Props:**
- `percentage` (number): 0-100
- `color` (string): Tailwind color class
- `animated` (boolean): Enable animation - default: true

#### TreatmentInfo
Displays disease treatment recommendations.

**Props:**
- `treatment` (object): Treatment data with description, steps, prevention

### History Components

#### ScanCard
Card component for scan list items.

**Props:**
- `scan` (object): Scan data
- `onView` (function): View callback
- `onDelete` (function): Delete callback

#### ViewScanDetail
Detailed view of a single scan.

**Props:**
- `scanId` (string): Scan ID to display

## 🛣️ Routing

### Public Routes

- `/` - Home page
- `/contact` - Contact page
- `/services` - Our Services page
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes

All require authentication:

- `/dashboard` - User dashboard with statistics
- `/detection` - Disease detection page
- `/history` - Scan history list
- `/scan/:id` - View single scan details
- `/profile` - User profile
- `/planner` - Yearly planner
- `/import-export` - Import/Export information

### Route Configuration

```jsx
<BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<OurServices />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/detection" element={<DiseaseDetection />} />
      <Route path="/history" element={<ScanHistory />} />
      <Route path="/scan/:id" element={<ViewScan />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/planner" element={<YearlyPlanner />} />
      <Route path="/import-export" element={<ImportExport />} />
    </Route>
  </Routes>
</BrowserRouter>
```

## 🔐 Authentication

### AuthContext

Provides global authentication state and functions.

**Available values:**
- `user` (object|null): Current user data
- `token` (string|null): JWT token
- `loading` (boolean): Auth check in progress
- `login(email, password)`: Login function
- `signup(name, email, password)`: Signup function
- `logout()`: Logout function

**Usage:**
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.name}</div>;
}
```

### Token Storage

JWT tokens are stored in `localStorage` with key `token`.

**Security note:** For production, consider using httpOnly cookies instead.

## 📡 API Services

### API Configuration (api.js)

Axios instance with interceptors for authentication and error handling.

**Features:**
- Automatic token attachment
- 401 redirect to login
- Error response formatting

### Auth Service (authService.js)

**Functions:**
- `signup(name, email, password)`: Register new user
- `login(email, password)`: Login user
- `logout()`: Logout user
- `getCurrentUser()`: Get current user data

**Usage:**
```jsx
import { login } from '../services/authService';

const handleLogin = async (email, password) => {
  try {
    const data = await login(email, password);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Scan Service (scanService.js)

**Functions:**
- `uploadImage(file)`: Upload image and get prediction
- `getUserScans(page, limit)`: Get paginated scans
- `getScanById(id)`: Get single scan
- `deleteScan(id)`: Delete scan
- `getScanStats()`: Get dashboard statistics

**Usage:**
```jsx
import { uploadImage } from '../services/scanService';

const handleUpload = async (file) => {
  try {
    const scan = await uploadImage(file);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## 🎨 Styling

### TailwindCSS

The application uses TailwindCSS for styling with a custom configuration.

**Color Palette:**
- Primary: Emerald green (`emerald-500`, `emerald-600`)
- Secondary: Deep blue (`blue-600`, `blue-700`)
- Accent: Gold (`amber-500`, `amber-600`)
- Background: Gray shades (`gray-50`, `gray-100`)
- Text: Dark gray (`gray-900`, `gray-700`)

**Custom Configuration:**
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#1e40af',
        accent: '#f59e0b',
      },
    },
  },
}
```

### Responsive Design

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Usage:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server

Vite dev server runs on `http://localhost:5173` with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Instant server start

### Building for Production

```bash
npm run build
```

Creates optimized production build in `dist/` directory:
- Minified JavaScript and CSS
- Code splitting
- Asset optimization
- Source maps (optional)

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure environment variables**
   - Go to Vercel dashboard
   - Add `VITE_API_URL` with production backend URL

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy dist folder**
   - Drag and drop `dist/` to Netlify
   - Or connect GitHub repository

3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables

### Environment-Specific Configuration

**Production checklist:**
- [ ] Update `VITE_API_URL` to production backend
- [ ] Enable HTTPS
- [ ] Configure custom domain
- [ ] Set up CDN for assets
- [ ] Enable gzip compression
- [ ] Configure caching headers
- [ ] Set up error tracking (Sentry)
- [ ] Enable analytics (Google Analytics)

## 🔍 Troubleshooting

### Common Issues

**Issue: API requests fail with CORS error**
- Ensure backend CORS_ORIGIN includes frontend URL
- Check if backend server is running
- Verify VITE_API_URL is correct

**Issue: Authentication not persisting**
- Check localStorage for token
- Verify token expiration (24h)
- Check browser console for errors

**Issue: Images not uploading**
- Check file size (max 10MB)
- Verify file type (JPEG, PNG, WebP only)
- Check backend Cloudinary configuration

**Issue: Build fails**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all imports are correct

**Issue: Styles not applying**
- Ensure TailwindCSS is configured
- Check if PostCSS is working
- Verify class names are correct

### Development Tips

1. **Use React DevTools** for component debugging
2. **Check Network tab** for API request/response
3. **Use console.log** strategically (remove before commit)
4. **Test responsive design** with browser DevTools
5. **Clear cache** if experiencing stale data
6. **Use ESLint** to catch errors early

## 📦 Dependencies

### Production Dependencies

- `react` (^19.2.0): UI library
- `react-dom` (^19.2.0): React DOM renderer
- `react-router-dom` (^7.9.5): Routing library
- `axios` (^1.13.2): HTTP client

### Development Dependencies

- `vite` (^7.2.2): Build tool
- `@vitejs/plugin-react` (^5.1.0): React plugin for Vite
- `tailwindcss` (^3.4.18): CSS framework
- `autoprefixer` (^10.4.22): PostCSS plugin
- `postcss` (^8.5.6): CSS processor
- `eslint` (^9.39.1): Linter

## 🎯 Best Practices

### Component Guidelines

1. **Keep components small and focused**
2. **Use functional components with hooks**
3. **Extract reusable logic to custom hooks**
4. **Use PropTypes or TypeScript for type checking**
5. **Follow naming conventions (PascalCase for components)**

### State Management

1. **Use Context for global state (auth, theme)**
2. **Use local state for component-specific data**
3. **Avoid prop drilling with Context**
4. **Keep state as close to usage as possible**

### Performance

1. **Use React.memo for expensive components**
2. **Implement lazy loading for routes**
3. **Optimize images (WebP, lazy loading)**
4. **Minimize bundle size (code splitting)**
5. **Use production build for deployment**

### Code Quality

1. **Run ESLint before committing**
2. **Write meaningful commit messages**
3. **Keep functions small and focused**
4. **Add comments for complex logic**
5. **Remove console.logs before production**

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contributing

When contributing to the frontend:
1. Follow existing component structure
2. Use TailwindCSS for styling
3. Add PropTypes or TypeScript types
4. Test on multiple screen sizes
5. Update this README with new components

---

**For backend documentation, see [../server/README.md](../server/README.md)**
