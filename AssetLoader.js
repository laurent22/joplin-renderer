const { dirname } = require('./pathUtils');
const assets = require('./assets/index');

class AssetLoader {

	constructor(driver) {
		this.driver_ = driver;
	}

	driver() {
		return this.driver_;
	}

	base64decode(s) {
		return this.driver().base64decode(s);
	}

	processAsset(assetInfo) {
		const a = assets[assetInfo.source];

		const destDir = dirname(this.driver().baseDestDir() + '/' + asset.dest);
	}

}

module.exports = AssetLoader;