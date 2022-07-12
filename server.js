const express = require('express');
const api = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
