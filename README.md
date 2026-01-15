🚀 Job Portal

A full-stack job portal application built with ReactJS, Bootstrap, and Spring Boot, using MongoDB as the database.
The application supports JWT-based authentication and provides separate interfaces for Recruiters and Job Seekers.

-----------------------------------------------------------------------------------------------------------------------------------------------

✨ Features

👔 Recruiter (recruiter-app)

✅ Create, update, and manage job postings

✅ View applicants for each job

✅ View applicant profiles (resume, skills, education, certifications, experience, etc.)
✅ Contact candidates directly
✅ Search candidates by skills

👩‍💻 Job Seeker (user-app)

✅ Browse and search jobs by title
✅ Apply for jobs
✅ Update profile:
✅ View job details and application status
  •  Resume
  •  Profile picture
  •  Summary
  •  Skills
  •  Education
  •  Certifications
  •  Work experience
  

🔐 Security

  •  JWT-based authentication for secure login
  •  Role-based access control for recruiters and job seekers

🛠️ Tech Stack

  • Frontend: ReactJS (recruiter-app & user-app), Bootstrap
  • Backend: Spring Boot
  • Database: MongoDB
  • Authentication: JWT (JSON Web Token)

📂 Folder Structure
JOB-PORTAL/

├── backend/JobPortal/         # Spring Boot API

│   ├── src/

│   ├── pom.xml

│   └── target/

├── frontend/

│   ├── recruiter-app/         # Recruiter React App

│   │   ├── public/

│   │   └── src/

│   └── user-app/              # Job Seeker React App

│       ├── public/

│       └── src/

└── .gitignore
