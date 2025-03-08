
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddBook from './components/admin/AddBook';
import ManageUsers from './components/admin/ManageUsers';
import ViewIssuedBooks from './components/admin/ViewIssuedBooks';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookList from './components/books/BookList';
import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/layout/Layout';
import BorrowHistory from './components/user/BorrowHistory';
import { AuthProvider } from './context/AuthContext';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={['user']}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute roles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
              />
            <Route
              path="/books"
              element={
                <PrivateRoute>
                  <BookList />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute roles={['user']}>
                  <BorrowHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/add-book"
              element={
                <PrivateRoute roles={['admin']}>
                  <AddBook />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/issued-books"
              element={
                <PrivateRoute roles={['admin']}>
                  <ViewIssuedBooks />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <PrivateRoute roles={['admin']}>
                  <ManageUsers />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;