// testFavoriteWeather.mjs

import assert from 'assert';
import supertest from 'supertest';
import app from './index.mjs';

const request = supertest(app);

describe('Favorite Weather Service', () => {
    let favoriteId; // Variable to store the ID of a favorite location for later tests
    let userId; // Variable to store the ID of a user for later tests

    it('should add a favorite location', async () => {
        // Ensure that the user exists first or create a new user
        const userResponse = await request.post('/users').send({
            username: 'reda', // Replace with an actual username
            // Add other user details as needed
        });

        assert.strictEqual(userResponse.status, 201);

        userId = userResponse.body.id; // Get the user ID

        const response = await request.post('/favorites').send({
            userId: userId, // Use the user ID
            location: 'Rio de Janeiro,BR' // Replace with an actual location
        });

        if (response.status !== 201) {
            console.log(response.status, response.body); // Log the response details
        }

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.message, 'Favorite location added');
        assert.strictEqual(response.body.id, userId); // Ensure the response contains the user ID
        favoriteId = response.body.id; // Save the ID for later tests
    });

    // Add other tests as needed
});
