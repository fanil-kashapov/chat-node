import time from '.././src/app/services/time';

describe('Time', function () {

    var t;

    beforeEach(()=>{
        t = time.TimeAgoFactory();
    });

    it('should return message just now', ()=>{
        expect(t.timeAgo(new Date())).toEqual('just now');
    });
});