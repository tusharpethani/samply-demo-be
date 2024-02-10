/* eslint-disable */

export default {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    PORT: 3306,
    DB: 'todo_demo',

    dialect: 'mysql',
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000,
    },
};
