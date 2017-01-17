import React from 'react'
import { connect } from 'react-redux';
import { clearAll } from '../actions'
import Day from './Day'

const Week = ({ schedule, clearAll }) => {

    let week = [];
    for (var key in schedule) {
      if ((schedule).hasOwnProperty(key)) {
        week.push(<Day 
                    daySchedule={schedule[key]}
                    day={key} 
                    key={key}
                  />)
      }
    }

    let timeLine = [];
    let intervals = [ "00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
    for (var i = 0; i < intervals.length; i++) {
      timeLine.push(
            <div className="interval" key={i}>
              <div className="interval-value" key={i}>
                {intervals[i]}
              </div>
            </div>
        );
      
    }

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schedule))

    return (
            <div className="schedule">
              <div className="title">Set schedule</div>
              <div className="block">
                {timeLine}
              </div>
              {week}
              <div className="buttons-block">
               <button 
                className="button"
                onClick={() => clearAll()}
               >
                Clear
               </button>
                 <a
                  href={dataStr}
                  download='schedule.json'
                 >
                   <button 
                    className="button"
                    >Save
                    </button>
                 </a>
              </div>
            </div>

    )
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    clearAll: () => {
      dispatch(clearAll());
    }
  })
  )(Week);  