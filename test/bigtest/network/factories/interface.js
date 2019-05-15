import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  name: faker.name.firstName,
  uri: faker.internet.url,
  notes: faker.lorem.text,
});
