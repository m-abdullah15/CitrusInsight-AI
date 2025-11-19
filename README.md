# CitrusInsight AI 🍊

An AI-powered citrus disease detection system built with the MERN stack. Upload images of citrus leaves to identify diseases and receive treatment recommendations powered by machine learning.

![CitrusInsight AI](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Features

- **AI-Powered Disease Detection**: Upload citrus leaf images and get instant disease predictions using Hugging Face ML models
- **Confidence Scoring**: View prediction confidence levels with visual progress indicators
- **Treatment Recommendations**: Receive detailed treatment plans and prevention tips for detected diseases
- **Scan History**: Track all your previous scans with pagination and search capabilities
- **User Dashboard**: Monitor your scan statistics and recent activity
- **Secure Authentication**: JWT-based authentication with encrypted password storage
- **Responsive Design**: Beautiful, glamorous UI that works seamlessly on mobile, tablet, and desktop
- **Cloud Storage**: Images stored securely on Cloudinary
- **User Profile Management**: View and manage your account information
- **Yearly Planner**: Access citrus cultivation planning tools
- **Import/Export Information**: Learn about citrus trade in Pakistan

## 🏗️ Project Structure

```
citrus-insight-ai/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API service functions
│   │   └── utils/         # Helper functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js/Express backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── package.json
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image hosting)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citrus-insight-ai
   ```

2. **Install dependencies**
   
   Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
   
   Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env` file in the `server` directory:
   ```bash
   cd ../server
   cp .env.example .env
   ```
   
   Edit `server/.env` with your configuration (see Backend README for details)
   
   Create `.env` file in the `client` directory:
   ```bash
   cd ../client
   cp .env.example .env
   ```
   
   Edit `client/.env` with your configuration (see Frontend README for details)

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas connection string in your `.env` file

5. **Run the application**
   
   Start the backend server (from `server` directory):
   ```bash
   npm run dev
   ```
   
   Start the frontend development server (from `client` directory):
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📚 Documentation

- [Backend Documentation](./server/README.md) - API endpoints, database setup, and server configuration
- [Frontend Documentation](./client/README.md) - Component structure, routing, and build process

## 🔧 Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image hosting

### External Services
- **Hugging Face** - Machine learning inference
- **Cloudinary** - Cloud image storage

## 🎨 Key Features Explained

### Disease Detection Flow
1. User uploads a citrus leaf image
2. Image is validated (type and size)
3. Image is uploaded to Cloudinary
4. Image URL is sent to Hugging Face API
5. ML model predicts disease and confidence
6. Treatment recommendations are retrieved
7. Scan record is saved to database
8. Results are displayed to user

### Authentication System
- Secure user registration with password hashing
- JWT token-based authentication
- Protected routes on both frontend and backend
- 24-hour token expiration
- Automatic token refresh on page load

### Scan History
- View all previous scans
- Pagination support (20 scans per page)
- Sort by date (newest first)
- Delete scans with confirmation
- Click to view detailed scan information

## 🔐 Security Features

- Passwords hashed with bcrypt (10+ salt rounds)
- JWT tokens with secure secret keys
- Protected API routes with authentication middleware
- CORS configuration for frontend origin
- Input validation and sanitization
- File type and size validation
- Environment variable configuration

## 🐛 Troubleshooting

### Common Issues

**Issue: MongoDB connection failed**
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify network access settings in MongoDB Atlas
- Check if the database user has proper permissions

**Issue: Cloudinary upload fails**
- Verify your Cloudinary credentials in `.env`
- Check if the API key has upload permissions
- Ensure file size is under 10MB

**Issue: Hugging Face API timeout**
- The model may be loading (cold start)
- Wait 30-60 seconds and try again
- Check your internet connection
- Verify the Hugging Face space is active

**Issue: Frontend can't connect to backend**
- Ensure backend server is running on port 5000
- Check `VITE_API_URL` in `client/.env`
- Verify CORS settings in `server/server.js`

**Issue: JWT token invalid**
- Token may have expired (24-hour limit)
- Log out and log back in
- Clear localStorage and try again

**Issue: Images not displaying**
- Check Cloudinary configuration
- Verify image URLs are accessible
- Check browser console for CORS errors

### Development Tips

1. **Use separate terminals** for frontend and backend
2. **Check console logs** for detailed error messages
3. **Clear browser cache** if experiencing stale data
4. **Use MongoDB Compass** to inspect database records
5. **Test API endpoints** with Postman or Thunder Client
6. **Enable React DevTools** for component debugging

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
HUGGINGFACE_API_URL=https://abdjutt777-citrus-demo.hf.space/
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=CitrusInsight AI
```

## 🧪 Testing

Currently, the application uses manual testing. Future enhancements will include:
- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Cypress
- Component tests with React Testing Library

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Set up custom domain

### Backend Deployment (Heroku/Railway)
1. Push code to Git repository
2. Connect to deployment platform
3. Configure environment variables
4. Deploy and monitor logs

### Database (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas
2. Configure network access
3. Create database user
4. Update connection string in backend `.env`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Hugging Face for ML model hosting
- Cloudinary for image storage
- MongoDB for database services
- The MERN stack community

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact: your-email@example.com

---

**Built with ❤️ for citrus farmers and agricultural professionals**
