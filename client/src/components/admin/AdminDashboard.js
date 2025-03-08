
import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalUsers: 0,
    activeLoans: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {

        await api.get('/api/health');
  
        const [booksRes, usersRes, loansRes] = await Promise.all([
          api.get('/api/books'),
          api.get('/api/users'),
          api.get('/api/borrows/active')
        ]);
  
        const totalAvailable = booksRes.data.reduce((sum, book) => sum + (book.availableCopies || 0), 0);
        const totalBooks = booksRes.data.reduce((sum, book) => sum + (book.quantity || 0), 0);
  
        setStats({
          totalBooks,
          availableBooks: totalAvailable,
          totalUsers: usersRes.data.length,
          activeLoans: loansRes.data.length
        });
        setError(null);
      } catch (error) {
        console.error('Dashboard error:', error);
        setError(
          error.response?.data?.message || 
          'Failed to load dashboard data. Please check your connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Books</div>
          <div className="text-2xl font-bold">{stats.totalBooks}</div>
          <p className="text-sm text-gray-500">{stats.availableBooks} available</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Users</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-sm text-gray-500">Registered users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">Active Loans</div>
          <div className="text-2xl font-bold">{stats.activeLoans}</div>
          <p className="text-sm text-gray-500">Books currently borrowed</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/add-book"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div>
              <h3 className="font-semibold">Manage Books</h3>
              <p className="text-sm text-gray-600">Add or edit books</p>
            </div>
          </Link>

          <Link
            to="/admin/manage-users"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div>
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage user accounts</p>
            </div>
          </Link>

          <Link
            to="/admin/issued-books"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div>
              <h3 className="font-semibold">View Borrows</h3>
              <p className="text-sm text-gray-600">Track borrowed books</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;