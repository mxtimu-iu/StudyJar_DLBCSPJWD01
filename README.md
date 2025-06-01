# The Gem Jar 💎

A gamified productivity web application that turns your study sessions into beautiful gems. Stay focused, collect gems, and watch your jar fill up with your achievements!

## Features

- 🕒 Focus Timer: Track your study sessions
- 💎 Gem Collection: Convert study time into beautiful gems
- 📊 Progress Dashboard: View your daily and weekly stats
- 🎨 Customization: Choose gem colors for different subjects
- 🏆 Achievements: Unlock special gems and effects

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Hosted on Vercel

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT Authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up environment variables:
   - Create `.env` file in the backend directory
   - Create `.env.local` file in the frontend directory

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

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000
``` 