import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createJob } from "../../service/RecruiterService";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const CreateJobPost = () => {
    const { token } = useContext(StoreContext);
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        skills: "",
        experience: "",
        location: "",
        companyName: "",
        category: "",
        status: "OPEN",
        salpackage: ""
    });

    const [isCustomCategory, setIsCustomCategory] = useState(false);
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    })

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setJobData({
            ...jobData,
            [name]:
                name === "experience" || name === "salpackage"
                    ? Number(value)
                    : value
        });
    };

    // Handle category change
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

    // Submit job
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            navigate("/");
            toast.error("Please Login");
            return;
        }
        try {
            const res = await createJob(jobData, token);

            if (res.status === 200) {
                toast.success(" Job Posted Successfully");

                setJobData({
                    title: "",
                    description: "",
                    skills: "",
                    experience: "",
                    location: "",
                    companyName: "",
                    category: "",
                    status: "OPEN",
                    salpackage: ""
                });

                setIsCustomCategory(false);
            }
        } catch (err) {
            if (err.status === 401) {
                toast.error("Please Login");
                navigate("/")
                return;
            }
            console.error(err);
            toast.error(err?.response?.data || " Failed to post job");
            if (err.status === 401 || err.message === "Network error") [
                navigate("/")
            ]
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow border-0">
                        <div className="card-header bg-dark text-white text-center">
                            <h4>Create Job Post</h4>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                {/* Job Title */}
                                <div className="mb-3">
                                    <label className="form-label">Job Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={jobData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label">Job Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="description"
                                        value={jobData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Skills */}
                                <div className="mb-3">
                                    <label className="form-label">Required Skills</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="skills"
                                        placeholder="Java, Spring Boot, React"
                                        value={jobData.skills}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Salary */}
                                <div className="mb-3">
                                    <label className="form-label">Package (LPA)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="salpackage"
                                        value={jobData.salpackage}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Experience */}
                                <div className="mb-3">
                                    <label className="form-label">Experience (Years)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="form-control"
                                        name="experience"
                                        value={jobData.experience}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={jobData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Company Name */}
                                <div className="mb-3">
                                    <label className="form-label">Company Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="companyName"
                                        value={jobData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div className="mb-3">
                                    <label className="form-label">Job Category</label>
                                    <select
                                        className="form-select"
                                        value={isCustomCategory ? "OTHER" : jobData.category}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="IT">IT</option>
                                        <option value="HR">HR</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="OTHER">Other</option>
                                    </select>

                                    {isCustomCategory && (
                                        <input
                                            type="text"
                                            className="form-control mt-2"
                                            placeholder="Enter custom category"
                                            value={jobData.category}
                                            onChange={(e) =>
                                                setJobData({
                                                    ...jobData,
                                                    category: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    )}
                                </div>

                                {/* Submit */}
                                <button className="btn btn-primary w-100">
                                    Post Job
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateJobPost;
