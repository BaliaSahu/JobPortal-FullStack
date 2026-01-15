import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";

import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext.jsx";
import { fetchUserDetails } from "../../service/UserService.js";
import ProfilePage from "../../components/Profile/ProfilePage.jsx";

const UserProfile = () => {

  const [user,SetUser]=useState(null);
  const{token}=useContext(StoreContext);
  const [formData, setFormData] = useState({ ...user });
  const [loading,setLoading]=useState(true);

  const profileDetails=async()=>{
    if(!token) return;
    try{
        const res=await fetchUserDetails(token);
        console.log(res)
        if(res.status===200){
            console.log(res.data)
            SetUser(res.data);
            setFormData(res.data);
        }

    }catch(err){
        console.log(err);
        if(err?.response?.data){
            toast.error(err?.response?.data || "Failed to Load Profile Details");
        }
    }finally{
        setLoading(false);
    }
  }
  useEffect(()=>{
    profileDetails();
  },[]);
  const handleSave = () => {
    // 🔥 call update profile API here
    console.log("Updated Data:", formData);
    setEditMode(false);
  };
  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }
  if (!user) {
    return <div className="text-center mt-5">No profile data found</div>;
  }
  return (
    <ProfilePage user={user} ></ProfilePage>
  );
};

export default UserProfile;
