import React, { useState } from "react";
// import {IoSend} from "react-icons/io5"
// import SendIcon from "@mui/icons-material/Send"
import SendIcon from "@mui/icons-material/Send";
import { headers } from "next/headers";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    // console.log("gjhgjh")
    e.preventDefault();

    try {
      console.log(message);
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <form action="" className="px-2 mt-3" onSubmit={onSubmitHandler}>
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="send a message"
          className="border text-sm p-2 rounded-md block w-full bg-grey--600 text-black border-zinc-500"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
