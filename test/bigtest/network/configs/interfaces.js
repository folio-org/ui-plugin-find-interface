// TODO: use constants from organizations
const configInterfaces = server => {
  server.get('organizations-storage/interfaces', (schema) => {
    return schema.interfaces.all();
  });
};

export default configInterfaces;
