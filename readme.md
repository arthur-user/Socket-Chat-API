# Messaging App 💬

A real-time chat application built with **React, Socket.io, Node.js, and Express**. Users are able to register and login, and user data as well as chats and messages are persisted.

## Features 🚀
- **Real-time messaging** with Socket.io
- **Chat management** (create, fetch, and update chats)
- **Online status tracking**
- **Error handling & loading states**

## Tech Stack 🛠️
- **Frontend:** React, Context API
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB

## Setup ⚙️


### **1. Clone the repository**
```sh
git clone https://github.com/arthur-user/Socket-Chat-API
cd messaging-app

Set up the Database

1. MongoDB (using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud DB or a local MongoDB setup):
   - MongoDB Atlas: Create a free MongoDB cluster on Atlas, create a database, and note down the connection string (this will be used in the next step).

   
You need to enter the ATLAS_URI in the `.env` file located in the backend directory.

1. Inside the `back-end` folder, add an `.env` file.
2. Add the following configuration to your `.env` file:
   ```
   ATLAS_URI=your-database-connection-string
   JWT_SECRET=your-jwt-secret-key
### **2. Install required dependencies**
npm install

### **3. Start the servers and make sure they are simultaneously running**

## Backend:

cd back-end
npx nodemon

## Frontend:

cd client
npm run dev

## socket.io

cd socket.io
npx nodemon




## Once the servers are running, the chat app can be accessed through the Vite URL. Swagger documentation is available at:

http://localhost:5000/api-docs


# Swagger tests:

## User Routes (/api/users)
- POST	/api/users/register	Register a new user
- POST	/api/users/login	Login user
- GET	/api/users/get/:userId	Get a specific user by ID
- GET	/api/users/	Get all users

## Chat Routes (/api/chats)
- POST	/api/chats/	Create a new chat
- GET	/api/chats/:userId	Get all chats for a specific user
- GET	/api/chats/find/:firstId/:secondId	Find an existing chat between two users

## Message Routes (/api/messages)

- POST	/api/messages/	Send a new message
- GET	/api/messages/:chatId	Get all messages for a specific chat
