const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphql_schema/schema');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

require("./db/conn");
// allow cross-origin requests
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

//for grapql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));

app.get("/", (req, res) => {
  res.send("homee page");
});

app.listen(port, (req, res) => {
  console.log(`listen ${port}`);
});
