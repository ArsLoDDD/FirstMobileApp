import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log('setUser action.payload', action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
