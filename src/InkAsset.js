const { inklecate } = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  constructor(...args) {
    super(...args);
    this.type = 'json';
  }

  async parse() {
    return inklecate({ inputFilepath: this.name });
  }

  async generate() {
    const code = JSON.stringify(this.ast.storyContent, null, 2);
    return code;
  }
}

module.exports = InkAsset;
