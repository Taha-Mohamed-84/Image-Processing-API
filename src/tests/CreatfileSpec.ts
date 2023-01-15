
import path from 'path';
import { Global } from '../global';
import fs from 'fs';
import Createpic from '../Creatfile';


// image file Data
const myimgname: string = 'fjord.jpg';
const myimgwidth: string = '500';
const myimgheight: string = '500';
const srcPath: string = path.resolve(Global.Pathorign + myimgname);
const thumbPath: string = path.resolve(
  Global.Paththumb +
    myimgname.toLowerCase().replace('.jpg', '') +
    '_W' +
    myimgwidth +
    '_H' +
    myimgheight +
    '.jpg'
);

  // delete file if exist
const DeletFile = (input: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(input, function (err, stats) {
      if (err) {
        return resolve('File Not Found');
      } else if (stats) {
        resolve(
          fs.unlink(input, (err2) => {
            if (err2) return console.log(err2);
            //console.log('file deleted successfully');
          })
        );
      }
    });
  });
};


//checking file exist
const CheckExist = (input: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.stat(input, function (err, stats) {
      if (err) {
        return resolve('File Not Found');
      } else if (stats) {
        return resolve('File Found');
      }
    });
  });
};

describe('Test image processing.', () => {
   it('Check delete image file.', async () => {
    // delete image file if exist
    await DeletFile(thumbPath);
    const data =   await CheckExist(thumbPath) 
    expect(data).toEqual('File Not Found');
  });



  it('Check Image creation successfully.', async () => {
// creating resized image
    await Createpic({
      picwidth: parseInt(myimgwidth),
      Picheight: parseInt(myimgheight),
      Picsrc: srcPath,
      picdist: thumbPath
    });
    // checking file created successfully
    const data =   await CheckExist(thumbPath) 
    expect(data).toEqual('File Found');
  });
});
