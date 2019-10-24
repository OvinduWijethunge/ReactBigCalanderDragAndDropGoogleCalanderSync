import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
           title :"a",
            description : "",
            start :"",
            end :"",
                     };


       
        this.handleClose=this.handleClose.bind(this)
        this. handleChange=this. handleChange.bind(this)
        this.sendData=this.sendData.bind(this)
      }
      

       
     
    
       handleClose = () => {
        this.setState({
            open:false,
     })
      };


      handleChange = (event) =>
      {
         event.preventDefault()
         console.log(event.target.name)
         console.log(event.target.value)
         this.setState({
 
             
          
              [event.target.name]:event.target.value,
              [event.target.name]:event.target.value,
              [event.target.name]:event.target.value,
              [event.target.name]:event.target.value,
             
         })
      }

      sendData = () => {
        const data = this.state
        console.log("youtr child data is "+data.title);
        this.props.parentCallback(data);
      };

  render() {

    return (
        <div>
      <Dialog open={this.props.val} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Fill the below lines for create a new event.....
           <br/>
          </DialogContentText>
          <br/>
          <p>Title:</p>
      <input
        type='text'
        name='title'
        onChange={this.handleChange}
      />
      <p>Description:</p>
      <input
        type='text'
        name='description'
        onChange={this.handleChange}
      />
         <br/>
         
          <br/>
          <label>Start date and time:</label>
          <input type="datetime-local" id="start" name="start" value="{events.start}" onChange={this.handleChange}></input>
      
    
          <br/>
          <br/>
          <label>End date and time :</label>
          <input type="datetime-local" id="end" name="end" value="few" onChange={this.handleChange}></input>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
   




}




}

export default FormDialog;