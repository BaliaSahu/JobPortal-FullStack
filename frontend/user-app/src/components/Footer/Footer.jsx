import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 mt-5 border-top bg-light">
      <section className="pb-4"  style={{paddingTop:"140px"}}>
        <div className="container">
          <div className="row gy-4">

            {/* Brand */}
            <div className="col-12 col-md-4">
              <h6 className="fw-bold">JobCrack</h6>
              <p className="small text-muted">
                Build your career with JobCrack. Create your profile, showcase
                skills, apply for jobs, and get hired by top recruiters.
              </p>
            </div>

            {/* Candidate Links */}
            <div className="col-6 col-md-4">
              <h6 className="fw-bold">For Candidates</h6>
              <ul className="list-unstyled small">
                <li>
                  <Link to="/job" className="text-decoration-none text-dark">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/profile/view" className="text-decoration-none text-dark">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/applied/jobs" className="text-decoration-none text-dark">
                    Applied Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/companies" className="text-decoration-none text-dark">
                    Explore Companies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-6 col-md-4">
              <h6 className="fw-bold">Candidate Support</h6>
              <ul className="list-unstyled small">
                <li>
                  <Link to="/about" className="text-decoration-none text-dark">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-decoration-none text-dark">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-decoration-none text-dark">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-decoration-none text-dark">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom */}
      <div className="border-top pt-3">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6 text-center text-md-start small text-muted">
              © 2025 JobCrack. All rights reserved.
            </div>

            <div className="col-md-6 text-center text-md-end">
              <a href="https://www.linkedin.com/in/balia-sahu-385969299" target="_blank" rel="noreferrer" className="me-2 text-dark">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="me-2 text-dark">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-dark">
                <i className="bi bi-youtube fs-5"></i>
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
