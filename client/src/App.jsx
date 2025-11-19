import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import Contact from './pages/public/Contact';
import OurServices from './pages/public/OurServices';

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Protected pages
import Dashboard from './pages/protected/Dashboard';
import DiseaseDetection from './pages/protected/DiseaseDetection';
import ScanHistory from './pages/protected/ScanHistory';
import ViewScan from './pages/protected/ViewScan';
import Profile from './pages/protected/Profile';
import YearlyPlanner from './pages/protected/YearlyPlanner';
import ImportExport from './pages/protected/ImportExport';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<OurServices />} />
          
          {/* Auth routes */}
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
    </ToastProvider>
  );
}

export default App;
