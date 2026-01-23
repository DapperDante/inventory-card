# API-REST-TS

It's a boilerplate about web api to facilitate create with express and sequelize in node, but in **Typescript**

## Getting Started

The following instructions will help you set up and run the project.

1.- install all dependencies by running `npm install`
2.- create a `.env` [like this](#environment-variables)
3.- start redis server, execute `docker compose up -d` to run redis
4.- start the application by running `npm run start:dev` for development or `npm start` for production

## Modularity

The proyect is divided into modules, in this case, database, redis and server that index component, thanks to we can manage dependencies and components better, moreover we can replace components without affect the main proyect.

![Modules Diagram](assets/modules.drawio.png)

## Roles

This project uses a role-based access control (RBAC) system. The available roles are:

| Role  | Description                     |
| ----- | ------------------------------- |
| Admin | System administrator.           |
| User  | Standard authenticated user.    |
| Guest | Guest user (not authenticated). |

You can add more roles by extending the role classes in [`src/classes/role.class.ts`](src/classes/role.class.ts) and updating the logic in your middleware or controllers as needed.  
Each role is represented by a class, making it easy to customize or add new roles according to your application's requirements.

## Endpoints

These endpoints are provided as examples. If you want to add more, simply create new route and controller files following the existing project structure:

![Endpoints Diagram](assets/flow-endpoint.drawio.png)


> **Note:** All endpoints start with `/api` and `/v1` that helps versioning, except for the `/health` endpoint. The `/health` endpoint is special and is used to check the status of the backend server.

| Method | Path         | Payload                                 | Response  | Access     |
| ------ | ------------ | --------------------------------------- | --------- | ---------- |
| POST   | /user/login  | `username`, `password`                  | `token`   | Public     |
| POST   | /user/signup | `username`, `email`, `password`         | `token`   | Public     |
| POST   | /product     | `name`, `description`, `stock`, `price` | `id`      | Admin      |
| PUT    | /product/:id | None                                    | `message` | Admin      |
| DELETE | /product/:id | None                                    | `message` | Admin      |
| GET    | /product/all | None                                    | `{}`      | User/Admin |

## Project Architecture

The project follows a modular structure to keep code organized and maintainable. Below is an overview of the main folders and their purposes:

```
src/
├── server.ts                 # Entry point to start the server
├── app.ts                    # Main Express app setup
├── routes/                   # API route definitions
│   └── product.route.ts
├── controllers/              # Request handlers
│   └── product.controller.ts
├── respository/              # logic for interacting with the models
│   └── product.repository.ts
├── models/                   # Sequelize models and relations
│   └── product.model.ts
├── middlewares/              # Custom Express middlewares
│   └── role.middleware.ts
├── classes/                  # Contains utility classes and shared logic used across the project
│   └── role.class.ts
├── __tests__/                # Automated tests
│   └── product.test.ts
└── config/                   # Configuration files
```

> **Note:** Some files in the project use the `.type.ts` extension (e.g., `product.route.type.ts`). These files are used to define TypeScript types and interfaces related to their respective modules.

This structure helps to separate concerns and makes the project easier to scale and maintain.

## Dependencies

This project uses several key dependencies to provide essential functionality:

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **sequelize**: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **bcrypt**: Library to help you hash passwords securely.
- **jest**: Delightful JavaScript testing framework for writing and running tests.
- **jsonwebtoken**: Library to generate and verify JSON Web Tokens for authentication and authorization.
- **winston**: Versatile logging library for Node.js, used for logging application events and errors.
- **cors**: Middleware to enable Cross-Origin Resource Sharing, allowing your API to be accessed from different domains.
- **zod**: TypeScript-first schema declaration and validation library.


## Middlewares

This project uses several custom and third-party middlewares to handle authentication, authorization, request parsing, and error handling:

### Route-Specific

- **role**  
   Implements role-based access control (RBAC). It checks the user's role and ensures they have the required permissions to access specific endpoints. You can customize or extend this middleware to support additional roles or permissions.

- **auth**  
   Handles authentication by verifying JSON Web Tokens (JWT) in incoming requests. It ensures that only authenticated users can access protected routes.

- **blacklist**
   Checks if the JWT is in the blacklist, which is useful for logging out users or revoking tokens. If a token is found in the blacklist, the request is denied.

### Global

- **response-time**  
   Evaluate the time for each request.

- **express.json()**  
   Parses incoming JSON request bodies.

- **cors**  
   Enables Cross-Origin Resource Sharing, allowing your API to be accessed from different domains as configured.

- **helmet**  
   Helps secure your Express app by setting various HTTP headers.

- **compression**  
   Compresses response bodies for all requests, improving performance and reducing bandwidth usage.

- **timeoutsMiddleware**
  Sets request and response timeout limits to prevent requests from hanging indefinitely and ensure optimal server performance.

- **error**  
   Centralizes error handling for the API. It catches errors thrown in route handlers or other middleware and sends a consistent error response to the client.

You can find and customize these middlewares in the `src/middlewares/` directory or in the main app setup (`src/app.ts`).  
Feel free to add more middlewares as needed for your application's requirements.

## Database

This project is configured by default to use **MySQL** as the main database for development and production.  
However, since Sequelize is used as the ORM, you can easily switch to other supported databases such as PostgreSQL, MariaDB, SQLite, or Microsoft SQL Server by updating your environment variables in the `.env` file.

**Default (development and production):**

- MySQL

**To use another database:**

1. Install the appropriate database driver (e.g., `pg` for PostgreSQL, `sqlite3` for SQLite).
2. Update the database variables in your `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_DIALECT=mysql # or postgres, mariadb, sqlite, mssql
   ```
3. Restart the application.

> **Note:** Make sure your database server is running and accessible.

## Environment Variables

Create a `.env` file in the root directory of the project with the following content, and adjust the values according to your environment, also you could adjust the optional variables if you need more security:

```env
# Application variables
PORT=3000
NODE_ENV=development
CORS_ORIGINS=origins or *
JWT_SECRET=key secret
BCRYPTO_SALT_ROUNDS=10

# API optional variables
API_RATE_LIMIT=100
API_PAYLOAD_LIMIT=1mb
API_TIMEOUT_RESPONSE=5000
API_TIMEOUT_REQUEST=5000
API_KEEP_ALIVE_TIMEOUT=30000
API_HEADERS_TIMEOUT=30000

# Database variables
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=databasename
DB_DIALECT=mysql #if you work with another database, install its dependency

# Redis variables
REDIS_URL=redis://localhost:6379
```
