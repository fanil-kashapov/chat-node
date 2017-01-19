'use strict';

class CONSTANT {
    constructor() {
        // TODO: Use thia as angular .const instead
        // You don't need es2015 class for this
        this.FACEBOOK = {
            APP_ID: '1765321937087529',
            APP_KEY: 'c1f8847b1a6db54600119fd8fbe628fb'
        };
    }

    static constantFactory () {
        return new CONSTANT();
    }
}

export default CONSTANT;