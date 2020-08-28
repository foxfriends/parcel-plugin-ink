const { inklecate } = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  type = 'js';

  parse() {
    return inklecate({ inputFilepath: this.name });
  }

  generate() {
    return `module.exports = ${JSON.stringify(this.ast.storyContent, null, 2)}`;
  }
}

module.exports = InkAsset;
