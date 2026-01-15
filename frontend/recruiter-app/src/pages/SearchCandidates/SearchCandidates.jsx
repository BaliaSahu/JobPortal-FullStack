import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchCandidateBySkill } from "../../service/RecruiterService";
import profile from '../../assets/profile.png';
import { Link, useNavigate } from "react-router-dom";

const SearchCandidates = () => {
    const { token } = useContext(StoreContext);

    const [skillInput, setSkillInput] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [])

    const searchCandidates = async (pageNo = 0) => {
        if (!skillInput.trim()) {
            toast.error("Please enter at least one skill");
            return;
        }

        const skills = skillInput
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);

        try {
            const res = await fetchCandidateBySkill(pageNo, 10, skills, token);
            console.log(res)
            if (res.status === 200) {
                setCandidates(res.data.content);
                setTotalPages(res.data.totalPages);
                setPage(pageNo);
            }
        } catch (err) {
            if (err?.response?.status === 401) {
                toast.error("Session expires Please Login again");
                navigate("/")
                return;
            }
            console.log(err)
            toast.error("Failed to fetch candidates");
        }
    };

    return (
        <div className="container my-4">

            {/* HEADER */}
            <div className="mb-4">
                <h3 className="fw-bold text-primary">
                    <i className="bi bi-search me-2"></i>
                    Search Candidates by Skills
                </h3>
                <p className="text-muted">
                    Find qualified candidates instantly based on required skills.
                </p>
            </div>

            {/* SEARCH BAR */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <div className="row g-2 align-items-end">
                        <div className="col-md-9">
                            <label className="form-label fw-semibold">
                                Skills (comma separated)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Java, Spring Boot, React"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 d-grid">
                            <button
                                className="btn btn-primary"
                                onClick={() => searchCandidates(0)}
                            >
                                <i className="bi bi-search me-2"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESULTS */}
            <div className="row">
                {candidates.map(candidate => (
                    <div className="col-md-4 mb-4" key={candidate.id}>
                        <div className="card h-100 shadow border-0">
                            <div className="card-body">

                                <div className="d-flex align-items-center mb-3">
                                    <img
                                        src={candidate.imgUrl || profile}
                                        alt="profile"
                                        className="rounded-circle me-3"
                                        width="55"
                                        height="55"
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-0">{candidate.fullName}</h6>
                                        <small className="text-muted">
                                            {candidate.experienceYears || 0} yrs experience
                                        </small>
                                    </div>
                                </div>

                                <p className="mb-2">
                                    <strong>Skills:</strong>
                                    <br />
                                    {candidate.skills?.map((s, i) => (
                                        <span key={i} className="badge bg-light text-dark me-1 mb-1">
                                            {s}
                                        </span>
                                    ))}
                                </p>

                                <p className="small text-muted mb-2">
                                    <i className="bi bi-envelope me-1"></i>
                                    {candidate.email}
                                </p>

                                <p className="small text-muted mb-3">
                                    <i className="bi bi-building me-1"></i>
                                    {candidate.company || "Open to work"}
                                </p>

                                <div className="d-flex justify-content-between">
                                    {candidate.resume && (
                                        <Link
                                            href={candidate.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            <i className="bi bi-file-earmark-text me-1"></i>
                                            Resume
                                        </Link>
                                    )}

                                    <Link
                                        to={`mailto:${candidate.email}`}
                                        className="btn btn-outline-success btn-sm"
                                    >
                                        <i className="bi bi-envelope me-1"></i>
                                        Contact
                                    </Link>
                                    <Link
                                        to={"/candidate/profile/" + candidate.email}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        <i className="bi bi-person me-1"></i>
                                        Profile
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {candidates.length === 0 && (
                <p className="text-center text-muted mt-4">
                    No candidates found. Try different skills.
                </p>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 gap-2">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page === 0}
                        onClick={() => searchCandidates(page - 1)}
                    >
                        Previous
                    </button>

                    <span className="align-self-center fw-semibold">
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page === totalPages - 1}
                        onClick={() => searchCandidates(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
};

export default SearchCandidates;
