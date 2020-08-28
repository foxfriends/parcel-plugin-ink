module.exports = function (bundler) {
  bundler.addAssetType('ink', require.resolve('./InkAsset'));
};
