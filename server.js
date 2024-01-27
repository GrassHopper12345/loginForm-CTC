const path = require('path');

const express = require('express');
const routes = require('./controllers');

const exphbs = require('express-handlebars');


const PORT = process.env.PORT || 3001;
const app = express();
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});

