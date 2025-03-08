
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white font-bold text-xl">
              Library Management System
            </Link>
            {user && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/books"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                >
                  Books
                </Link>
                {user.role === 'admin' ? (
                  <>
                    {/* <Link
                      to="/admin/add-book"
                      className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                    >
                      Manage books
                    </Link> */}
                    {/* <Link
                      to="/admin/users"
                      className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                    >
                      Manage Users
                    </Link>
                    <Link
                      to="/admin/issued-books"
                      className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                    >
                      Issued Books
                    </Link> */}
                  </>
                ) : (
                  <Link
                    to="/history"
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    My History
                  </Link>
                )}
              </div>
            )}
          </div>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;