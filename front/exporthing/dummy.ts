import shortId from 'shortid';
import faker from 'faker';

export const generateDummyUser = (number) => Array(number).fill(null).map(() => ({
    User: {
        id: shortId.generate(),
        nickname: faker.name.firstName(),
        password:'test'
    },
}));
