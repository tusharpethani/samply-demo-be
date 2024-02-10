/* eslint-disable */

import Schema from 'validate';

// define req body validation
export const userLoginValidation = new Schema({
    email: {
        type: String,
        required: true,
        message: {
            type: 'Email must be a string.',
            required: 'Email is required.',
        },
    },
    password: {
        type: String,
        required: true,
        message: {
            type: 'Password must be a string.',
            required: 'Password is required.',
        },
    },
});
