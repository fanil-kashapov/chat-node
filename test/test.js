import Foo from '../../src/services/services.js';

describe('Time', function () {

    let time;

    beforeEach(()=>{
        time = new Foo();
    });

    it('should return Do Something when calling doSomething', ()=>{
        expect(foo.doSomething()).toEqual('Do Something');
    });
});