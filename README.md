🚀 Job Portal

A full-stack job portal application built with ReactJS, Bootstrap, and Spring Boot, using MongoDB as the database.
The application supports JWT-based authentication and provides separate interfaces for Recruiters and Job Seekers.

-----------------------------------------------------------------------------------------------------------------------------------------------
## 🔗 Live Application Links

- 👤 **Job Seekers**  
  👉 https://jobcrackk.netlify.app

- 🛠️ **Admin Panel**  
  👉 https://jobcrackr.netlify.app

- ⚙️ **Backend API**  
  👉 https://jobportalapi-2.onrender.com
  
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

⚡ Getting Started

  Prerequisites

  • Node.js & npm

  • Java 17+

  • MongoDB

  • Maven

🖥️ Backend Setup

1. Navigate to backend folder:

  • cd backend/JobPortal


2. Build the project:

  • mvn clean install


3. Run the Spring Boot application:

  • mvn spring-boot:run

4. Backend runs on: https://jobportalapi-2.onrender.com


🌐 Frontend Setup

  Recruiter App

  1. Navigate to recruiter app:

    • cd frontend/recruiter-app

  2. Install dependencies:

    • npm install

  4. Start the app:

    • npm start

  5. App runs on: https://jobcrackr.netlify.app

User App

  1. Navigate to user app:

   • cd frontend/user-app


  2. Install dependencies:

   • npm install


  3. Start the app:

   • npm start


App runs on: https://jobcrackk.netlify.app

👤 Author
  Balia Sahu
