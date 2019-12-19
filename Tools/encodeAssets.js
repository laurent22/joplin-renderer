const fs = require('fs-extra');
const path = require('path');
const { basename, filename } = require('../pathUtils');

const rootDir = path.dirname(__dirname);
const outputDir = `${rootDir}/assets`;

async function createJsFromCss(name, filePath) {
	let css = await fs.readFile(filePath, 'utf-8');
	css = css.replace(/\`/g, '\\`');
	const js = `module.exports = \`${css}\`;`;
	const outputPath = `${outputDir}/${name}.css.text.js`;
	await fs.writeFile(outputPath, js);
	return {
		encoding: 'text',
		name: basename(outputPath),
	};
}

async function createJsFromBinary(name, filePath) {
	const buffer = await fs.readFile(filePath);
	const js = `module.exports = \`${buffer.toString('base64')}\`;`;
	const outputPath = `${outputDir}/${name}.base64.js`;
	await fs.writeFile(outputPath, js);
	return {
		encoding: 'base64',
		name: basename(outputPath),
	}
}

async function main() {
	const files = [];

	await fs.mkdirp(outputDir);

	files.push(await createJsFromCss('katex', `${rootDir}/node_modules/katex/dist/katex.min.css`));
	files.push(await createJsFromCss('hljs-atom-one-light', `${rootDir}/node_modules/highlight.js/styles/atom-one-light.css`));
	files.push(await createJsFromCss('hljs-atom-one-dark-reasonable', `${rootDir}/node_modules/highlight.js/styles/atom-one-dark-reasonable.css`));

	files.push(await createJsFromBinary('KaTeX_Main-Regular.woff2', `${rootDir}/node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2`));
	files.push(await createJsFromBinary('KaTeX_Math-Italic.woff2', `${rootDir}/node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff2`));
	files.push(await createJsFromBinary('KaTeX_Size1-Regular.woff2', `${rootDir}/node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff2`));

	const indexJs = [];
	for (const file of files) {
		indexJs.push("'" + filename(file.name) + "': { data: require('./" + file.name + "'), encoding: '" + file.encoding + "' },");
	}
	
	await fs.writeFile( `${outputDir}/index.js`, `module.exports = {\n${indexJs.join('\n')}\n};`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
