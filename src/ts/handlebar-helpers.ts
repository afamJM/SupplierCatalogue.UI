Handlebars.registerHelper('slugify', (component = '') =>
    component.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-').toLowerCase());

Handlebars.registerHelper('extractId', (component = '') => component.split('/suppliers/')[1]);

Handlebars.registerHelper('stars', (score = 0) => {
    const stars = score / 2;
    const isInt = stars % 1 === 0;
    const faStar = '<span class="fa fa-star"></span>';
    let output = faStar.repeat(Math.floor(stars));

    if (!isInt) {
        output += '<span class="fa fa-star-half-o"></span>';
    }

    return new Handlebars.SafeString(output);
});
