# swen755-hmwk4
This is small site that use express.js, passport.js and jwt tokens to provide a site that give employees in a company access to their stored information. The admin user can access all of the users information.
## How to run
`npm i`<br>
`node app.js`

# Architecture diagram

![SushanthNayakArchitectureDiagram drawio](https://github.com/jagrat7/swen755-hmwk4/assets/114597609/8090a3e2-ab48-466c-a5ea-38c875d06031)   


**User Interface**

Sends requests to the Server
Receives responses from the Server

**Server**

Handles requests from the User Interface and generates responses
Uses Passport.js to authenticate users
Uses JWT tokens to authorize users to access certain resources

**Interactions between UI and Server**

UI sends requests to the Server using HTTP
Server receives requests, processes them, and sends responses back to the UI

**Authentication and Authorization**

Passport.js is used to authenticate users when they log in
JWT tokens are used to authorize users to access certain resources
