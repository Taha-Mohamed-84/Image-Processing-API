import express from 'express';
import fs from 'fs';
import showimage from './api/showimage';
import dirwork from 'fs/promises';
import path from 'path';
import { Global } from '../global';

const mainurl = `http://localhost:${Global.port}/imgapp`;
const routes = express.Router();
const mypath: string = path.join(process.cwd(), 'myimage', 'myorign');

//check origin path
if (!fs.existsSync(mypath)) {
  fs.mkdirSync(mypath, { recursive: true });
}

//check thumb path
const mythumbpath: string = path.join(process.cwd(), 'myimage', 'mythumb');
if (!fs.existsSync(mythumbpath)) {
  fs.mkdirSync(mythumbpath, { recursive: true });
}
let MyWelcom: string = 'Welcom To image Processing <br/> ';
MyWelcom = MyWelcom + 'Following images are available in directory <br/>';
// list my available Images
dirwork
  .readdir(mypath, { withFileTypes: true })
  .then((filenames) => {
    for (const filename of filenames) {
      if (filename.name.toLowerCase().endsWith('.jpg')) {
        MyWelcom =
          MyWelcom +
          '<br/> ' +
          '<a href="' +
          mainurl +
          '/Image?filename=' +
          filename.name +
          '">' +
          filename.name +
          '</a>' +
          '<br/> ';
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });

routes.use('/Image', showimage.GetImg);

routes.get('/', (req, res) => {
  res.send(MyWelcom);
  console.log(mypath);
});

export default routes;
