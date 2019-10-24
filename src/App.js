import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import  BigCalendar from 'react-big-calendar';
import Axios from 'axios';
//import moment from "moment";
import momenttz from'moment-timezone';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
//import FormDialog from './events';



const DragAndDropCalendar = withDragAndDrop(BigCalendar)
const localizer = BigCalendar.momentLocalizer(momenttz)
const propTypes = {}
class App extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    events:[],
    title :"ee",
    description :"hger",
    start : "gg",
    end : "rr",
    eventId : "dd",
    id:"4",
  };
  this.moveEvent = this.moveEvent.bind(this)
}

moveEvent({ event, start, end }) {
  const { events } = this.state
  const idx = events.indexOf(event)
  const updatedEvent = { ...event, start, end }
  if (true) {
    updatedEvent.start = momenttz(start).format();
    updatedEvent.end = momenttz(end).format();
  }
  const nextEvents = [...events]
  nextEvents.splice(idx, 1, updatedEvent)
  this.setState({
     events: nextEvents,
     title: nextEvents[idx].title,
     description :nextEvents[idx].description,
     start:nextEvents[idx].start,
     end:nextEvents[idx].end,
     eventId:nextEvents[idx].eventId,
     id : event.id,
  },()=>{
      Axios.put('http://localhost:54702/api/values/'+event.id, {
      Id:this.state.id,
      Title:this.state.title,
      Description :this.state.description,
      eventId:this.state.eventId,
      Start:this.state.start ,
      End:this.state.end 
  })
  .then(response => {
    console.log("your successs edit is "+response);
    alert(`${event.title} was dropped onto ${this.state.start}`) 
    window.location.reload();
  })
  .catch(error => {
    console.log("your failed edit request is "+error);
  });
  })
  
 
}




componentDidMount()
{
  let self = this
  Axios.get('http://localhost:54702/api/values')
.then(function (response) {
  console.log("your get respose is "+response);
  let appointments = response.data;
      for (let i = 0; i < appointments.length; i++) {
        console.log(appointments[i])
        appointments[i].start = momenttz(appointments[i].start).toDate();
        appointments[i].end= momenttz(appointments[i].end).toDate();
      } 
      self.setState({
        events:appointments
      })
})
.catch(function (error) {
  console.log("get axios eroor"+error);
})
.finally(function () {
  "wow";
});
}


 
    
handleSelect = ({ start, end }) => {
  debugger;
   var std = Math.random().toString(36).substring(7);
   var str = std.replace(/[^a-v]+/g, '');
   var code = 123456+str;
  const startd = window.prompt('Event start date&time ',start)
  const title = window.prompt('Enter Your New Event name here ')
  const description = window.prompt('Enter Your New Event description here ')
  const endd = window.prompt('Event end date&time ',end)
  if (title && description && startd && endd)
  var starts =momenttz(startd).format();
  var ends =momenttz(endd).format();
    this.setState({
      events: [],
      title :title,
      description : description,
      eventId :code,
      start :starts,
      end :ends,
    },()=>{
      console.log("first console val is "+this.state.starts);
        const val = {
          Title: this.state.title,
          EventId:  this.state.eventId,
          Start :this.state.start,
          End: this.state.end,
          Description :this.state.description
                  };
                  let headers = {
                      'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                                };
      let url =  "http://localhost:54702/api/values";        
      console.log("url val is  "+val.End);
      Axios.post(url,val,{headers:headers})
        .then(function (response) {
          console.log("backend success response is "+response);
          //this.load();
          window.location.reload();
        })
        .catch(function (error) {
          console.log("you got this error "+error);
        });
        //this.load();
       
    })
}




eventStyleGetter = (events, start, end, isSelected) => {
  var backgroundColor ="#ff0d8a";
   var style = {
       backgroundColor: backgroundColor,
       borderRadius: '10px',
       opacity: 0.8,
       color: 'white',
       border: '20px',
       display: 'block',
    
   };
   return {
       style: style
   };
}

onSelectEvent(pEvent) {
  debugger;
  var ide = pEvent.id;
  const message = window.confirm("Are you sure? Do you want to remove this event?")
  if(message === true){
    
    this.setState((prevState, props) => {
      const events = [...prevState.events]
      const idx = events.indexOf(pEvent)
      events.splice(idx, 1);
      return { events };
    },()=>{
     
      Axios.delete('http://localhost:54702/api/values/'+ide);
        
       
    });
  }
}




  render() {
    const {events} = this.state
    return (
      <div className="App">
      <header className="App-header"> 
      <h1 className="App-title"></h1>
      </header>
       <DragAndDropCalendar className="App-body"
        selectable
        localizer={localizer}
        events={events}
        eventPropGetter={(this.eventStyleGetter)}
        onEventDrop={this.moveEvent}
        resizable
        defaultView="month"
        defaultDate={new Date(Date.now())}
        draggableAccessor={event => true}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent = {event => this.onSelectEvent(event)}
        onSelectSlot={this.handleSelect}
        onDragStart={event=>console.log("ondragstart event is "+event)}
        style={{ height: "600px"}}
        formats={{
          timeGutterFormat: (date, culture, localizer) => 
            localizer.format(date, 'HH:mm', culture),
          eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
            let s = localizer.format(start, 'HH:mm', culture);
            let e = localizer.format(end, 'HH:mm', culture);
            return `${s} - ${e}`;
          },
          agendaTimeRangeFormat: ({ start, end }, culture, localizer) => {
            let s = localizer.format(start, 'HH:mm', culture);
            let e = localizer.format(end, 'HH:mm', culture);
            return `${s} - ${e}`;
          },
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
            let s = localizer.format(start, 'MMM DD', culture);
            let e = localizer.format(end, 'MMM DD', culture);
            return `${s} - ${e}`;
          }          
        }}
      /> 
      </div>
    );
  }
}
App.propTypes = propTypes
export default DragDropContext(HTML5Backend)(App)
