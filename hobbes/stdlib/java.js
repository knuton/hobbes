// TODO That's cute! How can I make this look less stupid?
exports.lang = typeof require === 'function' ? require('./java/lang-node') : require('./java/lang-web');
