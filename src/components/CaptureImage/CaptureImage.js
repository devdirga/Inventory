import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const CaptureImage = (options) =>
  new Promise((resolve, reject) => {
    ImagePicker.launchCamera(options, async (resCamera) => {

      if (resCamera.didCancel) {
        resolve({ success: false });
        return;
      } else if (resCamera.error) {
        resolve({ success: false });
        return;
      } else if (resCamera.customButton) {
        resolve({ success: false });
        return;
      }

      let rotation = 0;
      if (resCamera.originalRotation === 90) {
        rotation = 90;
      } else if (resCamera.originalRotation === 270) {
        rotation = -90;
      }

      const resResized = await ImageResizer.createResizedImage(
        resCamera.uri,
        resCamera.height,
        resCamera.width,
        'JPEG',
        100,
        rotation,
      );
      const resizedImage = await fetch(resResized.uri);
      const resizedImageBlob = await resizedImage.blob();

      const reader = new FileReader();
      reader.readAsDataURL(resizedImageBlob);
      reader.onload = (e) => {
        resolve({
          success: true,
          fileName: resCamera.fileName,
          logoContent: e.target.result.split(',')[1],
          logoMIME: resCamera.type,
          uri: resResized.uri,
        });
      };
      reader.onerror = (e) => {
        reject(e);
      };
    });
  });

export default CaptureImage;
