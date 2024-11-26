# JobJourney 
A full-stack job application tracker to help users efficiently manage,
update and track their job applications. 

MongoDB Atlas, Express, Node.js, JWT, React, CSS, Styled-Components, React Query, React Router(loader and action)


## Installation

Clone or download the project

**Install dependencies for both the client and server**

```bash
npm run setup-project
```

**Environment Variables:**

Create a `.env` file in the root directory and add the following:

```bash
NODE_ENV=development
PORT=your_preferred_port
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=onboarding@resend.dev
BASE_URL=http://localhost:5173
```

**Run the application:**

```bash
npm run dev
```