// testWeather.mjs

import assert from 'assert';
import supertest from 'supertest';
import app from './index.js';

const request = supertest(app);

describe('Weather Data Service', () => {
    it('should get weather data', async () => {
        const response = await request.get('/weather');

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.name, 'London');
    });
});
