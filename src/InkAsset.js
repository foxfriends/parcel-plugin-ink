const { inklecate } = require('inklecate');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  type = 'json';

  generate() {
    return inklecate({ inputFilepath: this.name })
      .then(({ storyContent }) => JSON.stringify(storyContent));
  }
}

module.exports = InkAsset;
