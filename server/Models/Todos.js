const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = ({
    todos:{
        type: String,
    }
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;