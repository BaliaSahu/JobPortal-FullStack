import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { applyJob, fetchRecruiterDetails } from "../../service/UserService";
import ContactActions from "../../components/ContactSection/ContactSection";
import Profile from '../../assets/profile.png'

const RecruiterProfile = () => {

  const { email } = useParams();
  const { token } = useContext(StoreContext);
  const [recruiter, setRecruiter] = useState(null);

  const fetchRecruiter = async () => {
    if (!token) return;
    try {

      const res = await fetchRecruiterDetails(email, token);
      if (res.status === 200) {
        console.log(res);
        setRecruiter(res.data);
      }
    } catch (err) {
      toast.error("Failed to load recruiter details");
    }
  };
  const handleApply = async (jobId) => {
    if (!token) return;
    try {
      const res = await applyJob(jobId, token);
      if (res.status === 200) {
        toast.success("Successfully applied 🎉");

      }
    } catch (error) {
      toast.error(error?.response?.data || "Already applied");
    }
  };
  useEffect(() => {
    fetchRecruiter();
  }, []);

  if (!recruiter) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="col">
        {/* Profile Card */}
        <div className="col-md">
          <div className="card shadow">
            <div className="card-body text-center">
              <img
                src={recruiter.imgUrl || Profile}
                alt="Recruiter"
                className="rounded-circle mb-3"
                width="120"
                height="120"
              />
              <h5>{recruiter.fullName}</h5>
              <p className="text-muted">Recruiter</p>

              <p>
                <strong>Experience:</strong>{" "}
                {recruiter.experienceYears} years
              </p>

              <hr />

              <p><strong>Email:</strong> {recruiter.email}</p>
              <p><strong>Mobile:</strong> {recruiter.mobile}</p>
              <p><strong>Address:</strong> {recruiter.address}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <ContactActions email={recruiter.email} mobile={recruiter.mobile} ></ContactActions>
            </div>
          </div>
        </div>

        {/* Job Posts */}
        <div className="col-md-8 col-12">
          <h5 className="mb-3">Posted Jobs</h5>

          {recruiter.jobPosts?.length > 0 ? (
            recruiter.jobPosts.map((job) => (
              <div className="card mb-4 shadow-sm border-0" key={job.id}>
                <div className="card-body">

                  {/* ===== HEADER ===== */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
                    <h5 className="mb-1">{job.title}</h5>

                    <span
                      className={`badge px-3 py-2 mt-2 mt-md-0 ${job.status?.toLowerCase() === "open"
                          ? "bg-success"
                          : "bg-danger"
                        }`}
                    >
                      {job.status?.toUpperCase()}
                    </span>
                  </div>

                  {/* ===== COMPANY & LOCATION ===== */}
                  <p className="text-muted mb-2 small">
                    <strong>{job.companyName}</strong> • {job.location}
                  </p>

                  {/* ===== DESCRIPTION (FULL) ===== */}
                  <p className="mb-3 text-secondary" style={{ whiteSpace: "pre-line" }}>
                    {job.description}
                  </p>

                  {/* ===== SKILLS (WRAP FIXED) ===== */}
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    {job.skills?.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="badge bg-primary text-wrap"
                        style={{ maxWidth: "100%" }}
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  {/* ===== DETAILS ===== */}
                  <div className="row gy-2 mb-3 small">
                    <div className="col-12 col-md-4">
                      <strong>Experience:</strong> {job.experience} yrs
                    </div>
                    <div className="col-12 col-md-4">
                      <strong>Category:</strong> {job.category}
                    </div>
                    {job.salPackage && (
                      <div className="col-12 col-md-4">
                        <strong>Salary:</strong> ₹{job.salPackage} LPA
                      </div>
                    )}
                  </div>

                  {/* ===== ACTION BUTTON ===== */}
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary btn-sm px-4"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No jobs posted yet</p>
          )}
        </div>


      </div>
    </div>
  );
};

export default RecruiterProfile;
