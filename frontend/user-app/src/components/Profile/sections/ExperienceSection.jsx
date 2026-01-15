import React, { useContext, useState } from "react";
import { updateExperience } from "../../../service/ProfileServices";
import { StoreContext } from "../../../context/StoreContext";
import { toast } from "react-toastify";

const ExperienceSection = () => {
  const { token } = useContext(StoreContext);
  const [exp, setExp] = useState({ companyName: "", role: "",description:"", working: false ,startDate:"",endDate:""});

  const addExperience = async () => {
    if (!token) return
    try {
      const res = await updateExperience(exp, token);
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
      <h5>Experience</h5>

      <input className="form-control mb-2" placeholder="Company"
        onChange={(e) => setExp({ ...exp, companyName: e.target.value })} />
      <input className="form-control mb-2" placeholder="Description"
        onChange={(e) => setExp({ ...exp, description: e.target.value })} />

      <input className="form-control mb-2" placeholder="Role"
        onChange={(e) => setExp({ ...exp, role: e.target.value })} />
      <input type="date" className="form-control mb-2" placeholder="Start date" 
        onChange={(e) => setExp({...exp, startDate: e.target.value })}
      />
      {exp.working==false && <input type="date" className="form-control mb-2" placeholder="End Date"
        onChange={(e) => setExp({ ...exp,endDate: e.target.value }) }
      />}
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox"
          onChange={(e) => setExp({ ...exp, working: e.target.checked })} />
        <label className="form-check-label">Currently Working</label>
      </div>

      <button className="btn btn-primary"
        onClick={() => addExperience()}>
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceSection;
