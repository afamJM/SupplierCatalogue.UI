const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Supplier Catalogue Homepage', function () {

    it('should have the right title', function () {
        browser.url(`http://localhost:${process.env.PORT}`);
        const title = browser.getTitle();
        assert.equal(title, 'Handlebars App');
    });

    it('should redirect to the suppliers results page', function () {
        browser.url(`http://localhost:${process.env.PORT}`);
        const url = browser.getUrl();
        assert.equal(url, `http://localhost:${process.env.PORT}/suppliers`);
    });
});
