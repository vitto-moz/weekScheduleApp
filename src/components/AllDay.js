import React from 'react';
import { connect } from 'react-redux';
import { setTime } from '../actions'

 let afterDrug = {
      'leaved': false,
      'clicked': false
 }

let AllDay = ({ daySchedule, setTime, day }) => {
  let thisDay = day;

  let dayHours = (() => {
    let id = 1;
    let dayHours = [];

    for (let minute = 0; minute <= 1380; minute+=60) {
     let hour = {};
     hour['hourId'] = id;
     hour['bt'] = minute;
     hour['et'] = minute + 59;
     hour['busy'] = false;
     id++;

     dayHours.push(hour);
    }


   return dayHours
  })();

  const getDaySchedule = () => {
   if (typeof daySchedule !== "undefined") {
      let day = daySchedule;

      for (let i = dayHours.length - 1; i >= 0; i--) {
          for (let n = day.length - 1; n >= 0; n--) {
             if(
                   dayHours[i]['bt'] >= day[n]['bt'] &&
                   dayHours[i]['et'] <= day[n]['et']
               ){
                 dayHours[i]["busy"] = true;
               }
          }
      }
   } 
  }

  getDaySchedule();

  let getBusyHours = () => {
      let busyHours = [];
    for (let i = dayHours.length - 1; i >= 0; i--) {
      if (dayHours[i]["busy"]) {
          busyHours.push(dayHours[i]["hourId"])
      }
    }

    return busyHours
  }

  let busyHours = getBusyHours();

  return (
          <div>
            {dayHours.map((hour, index) => {
              let day = [];
                if( busyHours.indexOf(index + 1) >= 0 ){
                  day.push(<div 
                           >
                           </div>)
                }else{
                  day.push(<div 
                              className="hour" 
                              key={index+1}
                              data-bt={hour["bt"]}
                              data-et={hour["et"]}
                              data-busy={hour['busy']}
                              onClick={() => setTime(thisDay, hour["bt"], hour["et"], hour['busy'])}
                              onMouseDown={ () => {afterDrug['clicked'] =  true;}}
                            >
                            </div>);
                }
              return day
            })
            }
          </div>
  )

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    setTime: (day, bt, et, busy) => {
      dispatch(setTime(day, bt, et, busy));
    }
  })
)(AllDay);