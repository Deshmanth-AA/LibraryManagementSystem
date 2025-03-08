// README.md
# Library Management System

A full-stack web application for managing library resources, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Role-based access control (Admin and User roles)
- Book management (Add, Edit, Delete)
- Book borrowing and returns
- Search and filter books
- Borrowing history tracking
- User management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library-management-system
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Configure environment variables:
   - Create `.env` file in server directory
   - Create `.env` file in client directory
   - Update the variables according to your setup

5. Start the development servers:

Server:
```bash
cd server
npm run dev
```

Client:
```bash
cd client
npm start
```

## API Documentation

### Authentication Routes
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Book Routes
- GET /api/books - Get all books
- POST /api/books - Add a new book (Admin only)
- PUT /api/books/:id - Update book (Admin only)
- DELETE /api/books/:id - Delete book (Admin only)

## Borrow Routes
- POST /api/borrows - Borrow a book
- PUT /api/borrows/:id/return - Return a book
- GET /api/borrows/history - Get user's borrowing history
- GET /api/borrows/all - Get all borrows (Admin only)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License"# LibraryManagementSystem" 
