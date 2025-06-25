import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SessionProvider } from './contexts/SessionContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Settings } from './components/Settings';
import { PrivateRoute } from './components/PrivateRoute';
import { Landing } from './pages/Landing';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SessionProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Navbar />
                      <main className="container mx-auto px-4 py-8 pt-24">
                        <Dashboard />
                      </main>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <PrivateRoute>
                      <Navbar />
                      <main className="container mx-auto px-4 py-8 pt-24">
                        <Analytics />
                      </main>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Navbar />
                      <main className="container mx-auto px-4 py-8 pt-24">
                        <Settings />
                      </main>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
