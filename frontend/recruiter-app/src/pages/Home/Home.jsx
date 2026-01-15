import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {

  const { user } = useContext(StoreContext);

  return (
    <div className="container my-4">

      {/* HERO SECTION */}
      <div className="card border-0 shadow-lg mb-5">
        <div
          className="card-body text-white rounded p-5"
          style={{
            background: "linear-gradient(135deg, #0d6efd, #6610f2)"
          }}
        >
          <h2 className="fw-bold mb-2">
            Welcome back, Recruiter 👋
          </h2>
          <p className="fs-5 mb-3">
            Your smart hiring dashboard to post jobs, track candidates,
            and build high-performing teams faster than ever.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <Link to="/create" className="btn btn-light fw-semibold">
              <i className="bi bi-plus-circle me-2"></i>
              Post a Job
            </Link>
            <Link to="/myjobs" className="btn btn-outline-light fw-semibold">
              <i className="bi bi-briefcase me-2"></i>
              Manage Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="mb-5">
        <h3 className="fw-bold text-center mb-4">
          Why Recruiters Choose Our Job Portal
        </h3>

        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0 text-center">
              <div className="card-body">
                <i className="bi bi-speedometer2 fs-1 text-primary"></i>
                <h5 className="mt-3 fw-bold">Faster Hiring</h5>
                <p className="text-muted">
                  Reduce hiring time by reaching relevant candidates instantly
                  with smart job visibility.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0 text-center">
              <div className="card-body">
                <i className="bi bi-person-check-fill fs-1 text-success"></i>
                <h5 className="mt-3 fw-bold">Quality Candidates</h5>
                <p className="text-muted">
                  Access verified profiles with skills, experience, and resumes
                  all in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0 text-center">
              <div className="card-body">
                <i className="bi bi-shield-lock-fill fs-1 text-warning"></i>
                <h5 className="mt-3 fw-bold">Secure & Reliable</h5>
                <p className="text-muted">
                  Your data is protected with secure authentication and
                  role-based access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="mb-5">
        <h3 className="fw-bold text-center mb-4">
          How Hiring Works Here
        </h3>

        <div className="row text-center">
          <div className="col-md-3 mb-3">
            <i className="bi bi-file-earmark-plus fs-1 text-primary"></i>
            <h6 className="fw-bold mt-2">1. Post Job</h6>
            <p className="text-muted small">
              Create and publish jobs in minutes.
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <i className="bi bi-people fs-1 text-success"></i>
            <h6 className="fw-bold mt-2">2. Receive Applications</h6>
            <p className="text-muted small">
              Candidates apply with detailed profiles.
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <i className="bi bi-eye fs-1 text-warning"></i>
            <h6 className="fw-bold mt-2">3. Review & Shortlist</h6>
            <p className="text-muted small">
              View resumes, skills, and experience easily.
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <i className="bi bi-check-circle fs-1 text-success"></i>
            <h6 className="fw-bold mt-2">4. Hire Faster</h6>
            <p className="text-muted small">
              Close positions efficiently and confidently.
            </p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-3">Quick Actions</h4>

          <div className="d-flex flex-wrap gap-3">
            <Link to="/create" className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>
              Create Job
            </Link>

            <Link to="/myjobs" className="btn btn-outline-primary">
              <i className="bi bi-eye me-2"></i>
              View My Jobs
            </Link>

            <Link to="/profile" className="btn btn-outline-secondary">
              <i className="bi bi-person me-2"></i>
              Recruiter Profile
            </Link>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="card border-0 shadow-lg">
        <div
          className="card-body text-center text-white p-5 rounded"
          style={{
            background: "linear-gradient(135deg, #198754, #20c997)"
          }}
        >
          <h3 className="fw-bold mb-3">
            Start Hiring Smarter Today 🚀
          </h3>
          <p className="fs-5 mb-4">
            Join recruiters who are building strong teams with ease and speed.
          </p>
          <Link to="/create" className="btn btn-light fw-bold px-4 py-2">
            Post Your First Job
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
