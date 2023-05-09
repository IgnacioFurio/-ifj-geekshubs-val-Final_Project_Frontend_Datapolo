import { createSlice } from '@reduxjs/toolkit';

export const zoneSlice = createSlice({
    name: 'zone',
    initialState: {
        zoneInfo: {}
        },
        reducers: {
        zoneRdx: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        },        
        }
        
});

//export actions
export const { zoneRdx } = zoneSlice.actions;

export const zoneInfoData = (state) => state.zone;

export default zoneSlice.reducer;