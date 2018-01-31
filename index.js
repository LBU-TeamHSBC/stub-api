const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');

// Routes
const baseRoutes = require('./routes/baseRoutes');
const gitRoutes = require('./routes/gitRoutes');
const udemyRoutes = require('./routes/udemyRoutes');
const lbuRoutes = require('./routes/lbuRoutes');

const app = express();

// app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

// app.use('/', baseRoutes)
app.use('/git', gitRoutes);
app.use('/udemy', udemyRoutes);
app.use('/lbu', lbuRoutes);

app.use(bodyParser.json());
const port = config.server.port;

app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});