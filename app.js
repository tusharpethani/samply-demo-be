/* eslint-disable */

import express from 'express';
import cors from 'cors';
import db from './src/models/index.js';
import { router } from './src/routes/index.js';

const app = express();

// Synchronize the database
db.sequelize
    .sync({ alter: false })
    .then(() => {
        console.log('Drop and re-sync db.');
    })
    .catch((e) => {
        console.log('Database connection error:', e);
    });

const allowedOrigins = [];

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error('Not allowed by CORS'));
//             }
//         },
//     })
// );

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', async (_, res) => {
    res.json({ message: `Welcome to Tushar's node-application.` });
});

app.use('/api', router);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.log(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.log(`Unhandled Promise Rejection: ${reason}`);
});

// set port, listen for requests
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
