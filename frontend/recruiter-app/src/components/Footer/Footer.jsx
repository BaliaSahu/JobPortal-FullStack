import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 mt-5 border-top bg-light" style={{marginTop:"300px"}}>
      <section className="pb-4">
        <div className="container">
          <div className="row gy-4">

            {/* BRAND */}
            <div className="col-12 col-md-4">
              <h5 className="fw-bold">JobCrack</h5>
              <p className="text-muted small">
                A modern recruitment platform designed for recruiters to post jobs,
                manage applications, and hire the right talent faster.
              </p>
              <p className="text-muted small mb-0">
                Simplifying hiring. Empowering recruiters.
              </p>
            </div>

            {/* RECRUITER TOOLS */}
            <div className="col-6 col-md-2">
              <h6 className="fw-bold mb-3">Recruiter Tools</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="/create" className="text-decoration-none text-dark">
                    Post a Job
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/myjobs" className="text-decoration-none text-dark">
                    Manage Jobs
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/applications" className="text-decoration-none text-dark">
                    View Applications
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-decoration-none text-dark">
                    Recruiter Profile
                  </a>
                </li>
              </ul>
            </div>

            {/* PLATFORM */}
            <div className="col-6 col-md-3">
              <h6 className="fw-bold mb-3">Platform</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="/about" className="text-decoration-none text-dark">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/features" className="text-decoration-none text-dark">
                    Hiring Features
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/privacy" className="text-decoration-none text-dark">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-decoration-none text-dark">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="col-12 col-md-3">
              <h6 className="fw-bold mb-3">Recruiter Support</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <a href="/help" className="text-decoration-none text-dark">
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/faq" className="text-decoration-none text-dark">
                    Recruiter FAQs
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-decoration-none text-dark">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL + COPYRIGHT */}
      <div className="border-top pt-3">
        <div className="container">
          <div className="row align-items-center gy-3">

            <div className="col-md-6 text-center text-md-start small text-muted">
              © 2025 JobCrack. All rights reserved.
              <br />
              Built by <strong>Balia Sahu</strong> with ❤️
            </div>

            <div className="col-md-6">
              <ul className="list-unstyled d-flex justify-content-center justify-content-md-end gap-2 mb-0">
                <li><Link to="https://www.linkedin.com/in/balia-sahu-385969299" target="_blank" className="btn btn-outline-dark btn-sm"><i className="bi bi-linkedin"></i></Link></li>
                <li><a href="#" className="btn btn-outline-dark btn-sm"><i className="bi bi-twitter-x"></i></a></li>
                <li><a href="#" className="btn btn-outline-dark btn-sm"><i className="bi bi-youtube"></i></a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
