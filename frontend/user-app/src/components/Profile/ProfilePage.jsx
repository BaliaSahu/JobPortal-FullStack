import React from "react";
import BasicInfo from "./sections/BasicInfo";
import ProfileImage from "./sections/ProfileImage";
import ResumeUpload from "./sections/ResumeUpload";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectSection from "./sections/ProjectSection";
import CertificationSection from "./sections/CertificationSection";

const ProfilePage = () => {
  return (
    <div className="container my-4">
      <h3 className="mb-4">My Profile</h3>

      <ProfileImage />
      <ResumeUpload />
      <BasicInfo />

      <EducationSection />
      <ExperienceSection />
      <ProjectSection />
      <CertificationSection />
    </div>
  );
};

export default ProfilePage;
