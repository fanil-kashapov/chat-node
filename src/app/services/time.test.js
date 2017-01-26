import time from './time';

describe('Time', function () {

    var t;

    beforeEach(()=>{
        t = time.TimeAgoFactory();
    });

    let date = new Date();
    it('should return message "just now"', ()=>{
        expect(t.timeAgo(date)).toEqual('just now');
    });

    let leastMinute = new Date();
    leastMinute.setSeconds(leastMinute.getSeconds() - 10);
    it('should return message "least one minute"', ()=>{
        expect(t.timeAgo(leastMinute)).toEqual('least one minute');
    });

    let minuteAgo = new Date();
    minuteAgo.setMinutes(minuteAgo.getMinutes() - 1)
    it('should return message "one minute ago"', ()=>{
        expect(t.timeAgo(minuteAgo)).toEqual('one minute ago');
    });

    let twoMinutesAgo = new Date();
    twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2)
    it('should return message "2 minutes ago"', ()=>{
        expect(t.timeAgo(twoMinutesAgo)).toEqual('2 minutes ago');
    });

    let tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10)
    it('should return message "10 minutes ago"', ()=>{
        expect(t.timeAgo(tenMinutesAgo)).toEqual('10 minutes ago');
    });

    let hourAgo = new Date();
    hourAgo.setHours(hourAgo.getHours() - 1)
    it('should return message "an hour ago"', ()=>{
        expect(t.timeAgo(hourAgo)).toEqual('an hour ago');
    });

    let twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2)
    it('should return message "2 hrs ago"', ()=>{
        expect(t.timeAgo(twoHoursAgo)).toEqual('2 hrs ago');
    });

    let tenHoursAgo = new Date();
    tenHoursAgo.setHours(tenHoursAgo.getHours() - 10)
    it('should return message "10 hrs ago"', ()=>{
        expect(t.timeAgo(tenHoursAgo)).toEqual('10 hrs ago');
    });

    let dayAgo = new Date();
    dayAgo.setHours(dayAgo.getHours() - 24)
    it('should return message "yesterday"', ()=>{
        expect(t.timeAgo(dayAgo)).toEqual('yesterday');
    });

    let twoDaysAgo = new Date();
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48)
    it('should return message "2 days ago"', ()=>{
        expect(t.timeAgo(twoDaysAgo)).toEqual('2 days ago');
    });

    let weakAgo = new Date();
    weakAgo.setHours(weakAgo.getHours() - 168)
    it('should return message "a week ago"', ()=>{
        expect(t.timeAgo(weakAgo)).toEqual('a week ago');
    });

    let weaksAgo = new Date();
    weaksAgo.setHours(weaksAgo.getHours() - 336)
    it('should return message "2 weeks ago"', ()=>{
        expect(t.timeAgo(weaksAgo)).toEqual('2 weeks ago');
    });

    let monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    it('should return message "a month ago"', ()=>{
        expect(t.timeAgo(monthAgo)).toEqual('a month ago');
    });

    let twoMonthAgo = new Date();
    twoMonthAgo.setMonth(twoMonthAgo.getMonth() - 2)
    it('should return message "2 months ago"', ()=>{
        expect(t.timeAgo(twoMonthAgo)).toEqual('2 months ago');
    });

    let yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1)
    it('should return message "one year ago"', ()=>{
        expect(t.timeAgo(yearAgo)).toEqual('one year ago');
    });

    let yearsAgo = new Date();
    yearsAgo.setFullYear(yearsAgo.getFullYear() - 2)
    it('should return message "2 years ago"', ()=>{
        expect(t.timeAgo(yearsAgo)).toEqual('2 years ago');
    });
    //one year ago
});