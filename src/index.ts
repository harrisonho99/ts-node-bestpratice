require('util').inspect.defaultOptions.depth = null;
require = require('esm')(module);
module.exports = require('./main');
