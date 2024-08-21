import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = ({ user }) => {
  // const {}
  const dispatch = useDispatch()
  // const {setlectedUser} = useSelector(store=>store.user)

  useEffect(()=>{
    return ()=> dispatch(setSelectedUser(null))
  },[])

  if(!user){
    return(
        <div className="min-w-96 h-max-40 flex flex-col">
        <div className="flex gap-3 p-1 items-center text-white rounded-lg bg-slate-600">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="" alt="User Image" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2">
              <p className="capitalize text-wrap">sii</p>
            </div>
          </div>
        </div>
        </div>
    )
  }else{
    return (
        <>
        
        
          <div className="min-w-96 h-max-40 flex flex-col">
            <div className="flex gap-3 p-1 items-center text-white rounded-lg bg-slate-600">
              <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img src={user?.profilePhoto} alt="User Image" />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between gap-2">
                  <p className="capitalize text-wrap">{user?.fullName}</p>
                </div>
              </div>
            </div>
            <Messages />
            <SendInput />
        
          </div>
        </>
      );
  }

 
};

export default MessageContainer;
