import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateTimePicker from 'react-datetime-picker'




class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           open :false,
           title :"a",
            description : " ",
            start :"",
            end :"",
                    };
        this.handleClose=this.handleClose.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.sendData=this.sendData.bind(this)
      }
      

      handleClose = () =>
        {
        this.setState({
         open:false,
         })
        this.sendData();
        this.props.parentMethod();
       // window.location.reload();
         };

       
      componentDidUpdate(prevProps)
      {
        if (this.props.val !== prevProps.val) {
          this.setState({
            open :this.props.val,
            start:this.props.st,
            end:this.props.ed,
          });
        }
      }

      handleChange = (event) =>
      {
         event.preventDefault()
         console.log(event.target.name)
         console.log(event.target.value)
         this.setState({

              [event.target.name]:event.target.value,
              [event.target.name]:event.target.value,
         })
      }
      handleChangeDate = start => this.setState({ start })
      handleChangeDateEnd = end => this.setState({ end })

      sendData = () => {
        const data = this.state
        console.log(" child data is "+data.start);
       
        this.props.parentCallback(data);
      };




  render() {
    return (
        <div>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Event Create Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Fill the below lines for create a new event
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
      <textarea  name='description' value={this.state.description} onChange={this.handleChange} />
     <br/>
      <p>Start Date and Time:</p>
      <div>
        <DateTimePicker
          onChange={this.handleChangeDate}
          value={this.state.start}
        />
      </div>

      <p>End Date and Time:</p>
      <div>
        <DateTimePicker
          onChange={this.handleChangeDateEnd}
          value={this.state.end}
        />
      </div>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
           Create Event
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
}
export default FormDialog;