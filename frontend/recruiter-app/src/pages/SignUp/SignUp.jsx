import React, { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../service/RecruiterService";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    experienceYears: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const registerHr = async (data) => {
    try {
      const res = await register(data);
      if (res.status === 200) {
        toast.success("Registration Successfull");
      }
      console.log(res)
      console.log(res.data);
    } catch (err) {
      toast.error("Registration Failed! " + err?.response?.data);
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    registerHr(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Recruiter Registration</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="3"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Experience Years */}
                <div className="mb-3">
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    name="experienceYears"
                    placeholder="Enter experience in years"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
                <p>Already Registered ? <Link to="/" >Sign In</Link> </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
