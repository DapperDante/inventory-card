# web-api-ts

It's a boilerplate about web api to facilitate create with express and sequelize on node, but on **Typescript**

## Getting Started

install all dependencies, after execute on your terminal `npm start` (If this your first time or change code on typescript, execute `npm run build` to transpile typescript to javascript) or if you're developing, execute `npm run start:dev`.

## Roles

This project uses a role-based access control (RBAC) system. The available roles are:

| Role   | Description                        |
|--------|------------------------------------|
| Admin  | System administrator.              |
| User   | Standard authenticated user.       |
| Guest  | Guest user (not authenticated).    |

You can add more roles by extending the role classes in [`src/classes/role.class.ts`](src/classes/role.class.ts) and updating the logic in your middleware or controllers as needed.  
Each role is represented by a class, making it easy to customize or add new roles according to your application's requirements.

## Endpoints

These endpoints are provided as examples. If you want to add more, simply create new route and controller files following the existing project structure.

> **Note:** All endpoints start with `/api/`, except for the `/health` endpoint. The `/health` endpoint is special and is used to check the status of the backend server.

| Method | Path         | Payload                                 | Response  | Access      |
| ------ | ------------ | --------------------------------------- | --------- | ----------- |
| POST   | /user/login  | `username`, `password`                  | `token`   | Public      |
| POST   | /user/signup | `username`, `email`, `password`         | `token`   | Public      |
| POST   | /product     | `name`, `description`, `stock`, `price` | `id`      | Admin       |
| PUT    | /product/:id | None                                    | `message` | Admin       |
| DELETE | /product/:id | None                                    | `message` | Admin       |
| GET    | /product/all | None                                    | `{}`      | User/Admin  |

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

Create a `.env` file in the root directory of the project with the following content, and adjust the values according to your environment:

```env
# Application variables
PORT=3000
NODE_ENV=development
CORS_ORIGINS=origins or *
JWT_SECRET=key secret
BCRYPTO_SALT_ROUNDS=10

# Database variables
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=databasename
DB_DIALECT=mysql
```