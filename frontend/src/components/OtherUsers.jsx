import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import { setConverSationUser } from "../redux/userSlice";

const OtherUsers = () => {
  // my ustom hook
  useGetOtherUsers();

  const { otherUsers,converSationUser } = useSelector((store) => store.user);
  if (!otherUsers) return;



  if(converSationUser){
    return(
      <div className="overflow-y-scroll h-80">
        {
          converSationUser?.map((user)=>{
            return(
              <OtherUser key={user._id} user={user} />
            )
          })
        }

      </div>

    )
  }else{
    return (
      <div className="overflow-y-scroll h-80">
        {otherUsers?.map((user) => {
          return <OtherUser key={user._id} user={user} />;
        })}
  
      
      </div>
    );
  }

  
};

export default OtherUsers;
