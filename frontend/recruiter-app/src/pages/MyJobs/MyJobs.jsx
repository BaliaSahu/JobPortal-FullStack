import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { deleteJobPost, fetchMyJobs } from "../../service/RecruiterService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const MyJobs = () => {

  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 6;

  useEffect(() => {
    if (!token) {
      toast.error("Please Login");
      navigate("/");
      return;
    }
    fetchJobs(currentPage);
  }, [currentPage, token]);

  const fetchJobs = async (page) => {
    try {

      const res = await fetchMyJobs(page, pageSize, token);
      console.log(res)
      if (res.status === 200) {
        setJobs(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.log(err)
      if (err?.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/");
        return;
      }
      toast.error("Failed to load jobs");
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const res = await deleteJobPost(jobId, token);
      if (res.status === 200) {
        toast.success("Deleted Successfully");
        fetchJobs(currentPage);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const statusBadge = (status) =>
    status === "ACTIVE"
      ? "badge bg-success"
      : "badge bg-secondary";

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <i className="bi bi-briefcase-fill me-2"></i>
          My Posted Jobs
        </h4>
      </div>

      <div className="row">
        {jobs.map(job => (
          <div className="col-md-4 mb-4" key={job.id}>
            <div className="card shadow h-100 border-0">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{job.title}</h5>
                  <span className={statusBadge(job.status)}>
                    {job.status}
                  </span>
                </div>

                <p className="text-muted mb-1">
                  <i className="bi bi-building me-2"></i>
                  {job.companyName}
                </p>

                <p className="text-muted mb-1">
                  <i className="bi bi-geo-alt me-2"></i>
                  {job.location}
                </p>

                <p className="text-muted mb-1">
                  <i className="bi bi-briefcase me-2"></i>
                  {job.experience} Years Experience
                </p>

                <p className="text-muted mb-2">
                  <i className="bi bi-currency-rupee me-2"></i>
                  {job.salPackage || 0} LPA
                </p>

                <p className="small text-secondary mb-3">
                  <i className="bi bi-tools me-2"></i>
                  {job.skills}
                </p>

                <div className="d-flex justify-content-between">
                  <Link to={`/update/jobpost/${job.id}`}>
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-pencil-square me-1"></i>
                      Edit
                    </button>
                  </Link>

                  <Link to={`/applied/users/${job.id}`}>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="bi bi-people-fill me-1"></i>
                      Applied
                    </button>
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteJob(job.id)}
                  >
                    <i className="bi bi-trash-fill me-1"></i>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">

            <li className={`page-item ${currentPage === 0 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages - 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      )}

      {jobs.length === 0 && (
        <p className="text-center text-danger mt-4">
          No jobs posted yet.
        </p>
      )}

    </div>
  );
};

export default MyJobs;
