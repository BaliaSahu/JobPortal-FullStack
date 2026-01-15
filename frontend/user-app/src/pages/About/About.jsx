import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container my-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">About JobCrack</h2>
        <p className="text-muted fs-5 mt-2">
          Your career companion for learning, growing, and getting hired.
        </p>
      </div>

      {/* WHO WE ARE */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <h4 className="fw-bold">Who We Are</h4>
          <p className="text-muted">
            JobCrack is a modern job portal built for candidates who want
            more than just job listings. We help you create a strong
            professional profile that highlights your skills, experience,
            and achievements.
          </p>
          <p className="text-muted">
            Whether you're a student, fresher, or working professional,
            JobCrack gives you the tools to stand out and get noticed.
          </p>
        </div>

        <div className="col-md-6 text-center">
          <i className="bi bi-person-workspace text-primary" style={{ fontSize: "120px" }}></i>
        </div>
      </div>

      {/* WHAT WE OFFER */}
      <div className="mb-5">
        <h4 className="fw-bold text-center mb-4">What JobCrack Offers You</h4>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center">
              <div className="card-body">
                <i className="bi bi-file-earmark-person fs-1 text-primary"></i>
                <h6 className="fw-bold mt-3">Professional Profile</h6>
                <p className="text-muted small">
                  Create a complete profile with skills, education,
                  experience, projects, and certifications.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center">
              <div className="card-body">
                <i className="bi bi-briefcase fs-1 text-success"></i>
                <h6 className="fw-bold mt-3">Verified Job Opportunities</h6>
                <p className="text-muted small">
                  Apply to jobs posted by genuine recruiters across
                  multiple industries and domains.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center">
              <div className="card-body">
                <i className="bi bi-graph-up-arrow fs-1 text-warning"></i>
                <h6 className="fw-bold mt-3">Career Growth</h6>
                <p className="text-muted small">
                  Track applications, improve skills, and grow your
                  career with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="bg-light rounded p-4 p-md-5 mb-5">
        <h4 className="fw-bold mb-3">Why Candidates Choose JobCrack</h4>
        <ul className="list-unstyled text-muted">
          <li className="mb-2">
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            Easy-to-use profile builder
          </li>
          <li className="mb-2">
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            Skill-based job matching
          </li>
          <li className="mb-2">
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            Transparent application tracking
          </li>
          <li className="mb-2">
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            Secure and privacy-focused platform
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h4 className="fw-bold mb-3">Start Building Your Career Today</h4>
        <p className="text-muted mb-4">
          Join JobCrack and take the next step toward your dream job.
        </p>

        <Link to="/register" className="btn btn-primary px-4 me-2">
          Create Profile
        </Link>
        <Link to="/job" className="btn btn-outline-primary px-4">
          Browse Jobs
        </Link>
      </div>

    </div>
  );
};

export default About;
