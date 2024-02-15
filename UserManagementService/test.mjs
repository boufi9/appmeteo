// test.mjs

import assert from 'assert';
import supertest from 'supertest';
import app from './index.mjs';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

describe('User Management Service', () => {
    describe('POST /signup', () => {
        it('should register a new user', async () => {
            const res = await request
                .post('/signup')
                .send({
                    username: 'testuser',
                    password: process.env.password1,
                    email: 'test@example.com'
                });

            assert.strictEqual(res.status, 201);
            assert(res.body.userId);
        });
    });

    describe('POST /login', () => {
        it('should log in an existing user', async () => {
            const res = await request
                .post('/login')
                .send({
                    username: 'testuser',
                    password: process.env.password1
                });

            assert.strictEqual(res.status, 200);
            assert(res.body.token);
            assert(res.body.userId);
        });

        it('should return 404 for non-existing user', async () => {
            const res = await request
                .post('/login')
                .send({
                    username: 'nonexistentuser',
                    password: process.env.password2
                });

            assert.strictEqual(res.status, 404);
        });

        it('should return 401 for invalid credentials', async () => {
            const res = await request
                .post('/login')
                .send({
                    username: 'testuser',
                    password: process.env.password2
                });

            assert.strictEqual(res.status, 401);
        });
    });
});
