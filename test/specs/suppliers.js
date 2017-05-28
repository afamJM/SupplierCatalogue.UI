const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should;

describe('Supplier Catalogue Results Page', function () {

    it('should have the right title', function () {
        browser.url(`http://localhost:${process.env.PORT}/suppliers`);
        const title = browser.getTitle();
        assert.equal(title, 'Handlebars App');
    });

    it('should have results', function () {
        browser.url(`http://localhost:${process.env.PORT}/suppliers`);
        const results = $$('#results .card');
        expect(results).to.have.length.above(0);
    });

    it('should have a dropdown list containing the categories', function () {
        browser.url(`http://localhost:${process.env.PORT}/suppliers`);
        browser.isVisible('#category');
        const options = $$('#category option');
        expect(options).to.have.length.above(0);
    });

    it('should should filter the results upon selecting a category', function () {
        browser.url(`http://localhost:${process.env.PORT}/suppliers`);
        const category = $$('#category option')[4];
        const categoryText = category.getText();
        const categoryValue = category.getValue().toLowerCase();
        browser.selectByValue('#category', categoryValue);
        const results = $$('#results .card');
        expect(results).to.have.length.above(0);
        const resultCategory = results[0].$('.card__signpost').getText().toLowerCase();
        assert.equal(resultCategory, categoryValue);
        const url = browser.getUrl();
        assert.equal(url, `http://localhost:${process.env.PORT}/suppliers/${categoryValue}`);
    });

    it('should show the results from the previous category when going back', function () {
        browser.url(`http://localhost:${process.env.PORT}/suppliers`);
        const category = $$('#category option')[4];
        const categoryText = category.getText();
        const categoryValue = category.getValue().toLowerCase();
        browser.selectByValue('#category', categoryValue);
        browser.selectByIndex('#category', 5);
        browser.back();
        const results = $$('#results .card');
        expect(results).to.have.length.above(0);
        const resultCategory = results[0].$('.card__signpost').getText().toLowerCase();
        assert.equal(resultCategory, categoryValue);
        const url = browser.getUrl();
        assert.equal(url, `http://localhost:${process.env.PORT}/suppliers/${categoryValue}`);
    });
});
