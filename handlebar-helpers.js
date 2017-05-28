const Handlebars = require('handlebars');
const fs = require('fs');
const partialsDir = __dirname + '/views/partials';
const filenames = fs.readdirSync(partialsDir);

filenames.forEach(filename => {
    const matches = /^([^.]+).handlebars$/.exec(filename);
    if (!matches) {
        return;
    }

    const name = matches[1];
    const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8');
    Handlebars.registerPartial( name, template );
});

Handlebars.registerHelper('slugify', (component = "") => component.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-').toLowerCase());

Handlebars.registerHelper('extractId', (component = "") => component.split('/suppliers/')[1]);

Handlebars.registerHelper('stars', (score = 0) => {
    const stars = score / 2;
    const isInt = stars % 1 === 0;
    let output = "";

    for (let i = 0; i < Math.floor(stars); i++) {
        output += "<span class='fa fa-star'></span>";
    }

    if (!isInt) {
        output += "<span class='fa fa-star-half-o'></span>"
    }

    return new Handlebars.SafeString(output);
});
