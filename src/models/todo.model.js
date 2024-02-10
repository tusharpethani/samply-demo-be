/* eslint-disable */

export default (sequelize, Sequelize) => {
    const TodoTable = sequelize.define(
        'todo',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pending', 'deleted', 'completed'),
                defaultValue: 'pending',
                allowNull: false,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
    return TodoTable;
};
