
import React, { useState } from 'react';
import api from '../../utils/api';

const SearchBooks = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/api/books/search`, {
        params: { searchBy, searchTerm },
      });
      onSearch(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex space-x-4">
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
          <option value="isbn">ISBN</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search books..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBooks;