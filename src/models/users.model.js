/* eslint-disable */

import bcrypt from 'bcrypt';

export default (sequelize, Sequelize) => {
    const Users = sequelize.define(
        'users',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                get() {
                    return () => this.getDataValue('password');
                },
            },
        },
        {
            timestamps: true,
            hooks: {
                beforeCreate: async (user) => {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password(), salt);
                },
                beforeUpdate: async (user) => {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password(), salt);
                },
            },
        }
    );

    return Users;
};
