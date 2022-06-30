const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs');

module.exports = {
  format: messages => messages,
  compile: function (messages) {
    const result = {};
    const isTransExisted = fs.existsSync(path.resolve(argv['out-file']));

    for (const [key, message] of Object.entries(messages)) {
      if (isTransExisted) {
        const oldTrans = require(path.resolve(argv['out-file']));
        if (oldTrans[key]) {
          result[key] = oldTrans[key];
        } else {
          result[key] = message.defaultMessage;
        }
      } else {
        result[key] = message.defaultMessage;
      }
    }

    return result;
  },
};
