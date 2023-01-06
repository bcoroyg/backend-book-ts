import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

/**
 * API Config Info
 */
const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'API Books',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      book: {
        type: 'object',
        required: ['title', 'description', 'file'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          file: { type: 'string', format: 'binary' },
        },
        example: {
          title: 'Book Title',
          description: 'Book Description',
          file: 'select file',
        },
      },
      updateBook: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          file: { type: 'string', format: 'binary' },
        },
        example: {
          title: 'Book Title',
          description: 'Book Description',
          file: 'select file',
        },
      },
      login: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
        example: {
          username: 'admin',
          password: 'admin',
        },
      },
    },
  },
  properties: {
    bookNotFound: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        msg: { type: 'string' },
      },
      example: {
        statusCode: 404,
        msg: 'Book not found!',
      },
    },
    user: {
      type: 'object',
      properties: {
        username: { type: 'string' },
      },
      example: {
        username: 'admin',
      },
    },
  },
  tags: [
    {
      name: 'Books',
      description: 'books endpoint',
    },
    {
      name: 'Search',
      description: 'search endpoint',
    },
    {
      name: 'Auth',
      description: 'auth endpoint',
    },
  ],
  paths: {
    '/books': {
      get: {
        tags: ['Books'],
        summary: 'return all books',
        description: 'Return all books',
        responses: {
          200: {
            description: 'All products are returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/book',
                      },
                    },
                    msg: {
                      type: 'string',
                      example: 'books listed!',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Books'],
        summary: 'create a book',
        description: 'create a book',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          201: {
            description: 'Book created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/book',
                    },
                    msg: {
                      type: 'string',
                      example: 'book created!',
                    },
                  },
                },
              },
            },
          },
        },
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/book',
              },
            },
          },
        },
      },
    },
    '/books/{bookId}': {
      get: {
        tags: ['Books'],
        summary: 'get a book',
        description: 'get a book',
        parameters: [
          {
            name: 'bookId',
            in: 'path',
            description: 'book id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Book found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/book',
                    },
                    msg: {
                      type: 'string',
                      example: 'book retrieved!',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Book not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/properties/bookNotFound',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Books'],
        summary: 'update a book',
        description: 'update a book',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'bookId',
            in: 'path',
            description: 'book id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/updateBook',

              },
            },
          },
        },
        responses: {
          200: {
            description: 'Book updated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/book',
                    },
                    msg: {
                      type: 'string',
                      example: 'book updated!',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Book not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/properties/bookNotFound',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Books'],
        summary: 'delete a book',
        description: 'delete a book',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'bookId',
            in: 'path',
            description: 'book id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Book deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/book',
                    },
                    msg: {
                      type: 'string',
                      example: 'book deleted!',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Book not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/properties/bookNotFound',
                },
              },
            },
          },
        },
      },
    },
    '/search/{title}': {
      get: {
        tags: ['Search'],
        summary: 'search books',
        description: 'search books',
        parameters: [
          {
            name: 'title',
            in: 'path',
            description: 'book title',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Books found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/book',
                      },
                    },
                    msg: {
                      type: 'string',
                      example: 'books found!',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'login user',
        description: 'login user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/login',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'user logged in',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/properties/user',
                },
              },
            },
          },
          400: {
            description: 'password or username incorrect',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    statusCode: {
                      type: 'number',
                      example: 400,
                    },
                    msg: {
                      type: 'string',
                      example: 'Incorrect email and/or password.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const options: OAS3Options = {
  swaggerDefinition,
  apis: ['../controllers/*.ts'],
};

export const openApiConfiguration = swaggerJSDoc(options);
