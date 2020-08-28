const { inklecate } = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  type = 'js';

  async parse() {
    console.log(this.name);
    return inklecate({ inputFilepath: this.name });
  }

  async generate() {
    const code = `module.exports = ${JSON.stringify(this.ast.storyContent, null, 2)}`;
    console.log(code);
    return code;
  }
}

module.exports = InkAsset;
