
import React, { useState } from 'react';
import api from '../../utils/api';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    quantity: 1,
    availableCopies:'',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/books', bookData);
      setBookData({ title: '', author: '', isbn: '', genre: '', quantity: 1, availableCopies:"" });
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={bookData.author}
            onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">ISBN</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={bookData.isbn}
            onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Genre</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={bookData.genre}
            onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={bookData.quantity}
            onChange={(e) => setBookData({ ...bookData, quantity: Number(e.target.value) })}
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;