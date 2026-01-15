import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { applyJob, fetchJobsForYou } from "../../service/UserService";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const JobsForYou = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const res = await fetchJobsForYou(token, page, 10);
      if (res.status === 200) {
        console.log(res);
        setJobs(res.data.content);
        setTotalPages(res.data.totalPages);
      }

    } catch (err) {
      if(err?.message=="Network Error"){
        setToken("");
        localStorage.setItem("token","");
        localStorage.removeItem("token");
        navigate("/login")
      }
      if(err?.status===401){
        navigate("/login")
      }
      toast.error(err?.response?.message || "Please update your profile to use this service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchJob();
    else navigate("/login")
  }, [page, token]);

  const handleApply = async (jobId) => {
    try {
      const res = await applyJob(jobId, token);
      if (res.status === 200) {
        toast.success("Successfully applied 🎉");
       
      }
    } catch (error) {
      toast.error(error?.response?.data || "Already applied");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Jobs For You</h4>

      {loading && <div className="text-center">Loading jobs...</div>}

      {!jobs && (
        <div className="alert alert-info">No jobs found</div>
      )}

      <div className="row">
        {jobs && jobs.map(job => (
          <div className="col-md-6 mb-4" key={job.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5>{job.title}</h5>
                  <span className={`badge ${job.status.toUpperCase() === "OPEN" ? "bg-success" : "bg-danger"}`}>
                    {job.status.toUpperCase()}
                  </span>
                </div>

                <h6 className="text-muted">{job.companyName}</h6>
                <p className="mt-2">{job.description}</p>

                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Experience:</strong> {job.experience} years</p>
                <p><strong>Skills:</strong> {job.skills}</p>
                <p><strong>Salary:</strong> {job.salPackage || "Not disclosed"}</p>
                <p><strong>Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>

                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/recruiter/${job.postedByEmail}`)}
                  >
                    View Recruiter
                  </button>

                  <button
                    className="btn btn-success"
                    disabled={job.status.toUpperCase() !== "OPEN" }
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {jobs && <div className="d-flex justify-content-between mt-4" style={{ paddingTop:"100px"}}>
        <button
          className="btn btn-secondary"
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </button>

        <span>Page {page + 1} of {totalPages}</span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages - 1}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>}
    </div>
  );
};

export default JobsForYou;
