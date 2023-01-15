// google for :- vscode typescript copy my static folders when build
// get it from:-
//https://stackoverflow.com/questions/56902517/how-can-i-copy-my-static-files-to-my-output-location-in-a-typescript-express-pro

import shell from 'shelljs';

const buildFolder = './myproj/';

//const files = new Set(['.env', 'LICENSE', 'README.md', 'package.json', 'package-lock.json']);
//const folders = new Set(['./src/views', './src/public']);
const folders = new Set(['./myimage']);
// Copy Files
/* files.forEach((file) => {
  shell.cp('-R', file, buildFolder);
});
 */
// Copy Folders
folders.forEach((folder) => {
  shell.cp('-R', folder, buildFolder);
});
