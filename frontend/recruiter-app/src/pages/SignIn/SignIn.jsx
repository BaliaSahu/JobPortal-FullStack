import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../service/RecruiterService";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const {setToken}=useContext(StoreContext);
  const navigate=useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
 
  const signIn=async(data)=>{
    try{
     const res=await login(data);
     if(res.status === 200){
        toast.success("Login Successfull.");
        localStorage.setItem("token",res.data.token);
        setToken(res?.data?.token);
        navigate("/myjobs");
     }
     console.log(res.data.token);
     
    }catch(err){
        toast.error("Login Failed! "+err?.response?.data);
        console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    signIn(loginData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            {/* <div className="card-header bg-success text-white text-center">
              <h4>Recruiter Login</h4>
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
                Don't have an account? <Link to="/register">Register</Link>
              </small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
