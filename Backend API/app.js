// core module 
const path = require('path');

// external modules 
const express = require('express');
const bodyParser = require('body-parser');


const { default: mongoose } = require('mongoose');
const cors = require('cors');

const MONGO_URL = "add your db url"

// Local Modules
const rootDir = require('./utils/pathUtils');
const todoItemRouter = require("./routes/todoItemsRouter");
const errorsControlls =require('./controllers/errors');


const app = express();
// set ejs
app.set('view engine','ejs');
app.set('views','views');

 
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.use(express.json());
app.use(cors());

app.use("/api/todo",todoItemRouter);
// adding 404 Page
app.use(errorsControlls.pagenotFound);

 const PORT = 3000;

mongoose.connect(MONGO_URL).then(() =>{
  console.log("Connetced to Mongo");
  app.listen(PORT,()=>{
    console.log(`Server running on address: http://localhost:${PORT}`);
   });

}).catch(err =>{
  console.log('error While connecting to mongoose',err);

});

