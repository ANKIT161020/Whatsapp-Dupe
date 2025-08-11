import { Options } from 'swagger-jsdoc';
import config from './index'; // Corrected import path for config

const swaggerDefinition = {
  openapi: '3.0.0', // OpenAPI specification version
  info: {
    title: 'Whatsapp Assignment', // Title of your API
    version: '1.0.0', // Version of your API
    description:
      'This is the API documentation for the Whatsapp Assignment. It outlines all available endpoints, their request/response formats, and authentication requirements.', // Short description
    contact: {
      name: 'Ankit',
      email: 'abhanushali2808@gmail.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`, // Development server URL for /api routes
      description: 'Development Server (API Routes)',
    },
    {
      url: `http://localhost:${config.port}`, // Development server URL for root-level routes (e.g., /webhook)
      description: 'Development Server (Root Routes)',
    },
    // Add production server URL here when deployed
    // {
    //   url: 'https://api.yourproductiondomain.com/api',
    //   description: 'Production Server',
    // },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Bearer token **_only_**',
      },
    },
    // Define reusable schemas for common responses
    responses: {
      BadRequest: {
        description: 'Bad Request (e.g., validation errors)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: {
                  type: 'string',
                  example: 'Validation error: "email" must be a valid email.',
                },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: 'Unauthorized access (e.g., missing or invalid token)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 401 },
                message: {
                  type: 'string',
                  example: 'Unauthorized: Access token is missing or invalid.',
                },
              },
            },
          },
        },
      },
      Forbidden: {
        description: 'Forbidden (e.g., insufficient permissions)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 403 },
                message: {
                  type: 'string',
                  example: 'Forbidden: You do not have permission to perform this action.',
                },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Not Found - /api/users/nonexistentid' },
              },
            },
          },
        },
      },
      Conflict: {
        description: 'Conflict (e.g., resource already exists)',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 409 },
                message: { type: 'string', example: 'Email already taken.' },
              },
            },
          },
        },
      },
      InternalServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 500 },
                message: { type: 'string', example: 'Something went wrong.' },
              },
            },
          },
        },
      },
      // Adding our specific success response structure
      SuccessResponse: {
        description: 'Standard Success Response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string', example: 'success' },
                message: { type: 'string', example: 'Operation successful.' },
                data: { type: 'object', nullable: true } // Data can be any type or null
              }
            }
          }
        }
      }
    },
    schemas: {
      // Define the Message schema based on your Mongoose model
      Message: {
        type: 'object',
        properties: {
          _id: { type: 'string', description: 'MongoDB document ID' },
          id: { type: 'string', description: 'Unique WhatsApp message ID (wamid.XXX)' },
          wa_id: { type: 'string', description: 'WhatsApp ID of the contact' },
          contactName: { type: 'string', description: 'Name of the contact' },
          from: { type: 'string', description: 'Sender\'s phone number' },
          to: { type: 'string', description: 'Receiver\'s phone number' },
          type: { type: 'string', description: 'Type of message (e.g., text, image)' },
          text: {
            type: 'object',
            properties: {
              body: { type: 'string' }
            }
          },
          image: {
            type: 'object',
            properties: {
              mime_type: { type: 'string' },
              sha256: { type: 'string' },
              id: { type: 'string' },
              link: { type: 'string' }
            }
          },
          timestamp: { type: 'string', format: 'date-time' },
          status: { type: 'string', enum: ['sent', 'delivered', 'read'] },
          context: {
            type: 'object',
            properties: {
              message_id: { type: 'string' }
            }
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        },
        required: ['id', 'wa_id', 'from', 'to', 'type', 'timestamp', 'status']
      }
    }
  },
  security: [
    {
      bearerAuth: [], // Apply bearerAuth globally by default, can be overridden per endpoint
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions (JSDoc comments)
  // Ensure these paths correctly point to your source files
  apis: [
    './src/routes/*.ts', // This is where your main endpoint JSDocs are located
    './src/models/*.ts', // For referencing schemas like Message
    // './src/controllers/*.ts', // Only if controllers also have top-level JSDoc for Swagger
  ],
};

export default options;
