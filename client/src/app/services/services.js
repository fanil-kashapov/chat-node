'use strict';

var moduleName = 'chatApp.servicess';
angular.module(moduleName, []);

class TimeAgo {
    constructor() {}

    static timeAgo(date) {
        let messageTime = new Date(date),
            cur_time = new Date(),
            time_elapsed = (cur_time - messageTime) / 1000,
            $seconds = time_elapsed,
            $minutes = Math.round(time_elapsed / 60),
            $hours = Math.round(time_elapsed / 3600),
            $days = Math.round(time_elapsed / 86400),
            $weeks = Math.round(time_elapsed / 604800),
            $months = Math.round(time_elapsed / 2600640),
            $years = Math.round(time_elapsed / 31207680);

        // $Seconds
        if ($seconds <= 10) {
            return 'just now';
        } else if ($minutes == 0) {
            return 'least one minute';
        }
        //$Minutes
        else if ($minutes <= 60) {
            if ($minutes == 1) {
                return 'one minute ago';
            } else {
                return $minutes + ' minutes ago';
            }
        }
        //$Hours
        else if ($hours <= 24) {
            if ($hours == 1) {
                return 'an hour ago';
            } else {
                return $hours + ' hrs ago';
            }
        }
        //$Days
        else if ($days <= 7) {
            if ($days == 1) {
                return 'yesterday';
            } else {
                return $days + ' $days ago';
            }
        }
        //$Weeks
        else if ($weeks <= 4.3) {
            if ($weeks == 1) {
                return 'a week ago';
            } else {
                return $weeks + ' $weeks ago';
            }
        }
        //$Months
        else if ($months <= 12) {
            if ($months == 1) {
                return 'a month ago';
            } else {
                return $months + ' $months ago';
            }
        }
        //$Years
        else {
            if ($years == 1) {
                return 'one year ago';
            } else {
                return $years + ' $years ago';
            }
        }
    }

    static TimeAgoFactory() {
        return new TimeAgo();
    }
}

angular.module(moduleName)
    .factory('TimeAgo', TimeAgo.TimeAgoFactory);

class Sounds {
    constructor() {
        this.notificationEl = angular.element('#audio-notification');
    }

    Notification() {
        this.notificationEl.trigger('play');
    }

    static SoundsFactory() {
        return new Sounds();
    }
}

angular.module(moduleName)
    .factory('Sounds', Sounds.SoundsFactory);

export default moduleName;