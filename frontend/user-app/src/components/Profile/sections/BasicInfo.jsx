import React, { useContext, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { toast } from "react-toastify";
import { updateBasicInfo } from "../../../service/ProfileServices";

const BasicInfo = () => {

  const { token } = useContext(StoreContext);

  const [data, setData] = useState({
    fullName: "",
    mobile: "",
    profileSummary: "",
    languages: [],
    skills: [],
    interestedDomains: []
  });

  // helper to convert comma-separated input into array
  const handleArrayInput = (field, value) => {
    const arr = value
      .split(",")
      .map(v => v.trim())
      .filter(v => v !== "");
    setData({ ...data, [field]: arr });
  };

  const saveInfo = async () => {
    if (!token) return;

    try {
      const res = await updateBasicInfo(data, token);
      if (res.status === 200) {
        toast.success("Basic Information Updated Successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Basic Information Not Updated");
    }
  };

  return (
    <div className="card profile-card p-3">
      <h5 className="mb-3">Basic Information</h5>

      {/* Full Name */}
      <input
        className="form-control mb-2"
        placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => setData({ ...data, fullName: e.target.value })}
      />

      {/* Mobile */}
      <input
        className="form-control mb-2"
        placeholder="Mobile"
        value={data.mobile}
        onChange={(e) => setData({ ...data, mobile: e.target.value })}
      />

      {/* Profile Summary */}
      <textarea
        className="form-control mb-2"
        placeholder="Profile Summary"
        rows="3"
        value={data.profileSummary}
        onChange={(e) =>
          setData({ ...data, profileSummary: e.target.value })
        }
      />

      {/* Languages */}
      <input
        className="form-control mb-2"
        placeholder="Languages (comma separated)"
        onChange={(e) =>
          handleArrayInput("languages", e.target.value)
        }
      />

      {/* Skills */}
      <input
        className="form-control mb-2"
        placeholder="Skills (comma separated)"
        onChange={(e) =>
          handleArrayInput("skills", e.target.value.toUpperCase())
        }
      />

      {/* Interested Domains */}
      <input
        className="form-control mb-3"
        placeholder="Interested Domains (comma separated)"
        onChange={(e) =>
          handleArrayInput("interestedDomains", e.target.value.toUpperCase())
        }
      />

      <button className="btn btn-primary w-100" onClick={saveInfo}>
        Save Info
      </button>
    </div>
  );
};

export default BasicInfo;
