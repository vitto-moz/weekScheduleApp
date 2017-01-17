import React from 'react';
import { connect } from 'react-redux';
import { setTime, setAllDay } from '../actions'

 let afterDrug = {
      'leaved': false,
      'clicked': false
 }

let Day = ({ daySchedule, setTime, setAllDay, day }) => {
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
              <div className="day-name">
                {thisDay}
              </div>
              <div
                className="all-day-off"
                onClick={() => setAllDay(thisDay)}
              >
              </div>
             {dayHours.map((hour, index) => {
              let day = [];
                if( busyHours.indexOf(index + 1) >= 0 ){
                  day.push(<div 
                            className="busy-hour" 
                            key={index+1}
                            data-bt={hour["bt"]}
                            data-et={hour["et"]}
                            data-busy={hour['busy']}
                            onClick={() => setTime(thisDay, hour["bt"], hour["et"], hour['busy'])}
                            onMouseDown={ () => afterDrug['clicked'] =  true}
                            onMouseLeave={ () => { 
                                                if (afterDrug['clicked'] === true && afterDrug['leaved'] === false){
                                                  setTime(thisDay, hour["bt"], hour["et"], hour['busy']);
                                                  if(afterDrug['clicked'] === true){
                                                        afterDrug['leaved'] = true;
                                                    }
                                                }
                                            } 
                                          }
                            onMouseUp={ () =>{
                                        afterDrug['et'] =  hour["et"]; 
                                        afterDrug['clicked'] = false;
                                        afterDrug['leaved'] = false;
                                        }   
                                      }
                            onMouseOver={() =>{
                                          if (afterDrug['clicked'] === true){
                                            setTime(thisDay, hour["bt"], hour["et"], hour['busy'])
                                          }
                                         }
                                        }
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
                            onMouseDown={ () => {afterDrug['clicked'] =  true;
                                          }
                                        }
                            onMouseLeave={ () => { 
                                                if (afterDrug['clicked'] === true && afterDrug['leaved'] === false){
                                                  setTime(thisDay, hour["bt"], hour["et"], hour['busy']);
                                                    if(afterDrug['clicked'] === true){
                                                        afterDrug['leaved'] = true;
                                                    }
                                                }
                                            } 
                                          }
                            onMouseOver={() =>{
                                                if (afterDrug['clicked'] === true){
                                                  setTime(thisDay, hour["bt"], hour["et"], hour['busy'])
                                                }

                                        }}                
                            onMouseUp={ () =>{
                                        afterDrug['clicked'] = false;
                                        afterDrug['leaved'] = false;
                                        }   
                                      }
                            >
                            </div>);
                }
              return day
            })
            }
          </div>
  )
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    setTime: (day, bt, et, busy) => {
      dispatch(setTime(day, bt, et, busy));
    },
    setAllDay: day => {
      dispatch(setAllDay(day));
    }
  })
)(Day);