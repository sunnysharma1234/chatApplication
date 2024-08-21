import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import OtherUser from "./OtherUser";
import { setOtherUsers } from "../redux/userSlice";
// import {setConversationUser} from
import { setConverSationUser } from "../redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const converSationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (converSationUser) {
      dispatch(setConverSationUser([converSationUser]));
    } else {
      toast.error("User not find");
    }
    // setSearch("");
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form action="" onSubmit={searchSubmitHandler}>
        <div className="flex flex-row items-center bg-white rounded-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none p-1"
            placeholder="search..."
          />

          <button type="submit">
            {" "}
            <SearchIcon />{" "}
          </button>
        </div>
      </form>
      <div className="divider my-0 py-0 pt-4"></div>
      <OtherUsers />
      <div className="divider my-0 py-0"></div>
      <div>
        <button
          className="bg-white text-slate-800 w-full fond-bold tracking-wider rounded p-2 hover:bg-slate-600 hover:text-white"
          onClick={logoutHandler}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
