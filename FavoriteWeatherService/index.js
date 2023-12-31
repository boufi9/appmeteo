const express = require('express');
const cors = require('cors'); // Import the cors package
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update with your MySQL username
    database: 'weatherapp' // Update with your database name
});

app.post('/favorites', (req, res) => {
    const { userId, location } = req.body;
    const query = 'INSERT INTO favoritelocations (userId, location) VALUES (?, ?)';

    connection.query(query, [userId, location], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error adding favorite location' }); // Correctly formatted as JSON
            return;
        }
        res.status(201).json({ message: 'Favorite location added' }); // Correctly formatted as JSON
    });
});

app.get('/favorites/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM favoritelocations WHERE userId = ?';

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching favorite locations' }); // Correctly formatted as JSON
            return;
        }
        res.status(200).json(results); // Correctly formatted as JSON
    });
});

app.delete('/favorites/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM favoritelocations WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error deleting favorite location' }); // Correctly formatted as JSON
            return;
        }
        res.status(200).json({ message: 'Favorite location deleted' }); // Correctly formatted as JSON
    });
});


app.listen(PORT, () => {
    console.log(`FavoriteWeatherService running on port ${PORT}`);
});