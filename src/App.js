import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import DltIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {todo, data, deletee ,edit} from './Store/Middlewares/middlewares';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import IconButton from '@material-ui/core/IconButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Badge from '@material-ui/core/Badge';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const styles = theme => ({

  textField: {
    width: 200,
    fontStyle: 'italic'
  },
 

});
class App extends Component {
  constructor() {
    super();
    this.state = {
      writeTodo: "",
      writeEditTodo:"",
      open: false,
      Transition: null,
      open2: false,
      editTodo:"",
      key:"",
    }
  }
  enterTodo(ev) {
    this.setState({ writeTodo: ev.target.value, open: false })

    // console.log(ev.target.value)
  }
  deleteTodo(key){
    this.props.sentToInDeleteAction(key);
    setTimeout(() => {
      this.props.dataFromMongo()
    }, 200)
  }
  writeEditTodo(ev){
    // this.setState({editTodo:""})
    this.setState({writeEditTodo: ev.target.value})
    console.log(this.state.writeEditTodo)
  }
  editTodo(){
    // console.log(this.state.editTodo,this.state.key)
    this.props.sentToInEditAction(this.state.writeEditTodo,this.state.key)
    this.setState({open2: false,writeEditTodo:""})
    setTimeout(()=>{
      this.props.dataFromMongo()
    },250)
  }
  sentTodo() {
    this.props.sendToInTodoAction(this.state.writeTodo)
    this.setState({ writeTodo: "" })
    this.setState({ open: true, Transition: TransitionUp });
    setTimeout(() => {
      this.props.dataFromMongo()
    }, 200)
    setTimeout(() => {
      this.setState({ open: false });
    }, 1500)
  }
  componentDidMount() {
    this.props.dataFromMongo()
  }
  openDialog(todo,key){
    this.setState({open2: true,editTodo: todo,key: key})
  }
closeDialog(){
  this.setState({open2: false,writeEditTodo:""})
}
  render() {

    return (
      <div>

  <Dialog
          open={this.state.open2}
          // onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Todo ...</DialogTitle>
          <DialogContent>
            <DialogContentText style={{visibility:"hidden"}}>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            
            <TextField
            onChange={this.writeEditTodo.bind(this)}
            value={this.state.writeEditTodo}
              autoFocus
              type="text"
              placeholder={this.state.editTodo}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.closeDialog()} color="primary">
              Cancel
            </Button>
           { this.state.writeEditTodo.split(' ').join('') ?
            <Button onClick={()=>this.editTodo()} color="primary">
              Save
            </Button>
            : <Button disabled color="primary">
              Save
            </Button>}
          </DialogActions>
        </Dialog>

        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.todo_submited}</span>}
          />
        <form className="form" onSubmit={(e) => e.preventDefault() }>
          <TextField
            autoFocus
            label="Enter Todo ..."
            margin="normal"
            style={styles.textField}
            onChange={this.enterTodo.bind(this) }
            value={this.state.writeTodo}
            />
          { this.state.writeTodo.split(" ").join("") ?
            <Button  variant="outlined" onClick={() => this.sentTodo() } type="submit" style={{ margin: "12px",fontStyle:"italic",color:"black" }} color="primary" size="small">
              Send
              <SendIcon style={{ marginLeft: "5px",color:"#FF3232" }}/>
            </Button>
            :
            <Button disabled  variant="outlined" style={{ margin: "12px" ,fontStyle:"italic"}} color="primary" size="small">
              Send
              <SendIcon style={{ marginLeft: "5px" }}/>
            </Button>
          }
        </form>
        <div className="tablee">
          <Paper style={{overflowY: 'auto',height:"72vh",background: "rgba(000,0,0,0.2)"}}>
            <Table>
              <TableHead style={{background:"rgba(000,0,0,0.2)"}}>
                <TableRow>
                      <TableCell></TableCell >                
                  <TableCell style={{fontSize:"16px",letterSpacing:"1.5px",color:"black"}}>S.NO</TableCell >
                  <TableCell style={{fontSize:"16px",letterSpacing:"1.5px",color:"black"}}><Badge badgeContent={this.props.todoData.length} color="secondary">TODOS </Badge></TableCell > 
                  <TableCell style={{fontSize:"16px",letterSpacing:"1.5px",color:"black"}}>DELETE</TableCell >
                  <TableCell style={{fontSize:"16px",letterSpacing:"1.5px",color:"black"}}>EDIT</TableCell >
                </TableRow>
              </TableHead>
              <TableBody>

                {this.props.todoData.map((val, ind) => {
                  
                  return (

                    <TableRow key={ind} style={{overflowY: 'auto',height:"5vh"}}>
                      <TableCell></TableCell >
                      <TableCell style={{fontStyle:"italic",fontSize:"16.5px",color:"chocolate"}}>{ind + 1}</TableCell >
                      <TableCell style={{letterSpacing:"1.5px",fontSize:"16.5px",color:"chocolate"}}>{val.todos}</TableCell >
                      <TableCell><IconButton aria-label="Delete"><DltIcon onClick={()=>this.deleteTodo(val._id)} style={{ color: "#FF3232", cursor: "pointer" }}/></IconButton></TableCell >
                      <TableCell><IconButton aria-label="Edit"><EditIcon style={{ cursor: "pointer" }} onClick={()=>this.openDialog(val.todos,val._id)}/></IconButton></TableCell >
                    </TableRow>
                    
                  )
                }) }

              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log(state.root.todos)
  console.log(state.root.todo_submited)
  return ({
    todo_submited: state.root.todo_submited,
    todoData: state.root.todos
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    sendToInTodoAction: (writeTodo) => { dispatch(todo(writeTodo)) },
    dataFromMongo: () => { dispatch(data()) },
    sentToInDeleteAction:(key)=>{dispatch(deletee(key))},
    sentToInEditAction:(todo,key)=>{dispatch(edit(todo,key))}
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
