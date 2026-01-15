import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobById, updateJob } from "../../service/RecruiterService";
import { StoreContext } from "../../context/StoreContext";

const UpdateJobPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(StoreContext);

    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        skills: "",
        experience: "",
        location: "",
        companyName: "",
        category: "",
        status: "",
        salPackage: ""
    });

    const [isCustomCategory, setIsCustomCategory] = useState(false);

    // Load existing job
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        console.log(id);
        getJobById(id, token)
            .then(res => {
                setJobData(res.data);
                setIsCustomCategory(
                    !["IT", "HR", "Finance", "Marketing"].includes(res.data.category)
                );
            })
            .catch(() => toast.error("Failed to load job"));
    }, [id, token]);

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(Number(value));
        setJobData({
            ...jobData,
            [name]:
                name === "experience" || name === "salpackage"
                    ? Number(value)
                    : value
        });
    };

    // Category change
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (value === "OTHER") {
            setIsCustomCategory(true);
            setJobData({ ...jobData, category: "" });
        } else {
            setIsCustomCategory(false);
            setJobData({ ...jobData, category: value });
        }
    };

    // Submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateJob(id, jobData, token);
            toast.success("Job updated successfully ✅");
            navigate("/recruiter/jobs");
        } catch (err) {
            console.log(err)
            toast.error("Failed to update job ❌");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-warning text-dark text-center">
                    <h4>Edit Job Post</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={jobData.title}
                                onChange={handleChange}
                                placeholder="Enter job title"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Job Status</label>
                            <select
                                className="form-select"
                                value={jobData.status}
                                name="status"
                                onChange={(e) => { setJobData({ ...jobData, [e.target.name]: e.target.value }) }}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="OPEN">OPEN</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>


                        <div className="mb-3">
                            <label className="form-label fw-semibold">Job Description</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={jobData.description}
                                onChange={handleChange}
                                placeholder="Describe the job role"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Required Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                name="skills"
                                value={jobData.skills}
                                onChange={handleChange}
                                placeholder="Java, Spring Boot, React"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Salary Package (LPA)</label>
                            <input
                                type="number"
                                step="0.1"
                                className="form-control"
                                name="salPackage"
                                value={jobData.salPackage}
                                onChange={handleChange}
                                placeholder="e.g. 6"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Experience (Years)</label>
                            <input
                                type="number"

                                className="form-control"
                                name="experience"
                                value={jobData.experience}
                                onChange={handleChange}
                                placeholder="e.g. 2.5"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Job Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={jobData.location}
                                onChange={handleChange}
                                placeholder="City / Remote"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="companyName"
                                value={jobData.companyName}
                                onChange={handleChange}
                                placeholder="Company name"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Job Category</label>
                            <select
                                className="form-select"
                                value={isCustomCategory ? "OTHER" : jobData.category}
                                onChange={handleCategoryChange}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        {isCustomCategory && (
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Custom Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom category"
                                    value={jobData.category}
                                    onChange={(e) =>
                                        setJobData({ ...jobData, category: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        )}

                        <button className="btn btn-success w-100 fw-semibold">
                            Update Job
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateJobPost;
