import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { applyJob, searchJobs } from "../../service/UserService";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const JobSearch = () => {
    const [keyword, setKeyword] = useState(""); // search input
    const [jobs, setJobs] = useState([]); // job results
    const [page, setPage] = useState(0); // current page
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useContext(StoreContext);

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    })

    // Fetch jobs from backend
    const fetchJobs = async (keyword, page) => {
        try {
            setLoading(true);
            const res = await searchJobs(keyword, page, 10, token);
            console.log(res)
            if (res.status === 200) {
                setJobs(res.data.content);
                setTotalPages(res.data.totalPages);
            }
        } catch (err) {
            if (err?.message == "Network Error") {
                setToken("");
                localStorage.setItem("token", "");
                localStorage.removeItem("token");
                navigate("/login")
            }
            if (err?.status === 401) {
                navigate("/login")
            }
            toast.error("Failed to Search")
        } finally {
            setLoading(false);
        }
    };
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


    // Handle search form submit
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        fetchJobs(keyword, 0);
    };

    // Handle pagination click
    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchJobs(keyword, newPage);
    };

    return (
        <div className="container my-5">
            {/* Search Form */}
            <div className="card shadow-sm mb-4 border-primary">
                <div className="card-body">
                    <h5 className="card-title mb-3 text-primary">
                        🔍 Search for Your Dream Job
                    </h5>
                    <p className="text-muted mb-3">
                        Enter a relevent job title to find jobs matching your profile.
                    </p>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="e.g., Java Developer, React, Data Analyst..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Job Results */}
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2 text-muted">Loading jobs, please wait...</p>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center my-5">
                    <p className="text-muted">No jobs found. Try another keyword!</p>
                </div>
            ) : (
                <div className="row">
                    {jobs.map((job) => (
                        <div className="col-md-6 mb-4" key={job.id}>
                            <div className="card shadow-sm h-100 border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{job.title}</h5>
                                    <p className="text-muted mb-1">{job.companyName}</p>
                                    <p className="text-muted mb-1">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        {job.location}
                                    </p>
                                    <p className="text-muted mb-1">
                                        <i className="bi bi-tools me-2"></i>
                                        Skills: {job.skills || "N/A"}
                                    </p>
                                    <p className="text-muted mb-1">
                                        {/* <i className="bi bi-tools me-2"></i> */}
                                        Description: {job.description || "N/A"}
                                    </p>
                                    <p className="text-muted mb-1">
                                        <i className="bi bi-briefcase me-2"></i>
                                        Experience: {job.experience || "0"} Years
                                    </p>
                                    <p className="text-muted mb-3">
                                        <i className="bi bi-currency-rupee me-2"></i>
                                        Salary: {job.salPackage ? job.salPackage + " LPA" : "N/A"}
                                    </p>
                                    <span
                                        className={`badge ${job.status.toUpperCase() === "OPEN" ? "bg-success" : "bg-secondary"}`}
                                    >
                                        {job.status}
                                    </span>
                                    <div className="mt-3">
                                        <Link to={"/recruiter/" + job.postedByEmail}>
                                            <button className="btn btn-outline-primary btn-sm me-2">
                                                View Recruiter
                                            </button>
                                        </Link>
                                        <button onClick={() => handleApply(job.id)} className="btn btn-outline-success btn-sm">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }

            {/* Pagination */}
            {
                totalPages > 1 && (
                    <nav className="mt-4" style={{ marginTop: "200px" }}>
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <li key={idx} className={`page-item ${page === idx ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageChange(idx)}>
                                        {idx + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )
            }

            {/* Help Section */}
            <div className="card mt-5 border-info">
                <div className="card-body">
                    <h6 className="card-title text-info">💡 Tips for Searching Jobs</h6>
                    <ul className="mb-0">
                        <li>Use clear keywords like "Java Developer" or "React".</li>
                        <li>Try different spellings or synonyms to get more results.</li>
                        <li>Click "View Details" to read full job description before applying.</li>
                        <li>Use pagination below to browse through all available jobs.</li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default JobSearch;
