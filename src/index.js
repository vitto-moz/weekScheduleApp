import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
);


/*console.log(store.getState())

let unsubscribe = store.subscribe(() =>
  console.log("store changed to", store.getState())
)

store.dispatch(setTime("tu", 240, 779));
unsubscribe();*/