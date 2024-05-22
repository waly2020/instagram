import { createSlice } from "@reduxjs/toolkit";

export const authSlices = createSlice({
    name : "auth",
    initialState : null,
    reducers : {
        login : (state,action) =>{
            return action.payload;
        }
    }
})

export const {login} = authSlices.actions;