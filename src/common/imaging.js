import RNFetchBlob from 'rn-fetch-blob';

const Imaging = {
  generateChacheFromBase64: async (base64, fileName) => {
    let tempDir = RNFetchBlob.fs.dirs.CacheDir + '/' + fileName;
    try {
      if (await RNFetchBlob.fs.exists(tempDir)) {
        await RNFetchBlob.fs.unlink(tempDir);
      }
    } catch (err) {
    }

    try {
      let res = await RNFetchBlob.fs.createFile(tempDir, base64, 'base64');
      return res;
    } catch (err) {
    }
    return '';
  },
};

export default Imaging;
