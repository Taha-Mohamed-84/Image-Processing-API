import showimage from '../../../routes/api/showimage';

describe('Test Image Parameters', () => {
  it('Check Image Right file Name Without no extension', async () => {
    const data = await showimage.Checkimgname('fjord');
    expect(data).toEqual('Please Enter a valid extension - (.jpg)');
  });

  it('Check Image Wrong file Name With extension', async () => {
    const data = await showimage.Checkimgname('WrongFileName.jpg');
    expect(data).toBeTrue;
  });

  it('Check Image Wrong file width less than 100', async () => {
    const data = await showimage.Checkimgwidth('-1');
    expect(data).toEqual('Please Enter a valid width Start from 100');
  });

  it('Check Image Wrong file String width', async () => {
    const data = await showimage.Checkimgwidth('ten');
    expect(data).toEqual('Please Enter a valid width');
  });

  it('Check Image Wrong file height less than 100', async () => {
    const data = await showimage.Checkimgheight('-1');
    expect(data).toEqual('Please Enter a valid height Start from 100');
  });

  it('Check Image Wrong file String height', async () => {
    const data = await showimage.Checkimgheight('ten');
    expect(data).toEqual('Please Enter a valid height');
  });
});
