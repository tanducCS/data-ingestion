import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const tasks = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  type: sample(['Register']), 
  time: faker.datatype.datetime(1893456000000).toISOString(),
  role: sample(['GUEST']),
  status: sample(['Handled', 'Not Handled']),
  
}));

export default tasks;


