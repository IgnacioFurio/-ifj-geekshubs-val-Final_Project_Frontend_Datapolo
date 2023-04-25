import { createSlice } from '@reduxjs/toolkit';

export const isAdminSlice = createSlice({
    name: 'admin',
    initialState: {
        isAdmin: {}
        },
        reducers: {
        roleIn: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        },
        roleOut: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { roleIn, roleOut } = isAdminSlice.actions;

export const adminData = (state) => state.admin;

export default isAdminSlice.reducer;