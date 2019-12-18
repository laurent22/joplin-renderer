const fs = require('fs-extra');
const path = require('path');

const rootDir = path.dirname(__dirname);
const outputDir = `${rootDir}/assets`;

async function createJsFromCss(name, filePath) {
	let css = await fs.readFile(filePath, 'utf-8');
	css = css.replace(/\`/g, '\\`');
	const js = `module.exports = \`${css}\`;`;
	const outputPath = `${outputDir}/${name}.css.js`;
	await fs.writeFile(outputPath, js);
}

async function createJsFromBinary(name, filePath) {
	const buffer = await fs.readFile(filePath);
	const js = `module.exports = \`${buffer.toString('base64')}\`;`;
	const outputPath = `${outputDir}/${name}.base64`;
	await fs.writeFile(outputPath, js);
}

async function main() {
	await fs.mkdirp(outputDir);
	await createJsFromCss('katex', `${rootDir}/node_modules/katex/dist/katex.min.css`);
	await createJsFromCss('hljs-atom-one-light', `${rootDir}/node_modules/highlight.js/styles/atom-one-light.css`);
	await createJsFromCss('hljs-atom-one-dark-reasonable', `${rootDir}/node_modules/highlight.js/styles/atom-one-dark-reasonable.css`);

	await createJsFromBinary('KaTeX_Main-Regular.woff2', `${rootDir}/node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2`);
	await createJsFromBinary('KaTeX_Math-Italic.woff2', `${rootDir}/node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff2`);
	await createJsFromBinary('KaTeX_Size1-Regular.woff2', `${rootDir}/node_modules/katex/dist/fonts/KaTeX_Size1-Regular.woff2`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
