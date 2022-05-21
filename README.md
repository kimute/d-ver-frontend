# Delivery Service App Frontend

Description:

- Created for D-ver(Delivery Service App)
  - See backend:
    [D-ver Backend](https://github.com/kimute/d-ver-backend)
- Create page for Owner | Client | Delivery

### Stack:

<img alt="React" src ="https://img.shields.io/badge/React-v18.0.1-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=61DAFB"/>
<img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-v4.6.4-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=3178C6"/>
<img alt="Tailwind CSS" src ="https://img.shields.io/badge/TailWindCSS-v3.0.24-06B6D4.svg?&style=for-the-badge&logo=TailwindCSS&logoColor=06B6D4"/>

### Use the follow dependencies:

- Apollo Client
  - To connect API(nestJS)
  - apollo client:codegen
    - create schema file like DTO in Backend
    ```
     > npm install -g apollo
     > npm install -g graphql
     > apollo client:codegen mytypes.d.ts --target=typescript
    ```
- React Router
