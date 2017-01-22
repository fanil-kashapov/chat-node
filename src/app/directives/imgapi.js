class ImgApiController {

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
        var self = this;
        angular.element(document.querySelector('#fileInput')).on('change', (evt) => {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                let currentModalWindow = self._$uibModal.open({
                    templateUrl: 'src/app/templates/tpl-imgapi.html',
                    controller: 'ImgPopupCtrl as imgPopCtrl',
                    resolve: {
                        img: () => evt.target.result
                    }
                });
                // Handle close of popup
                currentModalWindow.result.then((data) => {
                    this._$scope.$parent.chatCtrl.sendPhoto(data);
                });
            };

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
                    fileReader.onload = function (event) {
                        this.showPictureElement.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                } catch (e) {
                    // Display error message
                    // var error = document.querySelector("#error");
                    // if (error) {
                    console.log('Neither createObjectURL or FileReader are supported');
                    //}
                }
            }
        }
    }


}

ImgApiController.$inject = ['$scope', '$state', '$window', '$uibModal'];

export default class ImgApi {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.controller = ImgApiController;
        this.controllerAs = 'fooz';
        this.bindToController = true;
        this.template = `<div ng-class="{'full-size': fooz.myImage != ''}">
                            <label class="file-upload glyphicon glyphicon-paperclip" title="Sent Photo">
                                <input type="file" id="fileInput"/>
                            </label>
                        </div>`;
    }
}