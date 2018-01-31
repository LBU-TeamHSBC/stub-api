const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');

// Routes
const gitRoutes = require('./routes/gitRoutes');
const udemyRoutes = require('./routes/udemyRoutes');
const lbuRoutes = require('./routes/lbuRoutes');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/git', gitRoutes);
app.use('/udemy', udemyRoutes);
app.use('/lbu', lbuRoutes);

app.use(bodyParser.json());
const port = config.server.port;

app.listen(port, () => {
  console.log('Server listening on port: ' + port);
});