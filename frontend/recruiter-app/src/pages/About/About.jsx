import React from "react";

const About = () => {
  return (
    <div className="container my-5">

      {/* PAGE TITLE */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">About Us</h1>
        <p className="text-muted fs-5">
          Building smarter hiring experiences for modern recruiters
        </p>
        <hr className="w-25 mx-auto" />
      </div>

      {/* STORY SECTION */}
      <div className="row mb-5">
        <div className="col-md-6 mb-3">
          <h3 className="fw-bold mb-3">Our Story</h3>
          <p className="text-muted">
            Hiring should not be complicated. Yet many recruiters struggle with
            scattered resumes, unorganized applications, and time-consuming
            processes.
          </p>
          <p className="text-muted">
            We built this platform to simplify recruitment by bringing job
            posting, applicant tracking, and candidate evaluation into one
            intuitive system.
          </p>
        </div>

        <div className="col-md-6 mb-3">
          <div className="border rounded p-4 bg-light h-100">
            <h5 className="fw-bold">What Problem We Solve</h5>
            <ul className="text-muted mt-3">
              <li>Unstructured candidate data</li>
              <li>Manual tracking of applications</li>
              <li>Slow and inefficient hiring</li>
              <li>Lack of visibility on job performance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* WHAT THE PLATFORM DOES */}
      <div className="mb-5">
        <h3 className="fw-bold mb-3">What Our Platform Does</h3>

        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="p-4 border rounded h-100">
              <h6 className="fw-bold">Job Management</h6>
              <p className="text-muted small">
                Create, update, and control job postings from a single dashboard.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="p-4 border rounded h-100">
              <h6 className="fw-bold">Candidate Evaluation</h6>
              <p className="text-muted small">
                Review resumes, skills, experience, and profiles in one place.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="p-4 border rounded h-100">
              <h6 className="fw-bold">Hiring Insights</h6>
              <p className="text-muted small">
                Track application flow and hiring progress with clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="mb-5">
        <h3 className="fw-bold mb-4">Our Core Values</h3>

        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="text-center">
              <i className="bi bi-check-circle fs-1 text-primary"></i>
              <h6 className="fw-bold mt-2">Simplicity</h6>
              <p className="text-muted small">
                Clean design with easy workflows.
              </p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="text-center">
              <i className="bi bi-shield-lock fs-1 text-success"></i>
              <h6 className="fw-bold mt-2">Trust</h6>
              <p className="text-muted small">
                Secure data and reliable systems.
              </p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="text-center">
              <i className="bi bi-people fs-1 text-warning"></i>
              <h6 className="fw-bold mt-2">People First</h6>
              <p className="text-muted small">
                Candidates and recruiters matter.
              </p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="text-center">
              <i className="bi bi-graph-up fs-1 text-danger"></i>
              <h6 className="fw-bold mt-2">Growth</h6>
              <p className="text-muted small">
                Scale hiring with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FUTURE VISION */}
      <div className="bg-light rounded p-5 text-center">
        <h3 className="fw-bold mb-3">Our Vision</h3>
        <p className="text-muted fs-5 mb-0">
          To empower recruiters with tools that make hiring faster, fairer, and
          more transparent — enabling teams to build great organizations.
        </p>
      </div>

    </div>
  );
};

export default About;
