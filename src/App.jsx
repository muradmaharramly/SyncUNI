import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AIAgentProvider } from './context/AIAgentContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';

import CompanyDashboard from './pages/Dashboards/CompanyDashboard';
import UniversityDashboard from './pages/Dashboards/UniversityDashboard';
import CourseDashboard from './pages/Dashboards/CourseDashboard';
import StudentDashboard from './pages/Dashboards/StudentDashboard';

import CompanyOperations from './pages/Dashboards/Operations/CompanyOperations';
import CompanyAnalytics from './pages/Dashboards/Analytics/CompanyAnalytics';
import UniversityOperations from './pages/Dashboards/Operations/UniversityOperations';
import UniversityAnalytics from './pages/Dashboards/Analytics/UniversityAnalytics';
import StudentOperations from './pages/Dashboards/Operations/StudentOperations';
import CourseOperations from './pages/Dashboards/Operations/CourseOperations';
import CourseAnalytics from './pages/Dashboards/Analytics/CourseAnalytics';

import ProfilePage from './pages/Dashboards/Common/ProfilePage';
import SettingsPage from './pages/Dashboards/Common/SettingsPage';
import HistoryPage from './pages/Dashboards/Common/HistoryPage';
import SubscriptionPage from './pages/Dashboards/Common/SubscriptionPage';
import ElanlarPage from './pages/Dashboards/Common/ElanlarPage';

import AgentPage from './pages/Dashboards/Agent/AgentPage';

function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to={`/dashboard/${user.role}`} replace />;
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AIAgentProvider>
            <Router>
              <Navbar />
              <div className="app-content">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />

                  <Route path="/dashboard" element={<DashboardLayout />}>
                    {}
                    <Route path="company" element={<PrivateRoute allowedRole="company"><CompanyDashboard /></PrivateRoute>} />
                    <Route path="company/operations" element={<PrivateRoute allowedRole="company"><CompanyOperations /></PrivateRoute>} />
                    <Route path="company/analytics" element={<PrivateRoute allowedRole="company"><CompanyAnalytics /></PrivateRoute>} />

                    {}
                    <Route path="university" element={<PrivateRoute allowedRole="university"><UniversityDashboard /></PrivateRoute>} />
                    <Route path="university/operations" element={<PrivateRoute allowedRole="university"><UniversityOperations /></PrivateRoute>} />
                    <Route path="university/analytics" element={<PrivateRoute allowedRole="university"><UniversityAnalytics /></PrivateRoute>} />

                    {}
                    <Route path="course" element={<PrivateRoute allowedRole="course"><CourseDashboard /></PrivateRoute>} />
                    <Route path="course/operations" element={<PrivateRoute allowedRole="course"><CourseOperations /></PrivateRoute>} />
                    <Route path="course/analytics" element={<PrivateRoute allowedRole="course"><CourseAnalytics /></PrivateRoute>} />

                    {}
                    <Route path="student" element={<PrivateRoute allowedRole="student"><StudentDashboard /></PrivateRoute>} />
                    <Route path="student/operations" element={<PrivateRoute allowedRole="student"><StudentOperations /></PrivateRoute>} />

                    {}
                    <Route path=":role/history" element={<HistoryPage />} />
                    <Route path=":role/subscription" element={<SubscriptionPage />} />
                    <Route path=":role/elanlar" element={<ElanlarPage />} />
                    <Route path=":role/agent" element={<AgentPage />} />
                    <Route path=":role/profile" element={<ProfilePage />} />
                    <Route path=":role/settings" element={<SettingsPage />} />
                  </Route>
                </Routes>
              </div>
            </Router>
          </AIAgentProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
