const { inklecate } = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  constructor(...args) {
    super(...args);
    this.type = 'json';
  }

  parse() {
    return inklecate({ inputFilepath: this.name });
  }

  generate() {
    return JSON.stringify(this.ast.storyContent, null, 2);
  }
}

module.exports = InkAsset;
