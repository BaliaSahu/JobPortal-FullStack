import React, { useContext, useState } from "react";
import { updateCertification } from "../../../service/ProfileServices";
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/StoreContext";

const CertificationSection = () => {

    const { token } = useContext(StoreContext);
    const [c, setC] = useState({ title: "", certificationProvider: "" ,completionId: ""});

    const addCertification = async () => {

        if (!token) return
        try {
            const res = await updateCertification(c, token);
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
            <h5>Certifications</h5>
            <input className="form-control mb-2" placeholder="Title"
                onChange={(e) => setC({ ...c, title: e.target.value })} />

            <input className="form-control mb-2" placeholder="Provider"
                onChange={(e) => setC({ ...c, certificationProvider: e.target.value })} />
            <input className="form-control mb-2" placeholder="completionId"
                onChange={(e) => setC({ ...c, completionId: e.target.value })} />
            <button className="btn btn-primary"
                onClick={() => addCertification()}>
                Add Certification
            </button>
        </div>
    );
};

export default CertificationSection;
