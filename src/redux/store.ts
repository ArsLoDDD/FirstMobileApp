import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
