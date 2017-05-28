import * as express from 'express';
import * as exphbs from 'express-handlebars';
import * as path from 'path';
import routes from './routes';

const port = process.env.PORT || 80;
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/', routes);

require('./handlebar-helpers');

app.listen(port);
console.log(`App is running on port ${port}`);
