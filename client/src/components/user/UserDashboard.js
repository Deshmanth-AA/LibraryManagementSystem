
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import BookList from '../books/BookList';
import SearchBooks from '../books/SearchBooks';
import api from '../../utils/api';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/books');
        console.log('Books response:', response.data);
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async (searchResults) => {
    console.log('Search results:', searchResults);
    setBooks(searchResults);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">
        Welcome
      </h1>
      <SearchBooks onSearch={handleSearch} />
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default UserDashboard;