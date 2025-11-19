# CitrusInsight AI - Backend Documentation

Node.js/Express backend server for the CitrusInsight AI application. Provides RESTful API endpoints for authentication, image upload, disease prediction, and scan management.

## 🏗️ Architecture

The backend follows a layered architecture:
- **Routes**: Define API endpoints and HTTP methods
- **Middleware**: Handle authentication, validation, and error handling
- **Controllers**: Process requests and coordinate business logic
- **Services**: Interact with external APIs (Hugging Face, Cloudinary)
- **Models**: Define database schemas with Mongoose
- **Config**: Database and service configurations

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js                      # MongoDB connection
│   └── cloudinary.config.js       # Cloudinary configuration
├── controllers/
│   ├── auth.controller.js         # Authentication logic
│   └── scan.controller.js         # Scan operations
├── middleware/
│   ├── auth.middleware.js         # JWT verification
│   ├── upload.middleware.js       # File upload handling
│   ├── validation.middleware.js   # Input validation
│   └── errorHandler.middleware.js # Centralized error handling
├── models/
│   ├── User.js                    # User schema
│   └── Scan.js                    # Scan schema
├── routes/
│   ├── auth.routes.js             # Auth endpoints
│   ├── scan.routes.js             # Scan endpoints
│   └── user.routes.js             # User endpoints
├── services/
│   ├── cloudinary.service.js      # Image upload service
│   ├── huggingface.service.js     # ML prediction service
│   └── treatment.service.js       # Disease treatment data
├── utils/
│   └── validation.js              # Validation helpers
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies and scripts
└── server.js                      # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see Environment Variables section)

4. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or your configured PORT)

## 🔧 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/citrusinsight

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=24h

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Hugging Face Configuration
HUGGINGFACE_API_URL=https://abdjutt777-citrus-demo.hf.space/

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Environment Variable Descriptions

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRE` | JWT token expiration time | No | 24h |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes | - |
| `HUGGINGFACE_API_URL` | Hugging Face model endpoint | Yes | - |
| `CORS_ORIGIN` | Allowed frontend origin | Yes | - |

## 🗄️ Database Setup

### Local MongoDB

1. **Install MongoDB**
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   mongod
   ```

3. **Configure connection**
   ```env
   MONGODB_URI=mongodb://localhost:27017/citrusinsight
   ```

### MongoDB Atlas (Cloud)

1. **Create account**
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create cluster**
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Configure network access**
   - Go to Network Access
   - Add IP address (0.0.0.0/0 for development)

4. **Create database user**
   - Go to Database Access
   - Add new database user
   - Set username and password
   - Grant read/write permissions

5. **Get connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your user password

6. **Configure connection**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/citrusinsight?retryWrites=true&w=majority
   ```

## ☁️ Cloudinary Setup

Cloudinary is used for image hosting and management.

1. **Create account**
   - Sign up at [cloudinary.com](https://cloudinary.com/)
   - Free tier includes 25GB storage and 25GB bandwidth

2. **Get credentials**
   - Go to Dashboard
   - Find "Account Details" section
   - Copy Cloud Name, API Key, and API Secret

3. **Configure environment**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Optional: Configure upload preset**
   - Go to Settings > Upload
   - Create upload preset for citrus images
   - Set folder name, transformations, etc.

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Scan Endpoints

All scan endpoints require authentication (Bearer token in Authorization header).

#### Upload Image and Get Prediction
```http
POST /api/scans/upload
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

image: <file>
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Scan completed successfully",
  "data": {
    "_id": "scan_id",
    "userId": "user_id",
    "imageUrl": "https://res.cloudinary.com/...",
    "predictedDisease": "Citrus Canker",
    "confidence": 95.5,
    "treatment": {
      "description": "Bacterial disease causing lesions...",
      "steps": ["Remove infected parts", "Apply copper bactericides"],
      "prevention": "Use disease-free planting material"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All User Scans
```http
GET /api/scans?page=1&limit=20
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "scans": [
      {
        "_id": "scan_id",
        "imageUrl": "https://res.cloudinary.com/...",
        "predictedDisease": "Citrus Canker",
        "confidence": 95.5,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalScans": 100,
      "hasMore": true
    }
  }
}
```

#### Get Single Scan
```http
GET /api/scans/:id
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "scan_id",
    "userId": "user_id",
    "imageUrl": "https://res.cloudinary.com/...",
    "predictedDisease": "Citrus Canker",
    "confidence": 95.5,
    "treatment": {
      "description": "Bacterial disease...",
      "steps": ["Treatment step 1", "Treatment step 2"],
      "prevention": "Prevention tips"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Delete Scan
```http
DELETE /api/scans/:id
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Scan deleted successfully"
}
```

#### Get Scan Statistics
```http
GET /api/scans/stats
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalScans": 42,
    "memberSince": "2024-01-01T00:00:00.000Z"
  }
}
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "user_id",
    "name": "John Updated",
    "email": "john.new@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How It Works

1. User registers or logs in
2. Server generates JWT token with user ID
3. Client stores token (localStorage/cookie)
4. Client includes token in Authorization header for protected routes
5. Server verifies token and extracts user ID

### Token Format

```
Authorization: Bearer <jwt_token>
```

### Token Expiration

Tokens expire after 24 hours (configurable via `JWT_EXPIRE` env variable).

## 📊 Database Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String,           // User's full name
  email: String,          // Unique email address
  password: String,       // Hashed with bcrypt
  createdAt: Date,        // Registration timestamp
  updatedAt: Date         // Last update timestamp
}
```

**Indexes:**
- `email`: Unique index for fast lookup

**Methods:**
- `comparePassword(password)`: Compare plain password with hash
- `generateAuthToken()`: Generate JWT token

### Scan Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Reference to User
  imageUrl: String,       // Cloudinary URL
  predictedDisease: String, // Disease name
  confidence: Number,     // 0-100
  treatment: String,      // Treatment information
  createdAt: Date,        // Scan timestamp
  updatedAt: Date         // Last update timestamp
}
```

**Indexes:**
- `userId`: For user-specific queries
- `createdAt`: For sorting by date

## 🛡️ Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Configured allowed origins
- **Input Validation**: Validates all user inputs
- **File Upload Limits**: 10MB max file size
- **File Type Validation**: Only JPEG, PNG, WebP allowed
- **Environment Variables**: Sensitive data in .env
- **Error Handling**: No sensitive data in error messages

## 🐛 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input or validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## 🧪 Testing

### Manual Testing with cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Upload Image:**
```bash
curl -X POST http://localhost:5000/api/scans/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

### Testing with Postman

1. Import the API endpoints
2. Set up environment variables (base_url, token)
3. Test each endpoint with various inputs
4. Verify response formats and status codes

## 🚀 Deployment

### Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   # ... set all other variables
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Railway Deployment

1. Connect GitHub repository
2. Select server directory as root
3. Add environment variables in dashboard
4. Deploy automatically on push

### Environment-Specific Configuration

**Production checklist:**
- [ ] Use strong JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (not local)
- [ ] Configure proper CORS_ORIGIN
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## 📝 Scripts

```json
{
  "start": "node server.js",           // Production server
  "dev": "node --watch server.js",     // Development with auto-reload
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 🔍 Troubleshooting

### MongoDB Connection Issues

**Error: MongooseServerSelectionError**
- Check if MongoDB is running
- Verify connection string format
- Check network access in Atlas
- Ensure database user has permissions

### Cloudinary Upload Fails

**Error: Invalid credentials**
- Verify CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET
- Check if credentials are correct in dashboard
- Ensure no extra spaces in .env file

### JWT Token Invalid

**Error: JsonWebTokenError**
- Token may be expired (24h limit)
- JWT_SECRET mismatch between environments
- Token format incorrect (should be "Bearer <token>")

### Hugging Face API Timeout

**Error: Request timeout**
- Model may be loading (cold start)
- Wait 30-60 seconds and retry
- Check if Hugging Face space is active
- Verify HUGGINGFACE_API_URL is correct

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 🤝 Contributing

When contributing to the backend:
1. Follow existing code structure
2. Add error handling for new endpoints
3. Update this README with new endpoints
4. Test thoroughly before committing

---

**For frontend documentation, see [../client/README.md](../client/README.md)**
