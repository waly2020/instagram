import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PostsProvider } from './contexts/PostsContext';
import Login from './Components/Auth/Login';
import PrivateRoute from './Components/Common/PrivateRoute';
import Home from './Home';


function App() {
  return (
    <Router>
      <AuthProvider>
        <PostsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PostsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
