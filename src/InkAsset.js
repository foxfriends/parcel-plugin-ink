const inklecate = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  type = 'js';

  generate() {
    console.log(this.name);
    return inklecate({ inputFilepath: this.name })
      .then((result) => result.storyContent);
  }
}

module.exports = InkAsset;
