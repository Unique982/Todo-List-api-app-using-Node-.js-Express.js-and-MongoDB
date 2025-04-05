const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  task:{
    type:String,
    require: true
  },
  date:{
    type:Date,
    require:true
  },
  completed:{
    type:Boolean,
    default:false
  },
},
  {timestamps:true}
);

module.exports =mongoose.model("TodoItem",todoItemSchema);