const { inklecate } = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  constructor(...args) {
    super(...args);
    this.type = 'js';
  }

  async parse() {
    return inklecate({ inputFilepath: this.name });
  }

  async generate() {
    const js = `module.exports = ${JSON.stringify(this.ast.storyContent, null, 2)}`;
    return { js };
  }
}

module.exports = InkAsset;
