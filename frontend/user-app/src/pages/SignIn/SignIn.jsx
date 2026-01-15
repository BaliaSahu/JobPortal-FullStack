import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../service/UserService";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const {token,setToken}=useContext(StoreContext);
  const navigate=useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const loginUserr=async(data)=>{
    try{
      const res=await loginUser(data);
      console.log(res);
      if(res.status===200){
        console.log(res)
        setToken(res.data.token)
        toast.success("Login Successfull!");
        navigate("/job")
      }
    }catch(err){
      toast.error(err?.response?.data || "Login failed!");
      console.log(err);
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    loginUserr(loginData);

  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            {/* <div className="card-header bg-success text-white text-center">
              <h4>Sign In</h4>
            </div> */}

            <div className="card-body">
              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-success w-100">
                  Sign In
                </button>

              </form>
            </div>

            <div className="card-footer text-center">
              <small>
                Don't have an account? <Link href="/register">Register</Link>
              </small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
