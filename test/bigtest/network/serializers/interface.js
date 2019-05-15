import BaseSerializer from './base';

const { isArray } = Array;

export default BaseSerializer.extend({
  serialize(...args) {
    const json = BaseSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.interfaces)) {
      return {
        interfaces: json.interfaces,
        totalRecords: json.interfaces.length,
      };
    }

    return json.interfaces;
  },
});
