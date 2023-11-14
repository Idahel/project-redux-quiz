import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { App } from './App';
import { quiz } from './reducers/quiz';
import './index.css';


const store = configureStore({
  reducer: {
    quiz: quiz.reducer
  }
});

const root = document.getElementById('root');

// Replace ReactDOM.render with createRoot().render
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
