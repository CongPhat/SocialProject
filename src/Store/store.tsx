import { createStore } from 'redux';
import { initState } from './State/RootState';
import { RootReducer } from './Reducer/RootReducer';

export const store = createStore(
  RootReducer
)
