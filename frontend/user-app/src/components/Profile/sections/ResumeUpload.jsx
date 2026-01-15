import React, { useContext, useState } from "react";
import { resumeUpload } from "../../../service/ProfileServices";
import { StoreContext } from "../../../context/StoreContext";
import { toast } from "react-toastify";

const ResumeUpload = () => {
  const{token}=useContext(StoreContext);
  const [resume, setResume] = useState(null);

 const uploadResume = async() => {
     if(!token) return
     try{
       const res=await resumeUpload(resume,token);
       console.log(res);
       if(res.status===200){
         console.log(res.data);
         toast.success("Resume Updated Successfully");
       }
     }catch(err){
       console.log(err)
       toast.error("Resume Not Updated");
     }
   };

  return (
    <div className="card profile-card p-3">
      <h5>Resume</h5>

      <input
        type="file"
        accept="application/pdf"
        className="form-control"
        onChange={(e) => setResume(e.target.files[0])}
      />

      {resume && (
        <p className="mt-2 text-success">{resume.name}</p>
      )}

      <button className="btn btn-primary mt-2" onClick={uploadResume}>
        Upload Resume
      </button>
    </div>
  );
};

export default ResumeUpload;
