const config = require('./config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Routes
const gitRoutes = require('./routes/gitRoutes');
const udemyRoutes = require('./routes/udemyRoutes');
const lbuRoutes = require('./routes/lbuRoutes');
const udacityRoutes = require('./routes/Udacity');


const app = express();

app.set('views', path.join(__dirname, 'views'));                                                                       
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use('/git', gitRoutes);
app.use('/udemy', udemyRoutes);
app.use('/lbu', lbuRoutes);
app.use('/Udacity', udacityRoutes);


app.use(bodyParser.json());
const port = config.server.port;

app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});



