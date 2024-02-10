import jwt from 'jsonwebtoken';
import { APP_KEY } from './enums.js';

const { sign, verify } = jwt;

// Retrieve all data from the database of particular table.
export const findAll = (table) => table.findAll();

// Create and Save a new data in database
export const create = (table, data) => table.create(data);

// Delete a row with the specified id in the request
/* eslint-disable */
export const deleteById = (table, id) =>
    table.destroy({
        where: { id },
    });

// Delete row by query
export const deleteByQuery = (table, query) =>
    table.destroy({
        where: { ...query },
    });

// Update row by query
export const updateDataByQuery = (table, query, data) =>
    table.update(data, { where: { ...query } });

// Find a single row with an id
export const findById = (table, id) => table.findByPk(id);

// Delete all rows from the database.
export const deleteAll = (table) =>
    table.destroy({ where: {}, truncate: false });

// Find all data using query params
export const findByQuery = (table, query) =>
    table.findAll({ where: { ...query } });

// Update data using ID params
export const updateDataById = (table, id, data) =>
    table.update(data, { where: { id } });

// error response common function
export const errorResponse = (
    res,
    statusCode = 500,
    message = 'Internal server error',
    data = null
) =>
    res.status(statusCode).send({
        status: 0,
        message,
        data,
    });

// success response common function
export const successResponse = (
    res,
    statusCode = 200,
    message = 'Success!',
    data = null
) => {
    console.log('message', message);
    return res.status(statusCode).send({
        status: 1,
        message,
        data,
    });
};

// Generate new JWT token
export const generateJwtToken = (id) => {
    const token = sign({ id }, APP_KEY);
    return token;
};

// Verify JWT token, If it's get error then return null
export const verifyToken = (token) => {
    const decodedData = verify(token, APP_KEY, (err, decoded) => {
        if (err) {
            return null;
        }
        return decoded;
    });
    return decodedData;
};
