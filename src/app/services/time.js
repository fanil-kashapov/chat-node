export default class TimeAgo {
    timeAgo (date) {
        const messageTime = new Date(date),
            curTime = new Date(),
            timeElapsed = (curTime - messageTime) / 1000,
            $seconds = timeElapsed,
            $minutes = Math.round(timeElapsed / 60),
            $hours = Math.round(timeElapsed / 3600),
            $days = Math.round(timeElapsed / 86400),
            $weeks = Math.round(timeElapsed / 604800 * 10) / 10,
            $months = Math.round(timeElapsed / 2600640),
            $years = Math.round(timeElapsed / 31207680);

        switch (true) {
            //  $Seconds
            case ($seconds <= 10):
                return 'just now';
            case ($minutes === 0):
                return 'least one minute';

            //  $Minutes
            case ($minutes < 60):
                if ($minutes === 1)
                    return 'one minute ago';
                return `${$minutes} minutes ago`;

            //  $Hours
            case ($hours < 24):
                if ($hours === 1)
                    return 'an hour ago';
                return `${$hours} hrs ago`;

            //  $Days
            case ($days < 7):
                if ($days === 1)
                    return 'yesterday';
                return `${$days} +  days ago`;

            //  $Weeks
            case ($weeks < 4.2):
                if ($weeks === 1)
                    return 'a week ago';
                return `${$weeks} weeks ago`;

            //$Months
            case ($months < 12):
                if ($months === 1)
                    return 'a month ago';
                return `${$months} months ago`;

            //$Years
            case ($years === 1):
                return 'one year ago';
            default:
                return `${$years} years ago`;
        }
    }

    static TimeAgoFactory () {
        return new TimeAgo();
    }
}

