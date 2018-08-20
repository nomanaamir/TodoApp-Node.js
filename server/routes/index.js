var express = require('express');
var router = express.Router();
const Todo = require('../Models/Todos');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.post('/',function(req,res,next){
  let newTodo= new Todo({todos: req.body.todos})
  console.log(req.body)
  res.send('done')
  newTodo.save()
  // res.send('done')
  
});

module.exports = router;
