var express = require('express');
var router = express.Router();
const Todo = require('../Models/Todos');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond ');
  Todo.find({}).then(function(todos){
  //  console.log(todos)
   res.send(todos)
  })
});

router.post('/', function(req, res, next) {
  console.log(req.body)
 let newTodo= new Todo({todos: req.body.todos})
  newTodo.save()
  res.send('done')
});

router.delete('/:id',function(req,res,next){
  console.log(req.params.id)
  Todo.findByIdAndRemove({_id: req.params.id}).then(function(Todos){
    res.send(Todos)
  })
});

router.put('/:id',function(req,res,next){
  Todo.findByIdAndUpdate({_id: req.params.id},req.body).then(function(Todos){
    Todo.fineOne({_id: req.params.id}).then(function(Todos){
      res.send(Todos)
    })
  })
})

module.exports = router;
