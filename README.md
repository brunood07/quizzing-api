# API-BOILERPLATE

## Technologies

- Express
- Typescript
- Prisma
- Docker
- Jest
- Supertest
- ESLint
- Prettier
- Swagger

## How to set up this template for a new project

1. Start a new repository using this repository as template
2. Clone the repository
3. Use Yarn or NPM to install the dependencies
4. Create a .env file on root using the .env.example pattern
5. Open the file docker-compose.yml and change the names and database information
6. Set up your database info on .env
7. With the right information on docker-compose.yml run the following commands on your terminal:

```cmd
  ## Initialize the container creation
  docker build -t application-name .

  ## Run the container
  docker run -p 443:443 application-name

  ## Run create the container with the application and database
  docker-compose up or docker-compose up -d
```

6. With docker working you can start to get familiar with the architecture, above this will be a example of the folder structure.

## Folder Structure

```
.- prisma
|- src
   |- @types
   |- config
      |- database
         |- db.ts
   |- modules
      |- accounts
         |- dtos
            |- CreateUserDTO.ts
         |- infra
            |- prisma
               |- repository
                  |- UsersRepository.ts
         |- repositories
            |- in-memory
               |- UserRepositoryInMemory.ts
            |- IUsersRepository.ts
         |- useCases
            |- createUser
               |- CreateUserController.spec.ts
               |- CreateUserController.ts
               |- CreateUserUseCase.spec.ts
               |- CreateUserUseCase.ts
   |- shared
      |- container
         |- index.ts
      |- errors
         |- AppError.ts
      |- infra
         |- http
            |- routes
               |- index.ts
               |- users.routes.ts
            |- app.ts
            |- server.ts
```

## TODO

- Make a better configuration for prisma with integration tests.
- Add Plop to generate modules, routes and usecases.
- Review and rewrite this readme.
