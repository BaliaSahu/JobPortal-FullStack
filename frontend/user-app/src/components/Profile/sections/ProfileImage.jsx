import React, { useContext, useState } from "react";
import avatar from '../../../assets/avatar.webp'
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/StoreContext";
import { profileUpload } from "../../../service/ProfileServices";
const ProfileImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const {token}=useContext(StoreContext);

  const uploadImage = async() => {
    if(!token) return
    try{
      const res=await profileUpload(image,token);
      console.log(res);
      if(res.status===200){
        console.log(res.data);
        toast.success("Profile Updated Successfully");
      }
    }catch(err){
      console.log(err)
      toast.error("Profile Not Updated");
    }
  };

  return (
    <div className="card profile-card p-3 text-center">
      <h5>Profile Photo</h5>

      <img
        src={preview || avatar}
        className="rounded-circle mx-auto my-3"
        width="120"
        height="120"
        alt="profile"
      />

      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
      />

      <button className="btn btn-primary mt-3" onClick={uploadImage}>
        Update Photo
      </button>
    </div>
  );
};

export default ProfileImage;
