
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const BorrowHistory = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await api.get('/api/borrows/history');
        setBorrowings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching borrow history:', error);
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      console.log('Triggered handleReturn for:', borrowId);
      const response = await api.put(`/api/borrows/${borrowId}/return`);
      console.log('API response for return:', response.data);
  
      const historyResponse = await api.get('/api/borrows/history');
      console.log('Updated history after return:', historyResponse.data);
      setBorrowings(historyResponse.data);
  
      alert('Book returned successfully!');
    }catch (error) {
      console.error('Error in handleReturn:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error returning book');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Borrowing History</h2>
      <div className="space-y-4">
        {borrowings.map((borrow) => (
          <div
            key={borrow._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{borrow.book.title}</h3>
              <p className="text-gray-600">
                Issue Date: {new Date(borrow.issueDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Due Date: {new Date(borrow.dueDate).toLocaleDateString()}
              </p>
              <p
                className={`${
                  borrow.status === 'overdue' ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                Status: {borrow.status}
              </p>
            </div>
            {borrow.status === 'borrowed' && (
              <button
                onClick={() => handleReturn(borrow._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Return Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowHistory;