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
            Title :"a",
            Description : "",
            StartDate :"",
            EndDate :"",
                     };


        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.sendData=this.sendData.bind(this)
      }
      

       handleClickOpen = () => {
        this.setState({
               open:true,
        })
        
      };
    
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
        console.log("youtr child data is "+data.Title);
        this.props.parentCallback(data);
      };

  render() {

    return (
        <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
       Add event
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-event-title">Add your event here</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Fill the below lines for create a new event.....
           <br/>
          </DialogContentText>
          <br/>
          <p>Title:</p>
      <input
        type='text'
        name='Title'
        onChange={this.handleChange}
      />
      <p>Description:</p>
      <input
        type='text'
        name='Description'
        onChange={this.handleChange}
      />
         <br/>
         
          <br/>
          <label>Start date :</label>
          <input type="date" id="StartDate" name="StartDate" onChange={this.handleChange}></input>
          <br/>
          <br/>
          <label>End date :</label>
          <input type="date" id="EndDate" name="EndDate"  onChange={this.handleChange}></input>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.sendData} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
   




}




}

export default FormDialog;