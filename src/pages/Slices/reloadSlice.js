import { createSlice } from '@reduxjs/toolkit';

export const reloadSlice = createSlice({
    name: 'reload',
    initialState: {
        updatedData: {}
        },
        reducers: {
        reload: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        },        
        }
        
});

//export actions
export const { reload } = reloadSlice.actions;

export const bringData = (state) => state.reload;

export default reloadSlice.reducer;