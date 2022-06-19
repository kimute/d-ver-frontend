# Delivery Service App (Frontend)

See ▶︎ [D-liber](https://master--sparkly-trifle-c8225d.netlify.app/)

<div>
<img align=top  width="500"  height="270" alt="main-deliver" src="https://user-images.githubusercontent.com/51284158/174308892-402acd5d-b1f6-42bc-8948-6edf5b9198ef.png">
<img align=top  width="200" height="270" alt="main-client" src="https://user-images.githubusercontent.com/51284158/174309111-eee17e69-99d4-4258-89cd-e1f7343643f6.png">
</div>

Description:

- Created for Delivery Service App
- Responsive Web Application
- Real time Order
  - Deliver <-> Restaurant <-> Client
  <div>
  <img aligin=top width="500" height="300" alt="real-time-order-process" src="https://user-images.githubusercontent.com/51284158/174474978-9b285ca2-bdaf-4d29-b702-bd17fb66593e.gif">
  </div>
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

<div>
<img align=top width="200" height="270" alt="auth-process1" src="https://user-images.githubusercontent.com/51284158/174476416-e5b08b28-3f62-4b5e-94f6-a4e4c1e4445b.png">
<img align=top width="200" height="270" alt="auth-process-2" src="https://user-images.githubusercontent.com/51284158/174476419-755f0ffd-0d80-4813-88ad-e6602ebe4c98.png">
<img align=top width="200" height="270"" alt="auth-process3" src="https://user-images.githubusercontent.com/51284158/174476423-43a9c65d-5020-4cf7-ac89-2071e0bbe2aa.png">
<img align=top width="404" height="200" alt="auchprocess-4" src="https://user-images.githubusercontent.com/51284158/174476427-a3f12665-8548-469f-af22-715c7cbc55b6.png">
<img align=top width="200" height="200"" alt="auth-finished" src="https://user-images.githubusercontent.com/51284158/174476430-f839d571-8146-48a4-a6b8-69c2529033e6.png">
</div>

<div>
<img align=top  width="200" height="270" alt="client-see-category" src="https://user-images.githubusercontent.com/51284158/174311544-667338a5-d2ef-4f9a-8cf6-c4a18ce69374.png">
<img align=top  width="200" height="270" alt="clinent-order" src="https://user-images.githubusercontent.com/51284158/174311563-9b84582b-58cf-4e80-9421-3400e6788407.png">
</div>

Restaurant:

- Create Restaurant
- See Restaurants(Client , Owner)
  - Roll restriction
- Add Dish
- Dashboard (for Owner)
  - Chart for Sales (Victory)
  - Dish List
  <div>
  <img width="400" height="270" alt="owner-add-dish" src="https://user-images.githubusercontent.com/51284158/174313429-60e0dde3-caba-4008-ac04-ec9666a14998.png">
  <img width="200" height="270"  alt="owner-add" src="https://user-images.githubusercontent.com/51284158/174313458-6204adaf-4ca1-4751-a814-10af8c054a86.png">
  </div>
  <div>
  <img width="400" height="270"  alt="owner-main" src="https://user-images.githubusercontent.com/51284158/174313122-e9b98698-138b-4ca1-9928-e938ca1bc0c0.png">
  <img width="200" height="270"  alt="owner-mobile" src="https://user-images.githubusercontent.com/51284158/174313143-3613c319-71fe-4cd0-acb3-f822ad248003.png">
  </div>

Order

- real time order
  - subscriptions-transport-ws(apollo)
- deliver locatiron
  - Google Maps API
  - Geocoding API
  - Directions API - to show Destination Path
  <div>
  <img width="200" height="270"  alt="deliver-wait" src="https://user-images.githubusercontent.com/51284158/174313788-f634898a-8cec-4390-8d63-7213f451b29f.png">
  <img width="200" height="270"  alt="deliver-accept-order" src="https://user-images.githubusercontent.com/51284158/174313814-dedb1a3a-0789-40a4-ac39-f2edb52ceec2.png">
  <img width="200" height="270"  alt="deliver-pickup" src="https://user-images.githubusercontent.com/51284158/174313832-5fc243bf-8c55-463a-85cd-c3680d81422a.png">
  </div>

Payment

- [Paddle](https://www.paddle.com)
- Functions: finished
- set up Paddle: (todo)
  - real Business email & web needed

Deploy

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

<img width="500" height="270" alt="diliver-cyper-e2e" src="https://user-images.githubusercontent.com/51284158/174314863-909169ac-5962-4459-8465-5c51c38362c0.png">
