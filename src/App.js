import React from 'react';
import './App.css';
import Week from './components/Week'
import { connect } from 'react-redux';
import { setTime } from './actions'

const App = (props) => {
    return (
      <div className="App">
        <Week schedule={props.store.schedule}/>
      </div>
    );
}



export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    setTime: (day, bt, et) => {
      dispatch(setTime(day, bt, et));
    }
  })
)(App);
