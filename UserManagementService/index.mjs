// index.mjs

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2';

const app = express();
const PORT = 3001;

// Setup MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'weatherapp'
});

app.use(express.json());
app.use(cors());

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
        connection.query(query, [username, hashedPassword, email], (err, result) => {
            if (err) {
                res.status(500).send('Error registering user');
                return;
            }
            const userId = result.insertId; // Get the auto-generated user ID
            console.log({ userId });
            res.status(201).json({ userId: userId });
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM user WHERE username = ?';
    connection.query(query, [username], async (err, result) => {
        if (err) {
            res.status(500).send('Error logging in');
            return;
        }
        if (result.length > 0) {
            const user = result[0];
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ userId: user.userId }, 'JWT_SECRET', { expiresIn: '24h' });

                // Now, you should correctly retrieve and send the user's ID (userId) along with the token
                const userId = user.userId;
                console.log({ userId });
                res.status(200).json({ token, userId });
            } else {
                res.status  (401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.listen(PORT, () => console.log(`UserManagementService running on port ${PORT}`));

export default app;