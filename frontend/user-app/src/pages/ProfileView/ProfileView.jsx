import React, { useContext, useEffect, useState } from "react";
import "./ProfileView.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { fetchUserDetails } from "../../service/UserService";
import avatar from '../../assets/avatar.webp'
import { deleteCertificationDetails, deleteEducationDetails, deleteExperienceDetails, deleteProjectDetails } from "../../service/ProfileServices";

const ProfileView = () => {
  const { token } = useContext(StoreContext);
  const [user, setUser] = useState(null);

  const loadDetails = async () => {
    if (!token) return
    try {
      const res = await fetchUserDetails(token);
      console.log(res);
      if (res.status === 200) {
        setUser(res.data);

        console.log(res.data);
      }
    } catch (err) {
      console.log(err)
      toast.error("Unable to fetch profile details.");
    }
  }
  const deleteEducation = async (data) => {
    if (!token) return
    try {
      const res = await deleteEducationDetails(data, token);
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data)
        loadDetails();
        console.log(res.data);
      }
    } catch (err) {
      console.log(err)
      toast.error("Unable to delete Education section");
    }
  }
  const deleteExperience = async (data) => {
    if (!token) return
    try {
      const res = await deleteExperienceDetails(data, token);
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data)
        loadDetails();
        console.log(res.data);
      }
    } catch (err) {
      console.log(err)
      toast.error("Unable to delete Experience section");
    }
  }
  const deleteProject = async (data) => {
    if (!token) return
    try {
      const res = await deleteProjectDetails(data, token);
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data)
        loadDetails();
        console.log(res.data);
      }
    } catch (err) {
      console.log(err)
      toast.error("Unable to delete Project section");
    }
  }
  const deleteCertification = async (data) => {
    if (!token) return
    try {
      const res = await deleteCertificationDetails(data, token);
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data)
        loadDetails();
        console.log(res.data);
      }
    } catch (err) {
      console.log(err)
      toast.error("Unable to delete Certification section");
    }
  }
  useEffect(() => {
    loadDetails();
  }, [])
  if (!user) return <p>Loading...</p>;

  return (
    <div className="container profile-view">

      {/* ================= HEADER ================= */}
      <div className="card profile-card p-4 mb-4">
        <div className="d-flex align-items-center">
          <img
            src={user.imgUrl || avatar}
            className="rounded-circle profile-img"
            alt="profile"
          />

          <div className="ms-4">
            <h4>{user.fullName}</h4>
            <p className="mb-1">{user.email}</p>
            <p className="mb-1">{user.mobile}</p>
            <p className="text-muted">{user.address}</p>

            {user.resume && (
              <a
                href={user.resume}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary btn-sm mt-2"
              >
                View Resume
              </a>
            )}

          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <Section title="Profile Summary">
        <p>{user.profileSummary || "No summary added"}</p>
      </Section>

      {/* ================= SKILLS ================= */}
      <Section title="Skills">
        <BadgeList list={user.skills} />
      </Section>

      {/* ================= DOMAINS ================= */}
      <Section title="Interested Domains">
        <BadgeList list={user.interestedDomains} />
      </Section>

      {/* ================= LANGUAGES ================= */}
      <Section title="Languages">
        <BadgeList list={user.languages} />
      </Section>

      {/* ================= EDUCATION ================= */}
      <Section title="Education">
        {user.education?.length ? user.education.map((e, i) => (
          <div key={i} className="info-card" style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h6>{e.degree}</h6>
              <p>{e.institution}</p>
              <small>{e.startDate} - {e.endDate}</small>
              <div>CGPA: {e.cgpa}</div>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => deleteEducation(e)} >Delete</button>
            </div>
          </div>
        )) : <Empty />}
      </Section>

      {/* ================= EXPERIENCE ================= */}
      <Section title="Experience">
        {user.experience?.length ? user.experience.map((e, i) => (
          <div key={i} className="info-card" style={{ display: "flex", justifyContent: "space-between" }} >
            <div>
              <p>{e.companyName}</p>
              <h6>{e.role}</h6>
              <small>
                {e.startDate} - {e.working ? "Present" : e.endDate}
              </small>
              <p className="mt-1">{e.description}</p>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => deleteExperience(e)} >Delete</button>
            </div>
          </div>
        )) : <Empty />}
      </Section>

      {/* ================= PROJECTS ================= */}
      <Section title="Projects">
        {user.projects?.length ? user.projects.map((p, i) => (
          <div key={i} className="info-card" style={{ display: "flex", justifyContent: "space-between" }} >
            <div>
              <h6>{p.name}</h6>
              <p>{p.description}</p>
              {p.projectLink && (
                <div>
                  <a href={p.projectLink} target="_blank" rel="noreferrer">
                    Project Link
                  </a>
                </div>
              )}
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => deleteProject(p)} >Delete</button>
            </div>
          </div>
        )) : <Empty />}
      </Section>

      {/* ================= CERTIFICATIONS ================= */}
      <Section title="Certifications">
        {user.certification?.length ? user.certification.map((c, i) => (
          <div key={i} className="info-card"style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h6>{c.title}</h6>
              <p>{c.certificationProvider}</p>
              <small>ID: {c.completionId}</small>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => deleteCertification(c)} >Delete</button>
            </div>
          </div>
        )) : <Empty />}
      </Section>

    </div>
  );
};

export default ProfileView;
const Section = ({ title, children }) => (
  <div className="card profile-card p-3 mb-4 w-full">
    <h5 className="section-title">{title}</h5>
    {children}
  </div>
);

const BadgeList = ({ list }) => (
  list?.length ? (
    <div>
      {list.map((item, i) => (
        <span key={i} style={{ backgroundColor: "green" }} className="badge badge-pill badge-custom me-2 mb-2">
          {item}
        </span>
      ))}
    </div>
  ) : <Empty />
);

const Empty = () => (
  <p className="text-muted">No details added</p>
);
