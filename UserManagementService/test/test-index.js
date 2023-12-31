// test/test-index.js

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'; // Adjust the path based on your project structure

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Management Service', () => {
  // Test the Signup Endpoint
  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const res = await chai.request(app)
        .post('/signup')
        .send({
          username: 'testuser',
          password: 'testpassword',
          email: 'test@example.com'
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('userId');
    });
  });

  // Test the Login Endpoint
  describe('POST /login', () => {
    it('should login with correct credentials', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('userId');
    });

    it('should return 401 with incorrect password', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        });

      expect(res).to.have.status(401);
    });

    it('should return 404 with unknown username', async () => {
      const res = await chai.request(app)
        .post('/login')
        .send({
          username: 'unknownuser',
          password: 'testpassword'
        });

      expect(res).to.have.status(404);
    });
  });
});
