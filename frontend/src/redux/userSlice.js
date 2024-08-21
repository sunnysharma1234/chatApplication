import {createSlice}  from "@reduxjs/toolkit";
import OtherUsers from "../components/OtherUsers";

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        converSationUser:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers = action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        setConverSationUser:(state,action)=>{
            state.converSationUser=action.payload
        }

    } 
})

export const {setAuthUser,setOtherUsers, setSelectedUser,setConverSationUser}=userSlice.actions
export default userSlice.reducer;