export default class Sounds {
    constructor() {
        this.notificationEl = angular.element('#audio-notification');
    }

    notification() {
        this.notificationEl.trigger('play');
    }

    static SoundsFactory() {
        return new Sounds();
    }
}