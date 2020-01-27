import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.name.firstName,
  uri: faker.internet.url,
  notes: faker.lorem.text,
});
