const { inklecate } = require('inklecate');
const { readFile } = require('fs').promises;
const { dirname, join } = require('path');
const { Asset } = require('parcel-bundler');

class InkAsset extends Asset {
  constructor(...args) {
    super(...args);
    this.type = 'json';
  }

  parse() {
    return inklecate({ inputFilepath: this.name });
  }

  async collectDependencies() {
    const extractPaths = (base, text) => text
      .split('\n')
      .filter((line) => /^\s*INCLUDE\b/.test(line))
      .map((line) => line.slice(line.indexOf('INCLUDE') + 7).trim())
      .map((file) => join(base, file));
    const dependencies = new Set();
    const paths = extractPaths(dirname(this.name), this.ast.text);
    while (paths.length) {
      const dependency = paths.pop();
      if (dependencies.has(dependency)) continue;
      dependencies.add(dependency);
      const text = await readFile(dependency);
      paths.push(...extractPaths(dirname(dependency), text.toString('utf8')));
    }
    for (const dependency of dependencies) {
      this.addDependency(dependency, { includedInParent: true });
    }
  }

  generate() {
    return JSON.stringify(this.ast.storyContent, null, 2);
  }
}

module.exports = InkAsset;
