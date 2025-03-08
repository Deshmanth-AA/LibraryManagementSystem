import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const ViewIssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const response = await api.get('/api/borrows/active');
      setIssuedBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issued books:', error);
      setError('There was an error fetching the issued books. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Issued Books</h2>
      <div className="space-y-4">
        {issuedBooks.map((borrow) => (
          <div key={borrow._id} className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {borrow.book ? borrow.book.title : 'No Title Available'}
                </h3>
                <p>Borrowed by: {borrow.user ? borrow.user.name : 'Unknown User'}</p>
                <p>Email: {borrow.user ? borrow.user.email : 'No Email Available'}</p>
              </div>
              <div>
                <p>Issue Date: {new Date(borrow.issueDate).toLocaleDateString()}</p>
                <p>Due Date: {new Date(borrow.dueDate).toLocaleDateString()}</p>
                <p
                  className={
                    borrow.status === 'overdue' ? 'text-red-600' : 'text-gray-600'
                  }
                >
                  Status: {borrow.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIssuedBooks;
