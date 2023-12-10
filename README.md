# swen755-hmwk4
This is small site that use express.js, passport.js and jwt tokens to provide a site that give employees in a company access to their stored information. The admin user can access all of the users information. The project employees secure session management tactic.

## How to run
`npm i`<br>
`node app.js`

## Secure Session Management Tactic
Authentication failure - This is an architecture breaker because if a program fails to authenticate a user, they would not be able to access the features that are supposed to be available to them. Our program is able to properly authenticate any user present in the user database and provide them with a secure session token.
Authorization failure - This is an architecture breaker because if a program fails to authorize a user, it could lead to two outcomes: a user that is supposed to be able to access a feature may  not be able to access that feature, or a user that is not supposed to access a feature may be able to access something sensitive. We added this architecture breaker into our code, making it so that users with the admin role cannot access the user-list feature they are supposed to be able to access. This also means that the sensitive user-list is accessible by regular users.
Predictable session ID properties, entropy, and length - This is an architechture breaker because it would allow people to be able to bypass the authentication features implemented into a program. If someone can guess the session ID, this renders usernames/ passwords useless and allows access to the program without having credentials. 
Hardcoded cookies - This is an architecture breaker because cookies can contain sensitive data, and they are distinct from user to user. If the hardcoded cookies are discovered, it can be used to gain access to the system without having access to a login. This also reduces system flexibility, as different users using different browsers may not all be able to access the system with hardcoded cookies. 

## Testing - Jest
The Jest framework was used to test the API for Authentication failure and Authorization failure. 
### How to run
`npm test`
