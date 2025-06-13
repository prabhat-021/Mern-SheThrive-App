# SheThrive - MERN Memories Sharing Application

A full-stack social media application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to share and interact with memories.

## Technologies Used

- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth

## Features

- User authentication (JWT + Google OAuth)
- Create, read, update, and delete posts
- Like and comment on posts
- Search functionality (by title and tags)
- Pagination
- Responsive design
- Recommended posts

## Getting Started

### Prerequisites

- Node.js
- MongoDB account
- Google OAuth credentials

### Installation

#### Client

```bash
cd client
npm install
npm start
```

#### Server

```bash
cd server
npm install
npm start
```

### Environment Variables

Create a `.env` file in the server directory with:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Deployment

- Frontend is deployed using Vercel
- Backend API is available at: https://mern-she-thrive-app.vercel.app/

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
