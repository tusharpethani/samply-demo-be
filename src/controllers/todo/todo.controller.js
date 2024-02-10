/* eslint-disable */

import _ from 'lodash';
import {
    create,
    errorResponse,
    findByQuery,
    successResponse,
    updateDataByQuery,
} from '../../utils/helpers.js';
import { createTodoValidation } from './validationSchema.js';
import { responseType, moduleNames } from '../../utils/enums.js';
import db from '../../models/index.js';

const { isEmpty, isNil } = _;

const { todo_table } = db;

// Get All
export const getAllTodo = async (req, res) => {
    try {
        // const data22 = await create(todo_users, {
        //     email: 'user1@yopmail.com',
        //     name: 'User1',
        //     password: 'Test@1234',
        // });

        const todoList = await findByQuery(todo_table, {
            user_id: req?.user?.id ?? 1,
            is_deleted: 0,
        });
        return successResponse(res, 200, undefined, todoList);
    } catch (error) {
        console.log(
            `${moduleNames[1]} - getAllTodo. Status:${JSON.stringify(
                error.statusCode
            )}, Error:${JSON.stringify(error.message)}`
        );
        return errorResponse(res, error.statusCode, error.message);
    }
};

// Create/Add
export const createTodo = async (req, res) => {
    if (isEmpty(req.body) || isNil(req.body)) {
        console.log(
            `${moduleNames[1]} - createTodo. Status:400, Error:Empty req body`
        );
        return errorResponse(res, 400, responseType[3]);
    }

    const validate = createTodoValidation.validate(req?.body); // perform incoming request body validation
    if (validate.length > 0) {
        const errorMessage = validate.map((error) => error.message);
        console.log(
            `${
                moduleNames[1]
            } - createTodo. Status:${400}, Error:${JSON.stringify(
                errorMessage
            )}`
        );
        return errorResponse(res, 400, responseType[4], errorMessage);
    }

    try {
        const todoData = await create(todo_table, {
            ...req.body,
            user_id: req?.user?.id,
        });
        return successResponse(res, 200, responseType[0], todoData);
    } catch (error) {
        console.log(
            `${moduleNames[1]} - createTodo. Status:${JSON.stringify(
                error.statusCode
            )}, Error:${JSON.stringify(error.message)}`
        );
        return errorResponse(res, error.statusCode, error.message);
    }
};

// Update
export const updateTodo = (req, res) => {
    if (!req.body) {
        console.log(
            `${
                moduleNames[1]
            } - updateTodo. Status:${400}, Error:${JSON.stringify(
                responseType[3]
            )}`
        );
        return errorResponse(res, 400, responseType[3]);
    }

    try {
        updateDataByQuery(
            todo_table,
            { id: req?.params?.id, user_id: req?.user?.id },
            req.body
        )
            .then((num) => {
                if (num.includes(1)) {
                    console.log(
                        `${
                            moduleNames[1]
                        } - updateTodo. Success:${JSON.stringify(num)}`
                    );
                    return successResponse(res, 200, responseType[1], num);
                }
                console.log(
                    `${
                        moduleNames[1]
                    } - updateTodo. Status:${500}, Error:${JSON.stringify(
                        `Cannot update todo with id=${req.params.id}. Maybe record was not found or req.body is empty!`
                    )}`
                );
                return errorResponse(
                    res,
                    undefined,
                    `Cannot update todo with id=${req.params.id}. Maybe record was not found or req.body is empty!`
                );
            })
            .catch((err) => {
                console.log(
                    `${moduleNames[1]} - updateTodo. Status:${JSON.stringify(
                        err.statusCode
                    )}, Error:${JSON.stringify(err.message)}`
                );
                return errorResponse(res, err.statusCode, err.message);
            });
    } catch (error) {
        console.log(
            `${moduleNames[1]} - updateTodo. Status:${JSON.stringify(
                error.statusCode
            )}, Error:${JSON.stringify(error.message)}`
        );
        return errorResponse(res, error.statusCode, error.message);
    }
};
