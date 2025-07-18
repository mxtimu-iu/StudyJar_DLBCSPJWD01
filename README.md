![brave_screenshot_localhost (5)-perfect picture](https://github.com/user-attachments/assets/009483ec-f463-4268-90d4-c94465e4b6a6)
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

## Test Cases 
## Test Case Section : User Authentication
### Test Case 1: User can sign up with valid credentials
1. Go to the sign-up page
2. Enter a valid email and password
3. Click “Create account”
> Expected: Redirected to the dashboard. 
### Test Case 2: User cannot sign up with an existing email
1. Use an email already registered
> Expected: Error message appears.
### Test Case 3: User can log in with valid credentials
1. Use correct email and password
> Expected: Redirected to the dashboard.
### Test Case 4: User cannot log in with invalid credentials
1. Use incorrect login info
> Expected: Redirected to the dashboard. 
### Test Case 5: User can log in using test account
1. Test Email: alyssa@example.com
2. Test Email Password: car123
> Expected: Redirected to the dashboard.
### Test Case 6: User can log out
1. Click the “Logout” button
> Expected: Redirected to login page when you click the back button you should be redirected to the landing page.
 
## Test Case Section : Study Session Management (Authenticated User)
### Test Case 1: User fills the jar during a study session
1. Start a session
> Expected: Water appears in the jar and grows with time.

### Test Case 2: User can tag a study session
1. Choose from 4 tag options
> Expected: Tag is saved and visible in analytics.

### Test Case 3: User can set a study time goal
1. Input a time goal for the day
> Expected: Progress tracked against this goal.

## Test Case Section : Analytics Features
### Test Case 1: User can view weekly and monthly analytics
1. Navigate to analytics dashboard, user should be able to view stats for both the week and Month. 
> Expected: the stats should reflect in both the pie chart and bar graph for the chosen setting (Week or Month)

### Test Case 2: User can see a pie chart of tag usage
> Expected: Pie chart displays tag distribution accurately.

