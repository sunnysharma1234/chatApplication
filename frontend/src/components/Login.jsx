import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
  let [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loginForm = async (e) => {
    e.preventDefault();
    // console.log(user)

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.success) {
        navigate("/");
        dispatch(setAuthUser(res.data));
        // console.log("sahil bro")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="text-black-300">
      <div className="h-full w-full p-8 shadow-md bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <form action="" onSubmit={loginForm}>
          <div className="flex flex-col gap-4 w-80">
            <h1 className="text-3xl font-bold text-center text-blue-300">
              Login
            </h1>

            <div className="">
              <TextField
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                id="outlined-basic"
                label="username"
                variant="outlined"
                className="w-80"
              />
            </div>
            <div className="">
              <TextField
                id="outlined-password-input"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                label="Password"
                type="password"
                className="w-80"
                // autoComplete="current-password"
              />
            </div>

            <div>
              <p className="text-black-400">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-blue-300">
                  Signup
                </Link>
              </p>
            </div>

            <Button variant="outlined" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
