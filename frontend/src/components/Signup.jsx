import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

const Signup = () => {
  let [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate()
  let formSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try{
      const res = await axios.post("http://localhost:8080/api/v1/user/register",user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
        
      }
      console.log(res)
    }
    catch(error){
      toast.error(error.response.data.message)
      console.log(error)

    }
    setUser({
      fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",

    })
  };

  return (
    <div className="text-black-300">
      <div className="h-full w-full p-8 shadow-md bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <form action="" onSubmit={formSubmit}>
          <div className="flex flex-col gap-4 w-80">
            <h1 className="text-3xl font-bold text-center text-blue-300">
              Signup
            </h1>
            <div className="">
              <TextField
                id="outlined-basic"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                label="fullName"
                variant="outlined"
                className="w-80"
              />
            </div>
            <div className="">
              <TextField
                id="outlined-basic"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
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
            <div className="">
              <TextField
                id="outlined-password-input"
                label="confirmpassword"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                type="password"
                className="w-80"
                // autoComplete="current-password"
              />
            </div>
            <div>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="text-black-400"
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="girl"
                    onChange={(e)=>setUser({...user,gender:e.target.value})}
                    control={<Radio />}
                    label="Female"
                    className="text-black-400"
                  />
                  <FormControlLabel
                    value="boy"
                    onChange={(e)=>setUser({...user,gender:e.target.value})}
                    control={<Radio />}
                    label="Male"
                    className="text-black-900"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              {/* <Link>All ready hav an account?</Link> */}
              <p className="text-black-400">
                Allready have an account?{" "}
                <Link to={"/login"} className="text-blue-300">
                  Login
                </Link>
              </p>
            </div>

            <Button variant="outlined" type="submit">
              Signp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
