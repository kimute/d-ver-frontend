# Delivery Service App (Frontend)

Description:

- Created for Delivery Service App
- Responsive Web Application
- See backend API:
  [D-liver Backend](https://github.com/kimute/d-ver-backend)

### Stack:

<img alt="React" src ="https://img.shields.io/badge/React-v18.0.1-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=61DAFB"/>
<img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-v4.6.4-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=3178C6"/>
<img alt="Tailwind CSS" src ="https://img.shields.io/badge/TailWindCSS-v3.0.24-06B6D4.svg?&style=for-the-badge&logo=TailwindCSS&logoColor=06B6D4"/>

### Features

User:

- Login /Logout
- create user and Rolls (client, owner, Deliver)
- edit user

Restaurant:

- Create Restaurant
- See Restaurants(Client , Owner)
  - Roll restriction
- Add Dish
- Dashboard (for Owner)
  - Chart for Sales (Victory)
  - Dish List

Order

- real time order
  - subscriptions-transport-ws(apollo)
- deliver locatiron
  - Google Maps API
  - Gocoding API
  - Directions API
    - to show Destination Path

Payment

- [Paddle](https://www.paddle.com)
- Functions: finished
- set up Paddle: (todo)
  - real Business email & web needed

Deploy:(todo)

- Netlify (Front End)
- Heroku (Back End)

### Use the follow dependencies:

- Apollo Client
  - why Aopllo Client?
    - Apollo is faster than Axios or fetch , because it use Cash of Brower memory
    - with Apollo client you don't have to use complicated logic like Redux
  - To connect API(nestJS)
  - apollo client:codegen
    - create schema file like DTO in Backend
    ```
     > npm install -g apollo
     > npm install -g graphql
     > apollo client:codegen mytypes.d.ts --target=typescript
     // after create mutation
     > npm run apollo:codegen
     //result example
     ✔ Loading Apollo Project
     ✔ Generating query files with 'typescript' target - wrote 5 files
    ```
- React Router
- React Helmet
- Victory for chart

## TEST

- Testing React Componets

  - using Jest
  - test point of user's view

- E2E Testing

  - using Cypress

    - How to use

      `npx cypress open`
