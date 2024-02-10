/* eslint-disable */

import db from '../models/index.js';
import { verifyToken, errorResponse } from '../utils/helpers.js';
import { moduleNames } from '../utils/enums.js';

const { todo_users } = db;

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedData = verifyToken(token);
        if (!decodedData) {
            console.log(
                `${
                    moduleNames[0]
                } - authMiddleware. Status:${401}, Error:Unauthorised user!`
            );
            return errorResponse(res, 401, 'Unauthorised user!');
        }

        return todo_users
            .findByPk(decodedData?.id)
            .then((data) => {
                if (data) {
                    req.user = data.dataValues;
                    next();
                } else {
                    console.log(
                        `${
                            moduleNames[0]
                        } - authMiddleware. Status:${404}, Error:User not found!`
                    );
                    return errorResponse(res, 404, 'User not found!');
                }
            })
            .catch((err) => {
                console.log(
                    `${
                        moduleNames[0]
                    } - authMiddleware. Status:${JSON.stringify(
                        err.statusCode
                    )}, Error:${JSON.stringify(err.message)}`
                );
                return errorResponse(res, err.statusCode, err.message);
            });
    } catch (error) {
        console.log(
            `${moduleNames[0]} - authMiddleware. Status:${JSON.stringify(
                error.statusCode
            )}, Error:${JSON.stringify(error.message)}`
        );
        return errorResponse(res, error.statusCode, error.message);
    }
};
