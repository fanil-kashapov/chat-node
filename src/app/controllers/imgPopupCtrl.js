'use strict';

export default class ImgPopupCtrl {
    constructor ($uibModalInstance, img) {
        this._$uibModalInstance = $uibModalInstance;
        this.img = img;
        this.originImg = img;
        this.myCroppedImage = '';
    }

    gray () {
        const img = new Image();

        img.src = this.img;
        const imgW = img.width,
            imgH = img.height,
            canvas = document.createElement('canvas'),
            canvasContext = canvas.getContext('2d');

        canvas.width = imgW;
        canvas.height = imgH;

        canvasContext.drawImage(img, 0, 0);
        let imgPixels = canvasContext.getImageData(0, 0, imgW, imgH),
            y, x, i, avg;

        for (y = 0; y < imgPixels.height; y++)
            for (x = 0; x < imgPixels.width; x++) {
                i = (y * 4) * imgPixels.width + x * 4;
                avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }

        canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        this.img = canvas.toDataURL();
    }

    sepia () {
        const img = new Image();
        img.src = this.img;

        const canvas = document.createElement('canvas'),
            canvasContext = canvas.getContext('2d'),
            imgW = img.width,
            imgH = img.height;

        canvas.width = imgW;
        canvas.height = imgH;

        canvasContext.drawImage(img, 0, 0);
        //  get current image data
        let imgPixels = canvasContext.getImageData(0, 0, imgW, imgH),
            i;

        for (i = 0; i < imgPixels.data.length; i += 4) {
            //  convert to grayscale
            let r = imgPixels.data[i],
                g = imgPixels.data[i + 1],
                b = imgPixels.data[i + 2],
                sepiaR = r * .393 + g * .769 + b * .189,
                sepiaG = r * .349 + g * .686 + b * .168,
                sepiaB = r * .272 + g * .534 + b * .131;

            imgPixels.data[i] = sepiaR;
            imgPixels.data[i + 1] = sepiaG;
            imgPixels.data[i + 2] = sepiaB;
        }

        //  put image data back to context
        canvasContext.putImageData(imgPixels, 0, 0);
        this.img = canvas.toDataURL();
    }

    reset () {
        this.img = this.originImg;
    }

    submit () {
        this._$uibModalInstance.close(this.myCroppedImage);
    }
}
