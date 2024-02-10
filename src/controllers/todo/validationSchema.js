import Schema from 'validate';

export const createTodoValidation = new Schema({
    title: {
        type: String,
        required: true,
        message: {
            type: 'Title must be a valid string.',
            required: 'Title  is required.',
        },
    },
    description: {
        type: String,
        required: true,
        message: {
            type: 'Description must be a valid.',
            required: 'Description is required.',
        },
    },
});
