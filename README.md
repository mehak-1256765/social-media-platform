
//Social Media Platform
A feature-rich social media platform built with Node.js, Express, and MongoDB, allowing users to connect, post, and interact.

//Features
Authentication: JWT-based login/register.
Friends Management: Send/accept/reject friend requests.
Feed System: Posts from friends in a personalized feed.
Posts & Comments: Create, delete, and comment on posts.

//Tech Stack
Backend: Node.js, Express, MongoDB.
Tools: bcrypt, dotenv, Mongoose.

//Installation
Clone:
git clone https://github.com/mehak-1256765/social-media-platform.git  
cd social-media-platform 

//Install dependencies:
npm install  
Configure .env:
env

PORT=3000  
MONGO_URI=<your-mongo-uri>  
JWT_SECRET=<your-jwt-secret>  

//Start the server:
npm start  
API Endpoints
Auth: /api/auth/register, /api/auth/login.
Users: /api/users/:userId, /api/users/friend-request.
Posts: /api/posts, /api/posts/:postId.
Feed: /api/feed/:userId.

//Project Structure
plaintext

backend/  
├── config/  
├── models/  
├── routes/  
├── public/  
├── server.js  
├── package.json  
└── README.md  

//License
This project is licensed under the MIT License.
