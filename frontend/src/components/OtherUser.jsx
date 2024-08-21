import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({user}) => {

  const dispatch = useDispatch()
  const {selectedUser} = useSelector(store=>store.user)
  const selectUserHandler =async (user)=>{
    console.log(user)
    dispatch(setSelectedUser(user))



  }
  return (
    <div>
      <div onClick={()=>selectUserHandler(user)} className={` ${selectedUser?._id === user._id ? 'bg-slate-500 text-white':''} flex gap-3 p-1 items-center text-neutral-600 hover:bg-slate-500 hover:text-white rounded cursor-pointer`}>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col flex-1" >
            <div className="flex justify-between gap-2">
                <p className="capitalize text-wrap text-white">{user?.fullName}</p>
            </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </div>
  );
};

export default OtherUser;
