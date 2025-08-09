WhatsApp Web Clone - Backend
This project implements the backend for a WhatsApp Web-like chat interface. Its primary function is to process simulated WhatsApp Business API webhook data, manage conversations and messages in a MongoDB database, and expose API endpoints for a frontend application to consume.

✨ Features
Webhook Payload Processing: Ingests and processes WhatsApp Business API webhook payloads (incoming messages, outgoing messages, status updates like sent, delivered, read).

Conversation Management: Stores and updates message data in MongoDB.

API Endpoints: Provides RESTful APIs for:

Receiving webhook data.

Fetching a summary of all conversations.

Retrieving detailed messages for a specific conversation.

Simulating sending new messages from the application.

Clean Architecture: Backend organized into models, repositories, services, and controllers for maintainability and scalability.

Consistent API Responses: Standardized JSON responses for both success and error scenarios.

Robust Error Handling: Centralized error handling middleware.

API Documentation: Integrated Swagger UI for API exploration (in development).

🚀 Technologies Used
Node.js: JavaScript runtime environment.

Express.js: Web application framework for Node.js.

TypeScript: Superset of JavaScript for type safety.

MongoDB: NoSQL database for storing messages and conversations.

Mongoose: MongoDB object data modeling (ODM) for Node.js.

dotenv: For managing environment variables.

cors: For enabling Cross-Origin Resource Sharing.

helmet: For securing Express apps by setting various HTTP headers.

morgan: HTTP request logger middleware.

compression: Middleware to compress response bodies.

express-mongo-sanitize: To prevent MongoDB operator injection.

express-rate-limit: Basic rate limiting middleware.

winston: Comprehensive logging library.

swagger-jsdoc & swagger-ui-express: For generating and serving API documentation.

uuid: For generating unique IDs for simulated messages.

📂 Project Structure
The backend follows a clean architecture pattern to separate concerns:

my-awesome-api/
├── src/
│ ├── api/ # Aggregates API routes under the /api prefix
│ ├── config/ # App configuration & constants (.env loading, Swagger options)
│ ├── controllers/ # Request handlers (process HTTP requests, delegate to services)
│ ├── middleware/ # Express middleware (rate limiting, error handling, not found)
│ ├── models/ # Mongoose schemas (e.g., Message.ts)
│ ├── repositories/ # Data access layer (direct interaction with MongoDB via Mongoose)
│ ├── routes/ # Route definitions (defines API endpoints)
│ ├── services/ # Business logic layer (orchestrates repositories, contains core logic)
│ ├── utils/ # Helper functions (logger, API response formatter)
│ ├── app.ts # Express app setup (middleware, route mounting)
│ └── server.ts # Server entry point (DB connection, server start, graceful shutdown)
├── .env.example # Environment variables template
├── .env # Your environment variables
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration

⚙️ Setup Instructions
Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager)

MongoDB Atlas Account: A free tier cluster is sufficient. You will need your connection string.

Postman/Insomnia: For testing API endpoints.

Installation
Clone the repository:

git clone <your-repo-url>
cd my-awesome-api # or whatever your backend folder is named

Install dependencies:

npm install

Configure Environment Variables:
Create a .env file in the root of your backend project (my-awesome-api/).
Copy the content from .env.example and fill in your MongoDB connection string.

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/whatsapp?retryWrites=true&w=majority&appName=Whatsapp

# JWT_SECRET=your_jwt_secret_key_for_auth_if_needed

Important: Ensure your MONGODB_URI is correctly formatted. Double-check for any extra @ symbols or typos.

Running the Backend Server
To start the server in development mode (with nodemon for auto-restarts if configured in package.json):

npm run dev

Or, if you prefer to run directly (after TypeScript compilation, or with ts-node):

npx ts-node src/server.ts

You should see console output indicating successful MongoDB connection and server listening.

🌐 API Endpoints
The backend exposes the following RESTful API endpoints:

Base URL: http://localhost:5000 (or your deployed backend URL)

1. Webhook Endpoint
   Purpose: Receives incoming WhatsApp webhook payloads (new messages, status updates).

URL: /webhook

Method: POST

Headers:

Content-Type: application/json

Request Body Example (Incoming Message):

{
"payload_type": "whatsapp_webhook",
"\_id": "conv1-msg1-user-test",
"metaData": {
"entry": [
{
"changes": [
{
"field": "messages",
"value": {
"contacts": [
{
"profile": {
"name": "Ravi Kumar"
},
"wa_id": "919937320320"
}
],
"messages": [
{
"from": "919937320320",
"id": "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggMTIzQURFRjEyMzQ1Njc4OTA=",
"timestamp": "1754400000",
"text": {
"body": "Hi, I’d like to know more about your services."
},
"type": "text"
}
],
"messaging_product": "whatsapp",
"metadata": {
"display_phone_number": "918329446654",
"phone_number_id": "629305560276479"
}
}
}
],
"id": "30164062719905277"
}
]
},
"createdAt": "2025-08-06 12:00:00",
"startedAt": "2025-08-06 12:00:00",
"completedAt": "2025-08-06 12:00:01",
"executed": true
}

Success Response (200 OK):

{
"status": "success",
"message": "Webhook received and processed successfully.",
"data": null
}

2. Get Conversations Summary
   Purpose: Retrieves a list of all unique conversations, typically with the latest message for each.

URL: /api/conversations

Method: GET

Success Response (200 OK):

{
"status": "success",
"message": "Conversations fetched successfully.",
"data": [
{
"_id": "...",
"id": "...",
"wa_id": "919937320320",
"contactName": "Ravi Kumar",
"from": "918329446654",
"to": "629305560276479",
"type": "text",
"text": {
"body": "Hi Ravi! Sure, I’d be happy to help you with that. Could you tell me what you're looking for?"
},
"timestamp": "2025-08-06T08:00:40.000Z",
"status": "read",
"createdAt": "...",
"updatedAt": "..."
}
]
}

3. Get Messages by Conversation ID
   Purpose: Retrieves all messages for a specific conversation identified by its wa_id.

URL: /api/messages/:waId (e.g., /api/messages/919937320320)

Method: GET

Success Response (200 OK):

{
"status": "success",
"message": "Messages for 919937320320 fetched successfully.",
"data": [
{
"_id": "...",
"id": "...",
"wa_id": "919937320320",
"contactName": "Ravi Kumar",
"from": "919937320320",
"to": "629305560276479",
"type": "text",
"text": {
"body": "Hi, I’d like to know more about your services."
},
"timestamp": "2025-08-06T08:00:00.000Z",
"status": "sent",
"createdAt": "...",
"updatedAt": "..."
},
{
"_id": "...",
"id": "...",
"wa_id": "919937320320",
"contactName": "Ravi Kumar",
"from": "918329446654",
"to": "629305560276479",
"type": "text",
"text": {
"body": "Hi Ravi! Sure, I’d be happy to help you with that. Could you tell me what you're looking for?"
},
"timestamp": "2025-08-06T08:00:40.000Z",
"status": "read",
"createdAt": "...",
"updatedAt": "..."
}
]
}

4. Send New Message (Simulated)
   Purpose: Simulates sending a new message from the application's UI. Stores the message in the database.

URL: /api/messages

Method: POST

Headers:

Content-Type: application/json

Request Body:

{
"waId": "919937320320",
"messageBody": "Hello from the app!",
"from": "918329446654",
"to": "919937320320"
}

Success Response (201 Created):

{
"status": "success",
"message": "Message created successfully.",
"data": {
"\_id": "...",
"id": "wamid.APP_SIMULATION.YOUR_GENERATED_UUID",
"wa_id": "919937320320",
"contactName": "You",
"from": "918329446654",
"to": "919937320320",
"type": "text",
"text": {
"body": "Hello from the app!"
},
"timestamp": "2025-08-06T12:30:00.000Z",
"status": "sent",
"createdAt": "...",
"updatedAt": "..."
}
}

🧪 Testing with Postman
You can find a Postman collection with pre-configured requests for these endpoints here:

Postman Collection Public Link: [https://www.postman.com/zoppli-devs/workspace/ankit-s-public-workspace/collection/33751583-df674b3c-d70f-4170-95f6-4c20231d46b5?action=share&creator=33751583&active-environment=33751583-5e84f8db-1000-4839-bcc4-82b59f0bfe96]

Ensure your backend server is running (npm run dev or npx ts-node src/server.ts).

Import the collection into your Postman client using the public link.

Send the POST /webhook requests with the sample data to populate your database.

Test the GET /api/conversations and GET /api/messages/:waId endpoints to retrieve data.

Test the POST /api/messages endpoint to simulate sending a message from the app.

🚀 Deployment
(This section will contain instructions on how to deploy this backend application to a public URL using services like Render, Heroku, or a custom VPS.)

🎯 Evaluation Criteria (from Assignment)
A well-structured backend

Thoughtful assumptions and attention to detail

📝 Notes
No real WhatsApp messages will be sent. This is a backend simulation for webhook data processing and display.

Feel free to make assumptions and complete tasks to the best of your understanding.

Use of AI-based code generation is acceptable as long as you are able to explain it.
