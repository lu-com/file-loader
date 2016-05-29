/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra and UFO ufoqhmdt@gmail.com
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {
  'use strict';
  var exportPath = '';
  this.cacheable && this.cacheable();
  if (!this.emitFile) {
    throw new Error("emitFile is required from module system");
  }
  var query = loaderUtils.parseQuery(this.query);
  var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
    context: query.context || this.options.context,
    content: content,
    regExp: query.regExp
  });
  if (query.relativePath) {
    var relativePath =loaderUtils.interpolateName(this, query.relativePath || "[hash].[ext]", {
      context: query.context || this.options.context,
      content: content,
      regExp: query.regExp
    });
    exportPath = JSON.stringify(relativePath);
  } else {
    exportPath = JSON.stringify(url);
  }
  this.emitFile(url, content);
  return "module.exports = __webpack_public_path__ + " + exportPath + ";";
};

module.exports.raw = true;