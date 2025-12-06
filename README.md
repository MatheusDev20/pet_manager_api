# Pets Manager API

To easily get access to the endpoints, download and import this Postman [Collection](http://localhost:3000)

You can also access the swagger docs after running the project locally

### Running Locally

Pre requisites

 - Node 
 - NPM Package manager
 - Docker Installed and Docker-Compose CLI

### Enviroment Variables

Make sure to create `.env` file similar to `.env.example` in the root directory, attaching your Database Credentials

### Running start script

Just run 

```bash 
 npm run dev:full
```

This will:  

  - Spin up a local mysql database server container with your credentials and expose on your port **3306**
  - Run a local nest js development server on port **3000**
  - Run migrations and seed the database

After that, make sure to send a request to http://localhost:3000/api/v1/auth/login

with the seeded data to check if everything went well, you will be logged in and a cookie will be setted to use the remaining endpoints.

```json
  {
      "email": "matheusdev20@gmail.com",
      "password": "superSenha@123"
  }
```

### Running tests

```bash  
npm test 
```

Docs Available at http://localhost:3000/api/docs

### Stack & Patterns

  - NestJS. 
  - Prisma
  - MySQL
  - CQS (Command Query Separation) pattern
  - JWT




