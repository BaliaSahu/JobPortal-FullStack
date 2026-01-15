import React, { useContext, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { toast } from "react-toastify";
import { updateProject } from "../../../service/ProfileServices";

const ProjectSection = () => {
  const { token } = useContext(StoreContext);
  const [p, setP] = useState({ name: "", projectLink: "", description: "" });
  const addProject = async () => {

    if (!token) return
    try {
      const res = await updateProject(p, token);
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        toast.success("Education Information Updated Successfully");
      }
    } catch (err) {
      console.log(err)
      toast.error("Education Information Not Updated");
    }
  }
  return (
    <div className="card profile-card p-3">
      <h5>Projects</h5>



      <input className="form-control mb-2" placeholder="Project Name"
        onChange={(e) => setP({ ...p, name: e.target.value })} />

      <input className="form-control mb-2" placeholder="Project Description"
        onChange={(e) => setP({ ...p, description: e.target.value })} />

      <input className="form-control mb-2" placeholder="Project Link"
        onChange={(e) => setP({ ...p, projectLink: e.target.value })} />
       

      <button className="btn btn-primary"
        onClick={() => addProject()}>
        Add Project
      </button>
    </div>
  );
};

export default ProjectSection;
