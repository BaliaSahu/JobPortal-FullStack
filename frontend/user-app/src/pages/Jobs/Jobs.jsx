import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { applyJob, fetchJobs, fetchRecruiterDetails } from "../../service/UserService";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { setToken, token } = useContext(StoreContext);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchJob = async () => {
    if (!token) return;
    try {
      const res = await fetchJobs(token, page, 10);
      if (res.status === 200) {
        console.log(res.data.content)
        setJobs(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.log(err)
      if (err?.message == "Network Error") {
        setToken("");
        localStorage.setItem("token", "");
        localStorage.removeItem("token");
        navigate("/login")
      }
      else if (err?.status === 401) {
        navigate("/login")
      }
      toast.error(err?.response?.data?.message || "failed to load jobs");
    }
  };

  useEffect(() => {
    if (token) {
      fetchJob();
    } else {
      navigate("/login")
    }

  }, [page]);

  // ---- Button handlers ----
  const handleApply = async (jobId) => {
    if (!token) return;
    try {
      const res = await applyJob(jobId, token);
      if (res.status === 200) {
        console.log(res);
        toast.success(" Successfully Applied ");
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data);
    }
  };



  return (
    <div className="container mt-4">
      <h4 className="mb-4">All Jobs</h4>

      <div className="row">
        {jobs && jobs.map((job) => (
          <div className="col-md-6 mb-4" key={job.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                {/* Title & Status */}
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{job.title}</h5>
                  <span className={`badge ${job.status.toLowerCase() === "open" ? "bg-success" : "bg-danger"}`}>
                    {job.status}
                  </span>
                </div>


                <h6 className="text-muted">{job.companyName}</h6>


                <p className="mt-2">{job.description}</p>

                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Experience:</strong> {job.experience} years</p>
                <p><strong>Skills:</strong> {job.skills}</p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {job.salPackage ? job.salPackage : "Not disclosed"}
                </p>
                <p><strong>Posted Date:</strong> {job.postedDate}</p>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/recruiter/" + job.postedByEmail)}
                  >
                    View Recruiter
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={() => handleApply(job.id)}
                    disabled={job.status.toLowerCase() !== "open".toLowerCase()}
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
      {jobs && <div className="d-flex justify-content-between align-items-center mt-4" style={{ paddingTop: "100px" }} >
        <button
          className="btn btn-secondary"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>}
    </div>
  );
};

export default Jobs;
