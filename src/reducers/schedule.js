
import initialState from './initialState';

const shedule = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIME':
      let dayInfo = state[action.day];
      let newState = {...state};
        if (typeof newState[action.day][0] === "undefined") {
              newState[action.day] = [];
              dayInfo.push({
                bt: action.bt,
                et: action.et
              });
              newState[action.day] = dayInfo;
        } else {
                
                for (let i = newState[action.day].length - 1; i >= 0; i--) {
                   if ((typeof action.day[i] !== "undefined" && 
                      action.bt > newState[action.day][i]["et"]   && 
                      action.et > newState[action.day][i]["et"]) 
                      ||
                      (typeof action.day[i] !== "undefined" &&
                      action.bt < newState[action.day][i]["bt"]   && 
                      action.et < newState[action.day][i]["bt"])
                      )
                     {
                      newState[action.day] = [];
                      dayInfo.push({
                        bt: action.bt,
                        et: action.et
                      });
                      newState[action.day] = dayInfo;
                     break;
                     }
                } 

                if(action['busy'] === true){
                  for (let i = newState[action.day].length - 1; i >= 0; i--) {
                    if (action.bt >= newState[action.day][i]["bt"]  && 
                        action.et <= newState[action.day][i]["et"]
                        ){
                          newState[action.day].splice(i, 1)
                        }
                  }
                }
      }

      return newState

    case 'FILL_ALL_DAY':
      let allDayInfo = [];
      let allDayState = {...state};
      if (typeof allDayState[action.day][0] === 'undefined') {
        allDayInfo.push({
                     "bt": 0,
                     "et": 1439
        })
      }
      else if(allDayState[action.day][0]["bt"] === 0 && allDayState[action.day][0]["et"] === 1439 ) { 
              allDayInfo =[];
      }else{
              allDayInfo.push({
                         "bt": 0,
                         "et": 1439
              });
      }
      allDayState[action.day] = allDayInfo;
      return allDayState

    case 'CLEAR_ALL':
      let cleanState = {...state};
      for (let key in cleanState){
        if (key){
          cleanState[key] = []
        }
      }
      return cleanState
    default:
      return state
  }
}

export default shedule
