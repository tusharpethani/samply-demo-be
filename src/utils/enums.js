// Define Enums of Response type
const responseType = {
    0: 'Created Successfully!',
    1: 'Updated Successfully!',
    2: 'Deleted Successfully!',
    3: 'Empty request body',
    4: 'Invalid data',
    5: 'Data send successfully!',
    6: 'Fetch Successfully!',
    7: 'Login Successfully!',
};
Object.freeze(responseType);

const moduleNames = {
    0: 'User',
    1: 'Todo',
};
Object.freeze(moduleNames);

const APP_KEY = 'todo-demo';

export { responseType, moduleNames, APP_KEY };
