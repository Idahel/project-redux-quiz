import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { quiz } from './reducers/quiz';
import Quiz from './components/Quiz';
import Header from './components/Header';

const store = configureStore({
  reducer: {
    quiz: quiz.reducer,
  },
});

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Quiz />
    </Provider>
  );
};
