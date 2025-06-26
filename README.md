# The Gem Jar 

A gamified productivity web application that turns your study sessions into beautiful gems. Stay focused, collect gems, and watch your jar fill up with your achievements!

## Features

-  Focus Timer: Track your study sessions
-  Gem Collection: Convert study time into beautiful gems
-  Progress Dashboard: View your daily and weekly stats
-  Customization: Choose gem colors for different subjects
-  Achievements: Unlock special gems and effects

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Hosted on Vercel

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT Authentication


## Prerequisites
- Git
- Node.js version 22.12.1
- npm version 11.4.2 

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables (see detailed instructions below)
4. Start the development servers:
   ```bash
   npm start
   ```

## Project Structure

```
gem-jar/
├── frontend/          # React frontend application
├── backend/           # Express.js backend server
└── package.json       # Root package.json for workspace management
```

## Environment Variables Setup

### Backend Configuration

1. Create a `.env` file in the `backend` directory
2. Add the following environment variables:

```env
# Server Configuration
PORT=5000                    # Port number for the backend server
NODE_ENV=development         # Environment mode (development/production)

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/gemjar    # Your MongoDB connection string

# JWT Configuration
JWT_SECRET=your_jwt_secret   # Secret key for JWT token generation
```

#### Required Variables Explanation:
- `PORT`: The port number where the backend server will run (default: 5000)
- `NODE_ENV`: Application environment (development/production)
- `MONGODB_URI`: Your MongoDB connection string
  - For local development: `mongodb://localhost:27017/gemjar`
  - For MongoDB Atlas: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gemjar`
- `JWT_SECRET`: A secure string used for JWT token generation
  - Must be at least 32 characters long
  - Use a strong random string generator for production

### Frontend Configuration

1. Create a `.env.local` file in the `frontend` directory
2. Add the following environment variables:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000    # Backend API URL
```

#### Required Variables Explanation:
- `REACT_APP_API_URL`: The URL where your backend server is running
  - Local development: `http://localhost:5000`
  - Production: Your deployed backend URL

### Environment Setup Tips

1. Never commit `.env` files to version control
2. Keep different environment files for development and production
3. Use strong, unique values for sensitive variables in production
4. Make sure all required variables are set before running the application

### Example Development Setup

1. Backend `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gemjar
JWT_SECRET=development_secret_key_minimum_32_chars
```

2. Frontend `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000
```

Note: These are example values for development. Use secure, unique values in production. 
