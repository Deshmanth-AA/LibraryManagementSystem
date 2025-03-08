
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../utils/api';

const BookCard = ({ book }) => {
  const { user } = useContext(AuthContext);

  const handleBorrow = async () => {
    try {
      await api.post('/api/borrows', { bookId: book._id });
      alert('Book borrowed successfully!');
    } catch (error) {
      console.error('Error borrowing book:', error);
      alert('Error borrowing book');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Genre: {book.genre}</p>
      <p className="text-gray-600">ISBN: {book.isbn}</p>
      <p className="text-gray-600">
        Available Copies: {book.availableCopies}/{book.quantity}
      </p>
      {user?.role === 'user' && book.availableCopies > 0 && (
        <button
          onClick={handleBorrow}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Borrow
        </button>
      )}
    </div>
  );
};

export default BookCard;