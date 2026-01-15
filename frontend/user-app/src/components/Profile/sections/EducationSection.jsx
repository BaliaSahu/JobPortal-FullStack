import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/StoreContext";
import { updateEducation } from "../../../service/ProfileServices";

const EducationSection = () => {

  const { token } = useContext(StoreContext);

  const [edu, setEdu] = useState({
    institution: "",
    degree: "",
    cgpa: "",
    startDate: "",
    endDate: "",
    studying: false
  });

  const addEducation = async () => {
    if (!token) return;

    try {
      const payload = {
        ...edu,
        cgpa: edu.cgpa ? Number(edu.cgpa) : null // important
      };

      const res = await updateEducation(payload, token);

      if (res.status === 200) {
        toast.success("Education Information Updated Successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Education Information Not Updated");
    }
  };

  return (
    <div className="card profile-card p-3">
      <h5>Education</h5>

      <input
        className="form-control mb-2"
        placeholder="Institution"
        value={edu.institution}
        onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Degree"
        value={edu.degree}
        onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
      />

      <input
        type="date"
        className="form-control mb-2"
        value={edu.startDate}
        onChange={(e) => setEdu({ ...edu, startDate: e.target.value })}
      />

      {!edu.studying && (
        <input
          type="date"
          className="form-control mb-2"
          value={edu.endDate}
          onChange={(e) => setEdu({ ...edu, endDate: e.target.value })}
        />
      )}

      <input
        className="form-control mb-2"
        placeholder="CGPA"
        value={edu.cgpa}
        onChange={(e) => setEdu({ ...edu, cgpa: e.target.value })}
      />

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={edu.studying}
          onChange={(e) => setEdu({ ...edu, studying: e.target.checked, endDate: "" })}
        />
        <label className="form-check-label">
          Currently Studying
        </label>
      </div>

      <button className="btn btn-primary" onClick={addEducation}>
        Add Education
      </button>
    </div>
  );
};

export default EducationSection;
