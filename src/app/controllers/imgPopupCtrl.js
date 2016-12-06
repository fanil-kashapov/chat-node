'use strict';

var moduleName = 'socket.ImgPopupCtrl';

class ImgPopupCtrl {
    constructor ($uibModalInstance, img) {
        this._$uibModalInstance = $uibModalInstance;
        this.img = img;
        this.originImg = img;
        this.myCroppedImage = '';
    }

    gray() {
        var img = new Image();
        var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d');

        img.src = this.img;
        
        var imgW = img.width;
        var imgH = img.height;
        
        canvas.width = imgW;
        canvas.height = imgH;
            
        canvasContext.drawImage(img, 0, 0);
        var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
        
        for(var y = 0; y < imgPixels.height; y++){
            for(var x = 0; x < imgPixels.width; x++){
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg; 
                imgPixels.data[i + 1] = avg; 
                imgPixels.data[i + 2] = avg;
            }
        }
        canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        this.img = canvas.toDataURL();
    }

    sepia() {
        var img = new Image();
        var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d');

        img.src = this.img;

        var imgW = img.width;
        var imgH = img.height;
        
        canvas.width = imgW;
        canvas.height = imgH;

        canvasContext.drawImage(img, 0, 0);
        // get current image data
        var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

        for (var i=0; i < imgPixels.data.length; i+=4) {

            // // change image colors
            // imgPixels.data[i] = r[imgPixels.data[i]];
            // imgPixels.data[i+1] = g[imgPixels.data[i+1]];
            // imgPixels.data[i+2] = b[imgPixels.data[i+2]];

            //convert to grayscale 
            var r = imgPixels.data[i], 
                g = imgPixels.data[i + 1], 
                b = imgPixels.data[i + 2], 
                sepiaR = r * .393 + g * .769 + b * .189, 
                sepiaG = r * .349 + g * .686 + b * .168, 
                sepiaB = r * .272 + g * .534 + b * .131; 
            imgPixels.data[i] = sepiaR; 
            imgPixels.data[i + 1] = sepiaG; 
            imgPixels.data[i + 2] = sepiaB;      
        }

        // put image data back to context
        canvasContext.putImageData(imgPixels, 0, 0);
        this.img = canvas.toDataURL();
    }

    reset() {
        this.img = this.originImg;
    }

    submit() {
        this._$uibModalInstance.close(this.myCroppedImage);
    }
}


angular.module(moduleName, [])
    .controller('ImgPopupCtrl', ImgPopupCtrl);

ImgPopupCtrl.$inject = ['$uibModalInstance', 'img'];

export default moduleName;