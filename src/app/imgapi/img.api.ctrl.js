export default class ImgApiController {

    constructor ($scope, $state, $window, $uibModal) {
        this._$scope = $scope;
        this._$state = $state;
        this._$window = $window;
        this._$uibModal = $uibModal;

        this.showPictureElement = angular.element('#show-picture');
        this.foo = 'foo!!!';
        this.myImage = '';
        this.myCroppedImage = '';

        this.addEventListener();
    }

    addEventListener () {

        angular.element(document.querySelector('#fileInput')).on('change', (evt) => {
            let file = evt.currentTarget.files[0],
                reader = new FileReader();
            reader.onload = ((evt) => {
                let currentModalWindow = this._$uibModal.open({
                    templateUrl: 'src/app/imgapi/img.popup.tpl.html',
                    controller: 'ImgPopupCtrl as imgPopCtrl',
                    resolve: {
                        img: () => evt.target.result
                    }
                });
                // Handle close of popup
                currentModalWindow.result.then(((data) => {
                    this._$scope.$parent.chatCtrl.sendPhoto(data);
                }).bind(this));
            }).bind(this);

            reader.readAsDataURL(file);
        });
    }

    fSelect (event) {
        // Get a reference to the taken picture or chosen file
        let files = event.target.files,
            file;
        if (files && files.length > 0) {
            file = files[0];
            try {
                // Get window.URL object
                let URL = window.URL || window.webkitURL;

                // Create ObjectURL
                let imgURL = URL.createObjectURL(file);

                // Set img src to ObjectURL
                this.showPictureElement.src = imgURL;

                // Revoke ObjectURL after imagehas loaded
                this.showPictureElement.onload = () => URL.revokeObjectURL(imgURL);
            } catch (e) {
                try {
                    // Fallback if createObjectURL is not supported
                    let fileReader = new FileReader();
                    fileReader.onload = (event) => {
                        this.showPictureElement.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                } catch (e) {
                    console.log('Neither createObjectURL or FileReader are supported');
                }
            }
        }
    }
}