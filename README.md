# Whatsapp Clone

A full-stack project built with Nodejs and Reactjs.

Introducing our WhatsApp Clone, a laid-back messaging app with a touch of novelty. Built using Node.js and React.js, this clone brings the simplicity of WhatsApp with a few cool tweaks. You'll find the classic feel of private chats with friends, and now, effortlessly juggle group conversations too. It's not just a copy-paste job; we've added a bit of our own flavor. With a clean design, a sturdy Node.js backend, and a React.js frontend, it's the no-frills messaging experience you know, but with a casual upgrade. Say hello to a chilled-out version of WhatsApp, where the familiar meets the pleasantly unexpected!

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager installed.

## Getting Started

To get the project up and running, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/ayushmanlakshkar/whatsapp
cd whatsapp
```
### 2. Set Up Backend

- #### 2.1 Navigate to the Backend Folder
```bash
cd server


```
- #### 2.2 Install Dependencies
```bash
npm install
# or
yarn install
```
- #### 2.3 Configure Environment Variables
  Create a .env file in the server folder with the necessary configuration, such as database connection details, API keys, etc.
```env
PORT= your_Port
MONGO_URL = your_database_uri
```
- #### 2.4 Run the Backend Server
  ```bash
  npm start
  # or
  yarn start
  ```
### 3. Set Up Frontend
- #### 3.1 Navigate to the Client Folder
  ```bash
  cd ../client
  

  ```
- #### 3.2 Install Dependencies
  ```bash
  npm install
   # or
  yarn install
  ```
- #### 3.3 Configure Backend URL
  Update the API endpoint in the frontend code if necessary (e.g., API calls in React app).

- #### 3.4 Run the Frontend
   ```bash
   npm start
  # or
  yarn start
   ```

### 4. View the Application
Open your browser and navigate to http://localhost:3000 to see the running application.
  
