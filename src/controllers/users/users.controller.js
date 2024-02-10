/* eslint-disable */

import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { responseType, moduleNames, APP_KEY } from '../../utils/enums.js';
import { errorResponse, successResponse } from '../../utils/helpers.js';
import { userLoginValidation } from './validationSchema.js';
import db from '../../models/index.js';

const { todo_users } = db;

const { isEmpty, isNil } = _;

export const loginUser = async (req, res) => {
    if (isEmpty(req.body) || isNil(req.body)) {
        console.log(
            `${moduleNames[0]} - loginUser. Status:400, Error:Empty req body`
        );
        return errorResponse(res, 400, responseType[3]);
    }

    const validate = userLoginValidation.validate(req.body); // perform incoming request body validation
    if (validate.length > 0) {
        const errorMessage = validate.map((error) => error.message);
        console.log(
            `${
                moduleNames[0]
            } - loginUser. Status:${400}, Error:${JSON.stringify(errorMessage)}`
        );
        return errorResponse(res, 400, responseType[4], errorMessage);
    }
    try {
        const { email, password } = req.body;
        const user = await todo_users.findOne({ where: { email } });
        if (
            !user ||
            !bcrypt.compareSync(password, user?.dataValues?.password)
        ) {
            console.log(
                `${
                    moduleNames[0]
                } - Login. Status:${400}, Error: Invalid credential!`
            );
            return errorResponse(
                res,
                400,
                responseType[4],
                'Invalid credential '
            );
        }

        const token = jwt.sign({ id: user?.dataValues?.id }, APP_KEY, {
            expiresIn: '2h',
        });

        const data = { ...user?.dataValues, token };
        delete data.password;
        delete data.createdAt;
        delete data.updatedAt;

        return successResponse(res, 200, responseType[7], data);
    } catch (error) {
        console.log(
            `${moduleNames[0]} - Login. Status:${JSON.stringify(
                error.statusCode
            )}, Error:${JSON.stringify(error.message)}`
        );
        return errorResponse(res, error.statusCode, error.message);
    }
};
