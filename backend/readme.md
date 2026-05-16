Blog App - Backend
Express.js API server for the Blog Application with MongoDB database integration.

🚀 Features
RESTful API - Complete REST API for blog management
Authentication & Authorization - JWT-based auth with role-based access control
User Management - Registration, login, and profile management
Content Management - Article CRUD operations with comments
Admin Panel - Administrative controls for user and content management
Image Upload - Cloudinary integration for profile and article images
Security - Password hashing, CORS, input validation
🛠️ Tech Stack
Node.js - JavaScript runtime
Express.js - Web framework
MongoDB - NoSQL database
Mongoose - MongoDB object modeling
JWT - Authentication tokens
bcryptjs - Password hashing
Cloudinary - Image hosting
CORS - Cross-origin resource sharing
📋 Prerequisites
Node.js (v18+)
MongoDB (v8.0+)
npm or yarn
🚀 Setup
Install Dependencies

npm install
Environment Configuration

cp .env.example .env
Update .env with your configuration:

DB_URL=mongodb://localhost:27017/blog-backend
PORT=4000
JWT_SECRET=your-super-secret-jwt-key
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
Start Server

node server.js
📁 Project Structure
backend/
├── APIs/               # Route handlers
│   ├── AdminAPI.js    # Admin endpoints (/admin-api/*)
│   ├── AuthorAPI.js   # Author endpoints (/author-api/*)
│   ├── UserAPI.js     # User endpoints (/user-api/*)
│   └── CommonAPI.js   # Shared endpoints (/common-api/*)
├── config/            # Configuration files
│   ├── cloudinary.js
│   ├── multer.js
│   └── cloudinaryUpload.js
├── middlewares/       # Custom middleware
│   ├── checkAuthor.js
│   └── verifyToken.js
├── models/           # MongoDB schemas
│   ├── ArticleModel.js
│   └── UserModel.js
├── services/         # Business logic
│   └── authService.js
├── .env              # Environment variables
├── server.js         # Main server file
└── package.json
🔗 API Endpoints
Authentication
POST /common-api/login - User login
GET /common-api/logout - User logout
GET /common-api/check-auth - Check auth status
PUT /common-api/change-password - Change password
User Operations
POST /user-api/users - Register user
GET /user-api/articles - Get articles
GET /user-api/article/:id - Get single article
PUT /user-api/articles - Add comment
Author Operations
POST /author-api/users - Register author
POST /author-api/articles - Create article
GET /author-api/articles/:authorId - Get author's articles
PUT /author-api/articles - Update article
Admin Operations
GET /admin-api/dashboard/stats - Dashboard statistics
GET /admin-api/users - All users
GET /admin-api/articles - All articles
PUT /admin-api/users/block/:userId - Block user
PUT /admin-api/users/unblock/:userId - Unblock user
PUT /admin-api/articles/activate/:articleId - Activate article
PUT /admin-api/articles/deactivate/:articleId - Deactivate article
🗄️ Database Models
User Model
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['USER', 'AUTHOR', 'ADMIN'],
  profileImageUrl: String,
  isActive: Boolean
}
Article Model
{
  author: ObjectId (ref: 'user'),
  title: String,
  category: String,
  content: String,
  comments: [{
    user: ObjectId (ref: 'user'),
    comment: String
  }],
  isArticleActive: Boolean
}
🔐 Authentication
The API uses JWT (JSON Web Tokens) for authentication with HTTP-only cookies for security.

User Roles
USER: Can read articles and comment
AUTHOR: Can create and manage their articles
ADMIN: Full system access and management
📡 Running the Server
# Development
node server.js

# The server will start on http://localhost:4000
🧪 Testing
Test the API endpoints using tools like:

Postman - API testing tool
Thunder Client (VS Code extension)
curl - Command line tool
🚀 Deployment
Set environment variables for production
Ensure MongoDB is accessible
Configure Cloudinary for image uploads
Start the server with node server.js
📝 Notes
The server uses ES6 modules ("type": "module" in package.json)
CORS is configured to allow requests from http://localhost:5173 (frontend)
Passwords are hashed using bcryptjs
File uploads are handled via multer and stored on Cloudinary