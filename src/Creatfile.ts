import sharp from 'sharp';

// create image using sharp.
type sharpResizer = {
  picwidth: number;
  Picheight: number;
  Picsrc: string;
  picdist: string;
};

const Createpic = async (Mydata: sharpResizer): Promise<void> => {
  await sharp(Mydata.Picsrc)
    .resize(Mydata.picwidth, Mydata.Picheight)
    .toFormat('jpg')
    .toFile(Mydata.picdist);
};

export default Createpic;
