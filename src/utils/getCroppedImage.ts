
import { Area } from "react-easy-crop";
export const getCroppedImg = (imageSrc: string, crop: Area): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          return reject(new Error('Canvas context is not available'));
        }
  
        const { width, height } = image;
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
  
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to crop image'));
              return;
            }
            
            const base64Reader = new FileReader();
            base64Reader.readAsDataURL(blob);
            base64Reader.onloadend = () => {
              const base64data = base64Reader.result as string;
              resolve(base64data);
            };
            base64Reader.onerror = (error) => {
              reject(error);
            };
          },
          'image/jpeg',
          1 // quality
        );
      };
  
      image.onerror = (error) => {
        reject(error);
      };
    });
  };



  
  