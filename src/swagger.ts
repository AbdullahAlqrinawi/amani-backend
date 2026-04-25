export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Amani Backend API',
    version: '1.0.0',
    description: 'Backend API for Amani child safety reporting system',
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
      description: 'Local development server',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Health check APIs',
    },
    {
      name: 'Admin',
      description: 'Admin authentication APIs',
    },
    {
      name: 'Reports',
      description: 'Child reports and chat APIs',
    },
    {
      name: 'Dashboard',
      description: 'Dashboard statistics APIs',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      AdminLoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'admin@amani.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
      CreateReportInput: {
        type: 'object',
        required: ['anonymousUserId', 'category', 'initialMessage'],
        properties: {
          anonymousUserId: {
            type: 'string',
            example: 'device-123',
          },
          category: {
            type: 'string',
            example: 'photo',
          },
          ageGroup: {
            type: 'string',
            example: '10-12',
          },
          language: {
            type: 'string',
            enum: ['ar', 'en'],
            example: 'ar',
          },
          initialMessage: {
            type: 'string',
            example: 'شخص طلب مني صورتي',
          },
        },
      },
      CreateMessageInput: {
        type: 'object',
        required: ['message'],
        properties: {
          sender: {
            type: 'string',
            enum: ['CHILD', 'ADMIN'],
            example: 'CHILD',
          },
          message: {
            type: 'string',
            example: 'هذه رسالة جديدة',
          },
        },
      },
      UpdateStatusInput: {
        type: 'object',
        required: ['status'],
        properties: {
          status: {
            type: 'string',
            enum: ['NEW', 'OPEN', 'IN_REVIEW', 'RESOLVED', 'ESCALATED'],
            example: 'IN_REVIEW',
          },
        },
      },
      UpdatePriorityInput: {
        type: 'object',
        required: ['priority'],
        properties: {
          priority: {
            type: 'string',
            enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
            example: 'HIGH',
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API health',
        responses: {
          200: {
            description: 'API is running',
          },
        },
      },
    },

    '/admin/login': {
      post: {
        tags: ['Admin'],
        summary: 'Admin login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AdminLoginInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
          },
          400: {
            description: 'Validation error',
          },
          500: {
            description: 'Invalid email or password',
          },
        },
      },
    },

    '/admin/me': {
      get: {
        tags: ['Admin'],
        summary: 'Get current admin profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Admin profile',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },

    '/reports': {
      post: {
        tags: ['Reports'],
        summary: 'Create a new report from child app',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateReportInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Report created successfully',
          },
          400: {
            description: 'Validation error',
          },
        },
      },
      get: {
        tags: ['Reports'],
        summary: 'List reports for dashboard',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'status',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['NEW', 'OPEN', 'IN_REVIEW', 'RESOLVED', 'ESCALATED'],
            },
          },
          {
            name: 'priority',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
            },
          },
          {
            name: 'category',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Reports fetched successfully',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },

    '/reports/{caseCode}': {
      get: {
        tags: ['Reports'],
        summary: 'Get report by case code',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'caseCode',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: 'AMN-123456',
            },
          },
        ],
        responses: {
          200: {
            description: 'Report fetched successfully',
          },
          404: {
            description: 'Report not found',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },

    '/reports/{caseCode}/messages': {
      get: {
        tags: ['Reports'],
        summary: 'Get report messages',
        parameters: [
          {
            name: 'caseCode',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: 'AMN-123456',
            },
          },
        ],
        responses: {
          200: {
            description: 'Messages fetched successfully',
          },
          404: {
            description: 'Report not found',
          },
        },
      },
      post: {
        tags: ['Reports'],
        summary: 'Add message to report chat',
        parameters: [
          {
            name: 'caseCode',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: 'AMN-123456',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateMessageInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Message added successfully',
          },
          404: {
            description: 'Report not found',
          },
        },
      },
    },

    '/reports/{caseCode}/status': {
      patch: {
        tags: ['Reports'],
        summary: 'Update report status',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'caseCode',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: 'AMN-123456',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateStatusInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Report status updated successfully',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },

    '/reports/{caseCode}/priority': {
      patch: {
        tags: ['Reports'],
        summary: 'Update report priority',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'caseCode',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              example: 'AMN-123456',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdatePriorityInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Report priority updated successfully',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },

    '/dashboard/stats': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get dashboard statistics',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Dashboard stats fetched successfully',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
};