import express from 'express';
import fileExists from 'file-exists';
import path from 'path';
import Createpic from '../../Creatfile';

import { Global } from '../../global';

const GetImg = express.Router();

let myimgname: string;
let myimgwidth: string;
let myimgheight: string;

// Checking A valid file name.
const Checkimgname = (imgname: string): string | boolean => {
  if (!imgname) {
    return 'Please Enter Image Name.';
  } else if (!imgname.toLowerCase().endsWith('.jpg')) {
    return 'Please Enter a valid extension - (.jpg)';
  } else {
    return true;
  }
};

// Checking A valid file width.
const Checkimgwidth = (imgwidth: string): string | boolean => {
  if (imgwidth) {
    const intwidth: number = parseInt(imgwidth);
    if (!intwidth) {
      return 'Please Enter a valid width';
    } else if (intwidth < 100) {
      return 'Please Enter a valid width Start from 100';
    } else if (intwidth >= 10000) {
      return 'Please Enter a valid width less than 10000';
    } else {
      return true;
    }
  } else {
    return false;
  }
};

// Checking A valid file height.
const Checkimgheight = (imgheight: string): string | boolean => {
  if (imgheight) {
    const intheight: number = parseInt(imgheight);
    if (!intheight) {
      return 'Please Enter a valid height';
    } else if (intheight < 100) {
      return 'Please Enter a valid height Start from 100';
    } else if (intheight >= 10000) {
      return 'Please Enter a valid height less than 10000';
    } else {
      return true;
    }
  } else {
    return false;
  }
};

// get my query parameters
GetImg.get('/', (myreq, myres) => {
  myimgname = myreq.query.filename as string;
  myimgwidth = myreq.query.width as string;
  myimgheight = myreq.query.height as string;

  // Check my query parameters
  const CheckImagename: string | Boolean = Checkimgname(myimgname);
  const CheckImagewidth: string | Boolean = Checkimgwidth(myimgwidth);
  const CheckImageheight: string | Boolean = Checkimgheight(myimgheight);
  if (CheckImagename !== true) {
    myres.send(CheckImagename);
  } else if (CheckImagewidth !== true && CheckImagewidth !== false) {
    myres.send(CheckImagewidth);
  } else if (CheckImageheight !== true && CheckImageheight !== false) {
    myres.send(CheckImageheight);
  } else {
    let qurimgname: string;
    let myfilepath: string = '';

    if (!isNaN(parseInt(myimgwidth)) && !isNaN(parseInt(myimgheight))) {
      qurimgname =
        myimgname.toLowerCase().replace('.jpg', '') +
        '_W' +
        myimgwidth +
        '_H' +
        myimgheight +
        '.jpg';
      myfilepath = path.resolve(Global.Paththumb + qurimgname);
      // check orignal file first
      fileExists(path.resolve(Global.Pathorign + myimgname), (err, exists) => {
        if (exists) {
          fileExists(myfilepath, (err, exists) => {
            if (exists) {
              myres.sendFile(myfilepath);
            } else {
              Createpic({
                picwidth: parseInt(myimgwidth),
                Picheight: parseInt(myimgheight),
                Picsrc: path.resolve(Global.Pathorign + myimgname),
                picdist: myfilepath
              });
              setTimeout(() => {
                myres.sendFile(myfilepath);
              }, 500);
            }
          });
        } else {
          myres.send('Image not Found');
        }
      });
    } else if (myimgwidth && !myimgheight) {
      myres.send('Enter A valid value to parameter height');
    } else if (!myimgwidth && myimgheight) {
      myres.send('Enter A valid value to parameter width');
    } else if (!myimgwidth && !myimgheight) {
      // Check my file exists First
      fileExists(path.resolve(Global.Pathorign + myimgname), (err, exists) => {
        if (exists) {
          myres.sendFile(path.resolve(Global.Pathorign + myimgname));
        } else {
          myres.send('Orignal Image not Found');
        }
      });
    }

    return 'Done';
  }
});

export default {
  GetImg,
  Checkimgname,
  Checkimgwidth,
  Checkimgheight
};
