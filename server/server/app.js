const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 4000;

const password = 'bBW1x6XmKXPulDcE';
const nameDb = 'Movies_db';
const url = `mongodb+srv://coldy:${password}@cluster0.2utyf.mongodb.net/${nameDb}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.on('open', (err) =>
  console.log(`Connection has been successfully`)
);

app.listen(PORT, (err) => {
  err ? console.log(error) : console.log('Server has started');
});
