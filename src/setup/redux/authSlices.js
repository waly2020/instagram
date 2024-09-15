import { createSlice } from "@reduxjs/toolkit";


export const authSlices = createSlice({
    name : "auth",
    initialState : null,
    reducers : {
        login : (state,action) =>{
            return action.payload;
        },
        logOut : (state,action) =>{
            return null;
        }
    }
})

export const {login} = authSlices.actions;