import Fs from 'node:fs/promises';

const sourceDistinations = [
	['./src/advance-component.css', './dist/advance-component.css'],
	['./src/advance-component.svg', './dist/advance-component.svg']
];

const promises = [];
for (const [source, distination] of sourceDistinations) {
	const promise = Fs.copyFile(source, distination)
		.then(() => void console.log(source, '->', distination), (error) => void console.error(error));
	promises.push(promise);
}
Promise.all(promises)
	.then(() => void console.log('Complete'), (error) => void console.error(error));
