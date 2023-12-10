// import request from 'supertest';
// import app from './app'; // Import your Express app
// const app = require('./app')
const { app, server } = require('./app');
const request = require("supertest");


beforeAll(async () => {

    await new Promise((resolve) => server.on('listening', resolve));
  });

describe('Authorization Failure Test', () => {
  it('should not allow non-admin users to access /users', async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({ username: 'user', password: 'password' });
    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });
});  

describe('Authentication Test', () => {
    it('should authenticate user and allow access to protected route', async () => {
      const loginResponse = await request(app)
        .post('/login')
        .send({ username: 'user', password: 'password' });

      console.log(loginResponse);

      expect(loginResponse.statusCode).toBe(200); 
      expect(loginResponse.body.token).toBeDefined(); 
  
      const token = loginResponse.body.token;
  
      const protectedResponse = await request(app)
        .get('/current-user')
        .set('Authorization', `Bearer ${token}`);
  
      expect(protectedResponse.statusCode).toBe(200); 
      expect(protectedResponse.body.username).toBe('user'); 
    });
  });