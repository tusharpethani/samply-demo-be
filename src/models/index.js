/* eslint-disable */

import { Sequelize } from 'sequelize';
import users from './users.model.js';
import todoTable from './todo.model.js';
import dbConfig from '../../db.config.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.todo_table = todoTable(sequelize, Sequelize);
db.todo_users = users(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
