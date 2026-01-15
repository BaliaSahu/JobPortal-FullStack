import React, { useContext, useEffect, useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext";
import { Link, useParams } from "react-router-dom";
import { fetchAppliedCandidates } from "../../service/RecruiterService";
import profile from '../../assets/profile.png'

const AppliedCandidates = () => {
    const { token } = useContext(StoreContext);
    const { jobId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        loadCandidates();
        // eslint-disable-next-line
    }, []);

    const loadCandidates = async () => {
        if (!token) return;
        console.log("asla to babu")
        try {
            setLoading(true);
            setError("");

            const res = await fetchAppliedCandidates(jobId, page, 10, token);
            if (res.status === 200) {
                console.log(res + "ala");
                setCandidates(res.data.content);
                setTotalPages(res.data.totalPages);
            }


        } catch (err) {
            console.log(err)
            setError("Failed to load applied candidates");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-3">Applied Candidates</h4>

            {loading && (
                <div className="text-center my-4">
                    <Spinner animation="border" />
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && candidates.length === 0 && (
                <div className="alert alert-info">
                    No candidates have applied yet.
                </div>
            )}

            {candidates.map((user) => (
                <Card key={user.id} className="mb-3 shadow-sm">
                    <Card.Body className="d-flex align-items-center">
                        <img
                            src={user.imgUrl || profile}
                            alt="profile"
                            className="rounded-circle me-3"
                            width="70"
                            height="70"
                        />

                        <div className="flex-grow-1">
                            <h5 className="mb-1">{user.fullName}</h5>
                            <p className="mb-1 text-muted">{user.email}</p>
                            <p className="mb-1">
                                <strong>Skills:</strong>{" "}
                                {user.skills?.join(", ") || "N/A"}
                            </p>
                            <p className="text-muted mb-0">
                                {user.profileSummary}
                            </p>
                        </div>

                        <div className="text-end">
                            {user.resume && (
                                <Button
                                    variant="outline-primary"
                                    href={user.resume}
                                    target="_blank"
                                >
                                    View Resume
                                </Button>
                            )}
                        </div>
                        <div className="text-end">
                            <Link to={"/candidate/profile/" + user.email} >
                                <button className="btn btn-success outline-success">
                                    Profile
                                </button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <Button
                        variant="secondary"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>

                    <span className="align-self-center">
                        Page {page + 1} of {totalPages}
                    </span>

                    <Button
                        variant="secondary"
                        disabled={page === totalPages - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AppliedCandidates;
