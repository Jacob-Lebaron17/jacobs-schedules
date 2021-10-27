import React, { Component } from 'react';
import Axios from 'axios';

export default class App extends Component {
  constructor() {
    super() 

    this.state = {
      selectedDay: "Monday",
      schedule: '',
      isEditing: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
    this.selectDay = this.selectDay.bind(this);
  }

  saveSchedule() {
    Axios.patch(`http://localhost:3000/Days/${this.state.selectedDay}`, {
      schedule: this.state.schedule
    })
      .then((res) => {
        this.setState({isEditing: false})
      })
      .catch(err => {
        console.log("Saving the new schedule failed:", err)
      })
  }

  selectDay(theDay) {
    this.setState({ selectedDay: theDay })
    Axios.get(`http://localhost:3000/Days/${theDay}`)
      .then(res => {
        this.setState({ schedule: res.data.schedule })
      })
      .catch(err => {
        console.log("Select the day failed:", err)
      })
  }

  handleChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value,
      isEditing: true
    })
  }

  componentDidMount() {
    Axios.get('http://localhost:3000/Days/Monday')
      .then((res) => {
        this.setState({ schedule: res.data.schedule })
      })
      .catch(err => {
        console.log("component did mount failed:", err)
      })
  }

  render() {
    return (
      <div className='jacobs_schedules'>
        <div className='the_header'>
          <h3>Jacobs Schedules</h3>
        </div>
        <div className="days_container">
          <a className="day" onClick={() => this.selectDay("Monday")}>Monday</a>
          <a className="day" onClick={() => this.selectDay("Tuesday")}>Tuesday</a>
          <a className="day" onClick={() => this.selectDay("Wednesday")}>Wednesday</a>
          <a className="day" onClick={() => this.selectDay("Thursday")}>Thursday</a>
          <a className="day" onClick={() => this.selectDay("Friday")}>Friday</a>
          <a className="day" onClick={() => this.selectDay("Saturday")}>Saturday</a>
          <a className="day" onClick={() => this.selectDay("Sunday")}>Sunday</a>
        </div>
        <div className="the_schedules">
          <div className="day_title">
            <h3>{this.state.selectedDay}</h3>
          </div>
          <textarea
            className="schedule"
            placeholder="Write your schedules here..."
            onChange={this.handleChange}
            value={this.state.schedule}
            name="schedule"
          />
        </div>
        {this.state.isEditing === true ? (
          <a className="isEditingBtn" onClick={() => this.saveSchedule()}>Save Schedule</a>
        ) : (
          <a className="isNotEditingBtn">Save Schedule</a>
        )}
      </div>
    );
  }
}