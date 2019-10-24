import React from "react";
import FormDialog from './Form';
import Axios from 'axios';
import {format,
    getDaysInMonth,
    addDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameDay,
    isSameMonth,
    parse,
    addMonths,
    subMonths,
    lastDayOfWeek,
    eachDayOfInterval,} from "date-fns";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    Summary :"a",
    Description : "",
    StartDate :"",
    EndDate :"",
    formData: "dd",
   
  };

  callbackFunction = (childData) => 
  {

    //this.setState({formData: childData})

    this.setState({
        Summary : childData.Summary,
        Description : childData.Description,
        StartDate : childData.StartDate,
        EndDate : childData.EndDate
        //formData: childData
        
      },()=>{

        const val = {
            Summary: this.state.Summary,
            Description: this.state.Description,
            StartDate : this.state.StartDate,
            EndDate : this.state.EndDate
                    };

                    let headers = {
                        'Content-Type': 'application/json',
                       'Access-Control-Allow-Origin': '*',
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                        
                                  };
       

        let url =  "http://localhost:54702/api/values";        
        console.log("url val is  "+val.EndDate);

        Axios.post(url,val,{headers:headers})
          .then(function (response) {
            console.log("the response is "+response);
          })
          .catch(function (error) {
            console.log("you got this error "+error);
          });
  
      });
      
     
    
  }

  

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate =startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

   /* const eday = this.state.startDate;
    while(eday <= this.state.EndDate)
    {
        formattedDate = format(eday, dateFormat);
       
        days.push(
            <div
              className={`col cell ${
                !isSameMonth(eday, monthStart)
                  ? "disabled"
                  : isSameDay(eday, selectedDate) ? "selected" : ""
              }`}
              style="background-color:lightblue"
              key={eday}
              
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
          );
          eday = addDays(eday, 1);
    }
*/

    const dateFormat = "dd";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
   

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
           
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
    console.log("the selected day is "+day);
  };

  nextMonth = () => {
    this.setState({
      currentMonth:addMonths(this.state.currentMonth, 1)
      
    });
    console.log("the month plus is "+ addMonths(this.state.currentMonth, 1));
  };

  prevMonth = () => {
    this.setState({
      currentMonth:subMonths(this.state.currentMonth, 1)
    });
    console.log("the month minus is "+ subMonths(this.state.currentMonth, 1));
  };

  

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <FormDialog parentCallback = {this.callbackFunction}/>
      </div>
    );
  }
}

export default Calendar;